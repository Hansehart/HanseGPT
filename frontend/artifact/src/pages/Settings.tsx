import { useState, useEffect } from "react";

const SearchablePersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://gpt.hansehart.de/api/service/receive/persons",
        {
          headers: {
            Authorization: "Bearer DieSiegerLautenHanseGPT1",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPersons(data);
      setFilteredPersons(data);
    } catch (error) {
      console.error("Error fetching persons:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (persons) {
      let results = persons.filter((person) =>
        Object.values(person).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      if (sortConfig.key !== null) {
        results.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }

      setFilteredPersons(results);
      setCurrentPage(1);
    }
  }, [searchTerm, persons, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPersons.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-16 bg-[#c3002d]"></div>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-[#c3002d]">
          Mitarbeiterverzeichnis
        </h2>
        <input
          type="text"
          placeholder="Suche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-[#c3002d] rounded focus:outline-none focus:ring-2 focus:ring-[#c3002d]"
        />
        {currentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#c3002d] table-fixed">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#c3002d] text-white">
                  <th className="border border-[#c3002d] p-2 cursor-pointer" onClick={() => requestSort('nachname')}>
                    Name {sortConfig.key === 'nachname' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                  </th>
                  <th className="border border-[#c3002d] p-2 cursor-pointer" onClick={() => requestSort('abteilung')}>
                    Abteilung {sortConfig.key === 'abteilung' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                  </th>
                  <th className="border border-[#c3002d] p-2 cursor-pointer" onClick={() => requestSort('position')}>
                    Position {sortConfig.key === 'position' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                  </th>
                  <th className="border border-[#c3002d] p-2 cursor-pointer" onClick={() => requestSort('mail')}>
                    E-Mail {sortConfig.key === 'mail' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                  </th>
                  <th className="border border-[#c3002d] p-2 cursor-pointer" onClick={() => requestSort('telefon')}>
                    Telefon {sortConfig.key === 'telefon' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((person, index) => (
                  <tr
                    key={person.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-[#c3002d] p-2 break-words">{`${person.vorname} ${person.nachname}`}</td>
                    <td className="border border-[#c3002d] p-2 break-words">
                      {person.abteilung}
                    </td>
                    <td className="border border-[#c3002d] p-2 break-words">
                      {person.position}
                    </td>
                    <td className="border border-[#c3002d] p-2 break-words">
                      {person.mail}
                    </td>
                    <td className="border border-[#c3002d] p-2 break-words">
                      {person.telefon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-[#c3002d]">Keine Daten verfügbar</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#c3002d] text-white rounded disabled:opacity-50 hover:bg-[#8a0020]"
          >
            Vorherige
          </button>
          <span className="text-[#c3002d]">
            Seite {currentPage} von{" "}
            {Math.ceil(filteredPersons.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredPersons.length / itemsPerPage)
            }
            className="px-4 py-2 bg-[#c3002d] text-white rounded disabled:opacity-50 hover:bg-[#8a0020]"
          >
            Nächste
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchablePersonTable;