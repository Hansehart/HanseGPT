import { useState } from 'react';

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://gpt.hansehart.de/api/service/receive/persons', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please check your token and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-[#70001a]">Mitarbeiterliste</h2>
      
      <form onSubmit={handleTokenSubmit} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter Bearer Token"
            className="flex-grow px-4 py-2 border border-[#70001a] rounded-l focus:outline-none focus:ring-2 focus:ring-[#70001a]"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#70001a] text-white rounded-r hover:bg-[#8a0020] focus:outline-none focus:ring-2 focus:ring-[#70001a]"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : persons.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#70001a]">
            <thead>
              <tr className="bg-[#70001a] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Vorname</th>
                <th className="px-4 py-2">Nachname</th>
                <th className="px-4 py-2">Abteilung</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Bereich</th>
                <th className="px-4 py-2">E-Mail</th>
                <th className="px-4 py-2">Telefon</th>
                <th className="px-4 py-2">Standort</th>
                <th className="px-4 py-2">Beschreibung</th>
                <th className="px-4 py-2">Programme</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person, index) => (
                <tr key={person.id} className={index % 2 === 0 ? 'bg-[#fff5f6]' : 'bg-white'}>
                  <td className="border px-4 py-2">{person.id}</td>
                  <td className="border px-4 py-2">{person.vorname}</td>
                  <td className="border px-4 py-2">{person.nachname}</td>
                  <td className="border px-4 py-2">{person.abteilung}</td>
                  <td className="border px-4 py-2">{person.position}</td>
                  <td className="border px-4 py-2">{person.bereich}</td>
                  <td className="border px-4 py-2">{person.mail}</td>
                  <td className="border px-4 py-2">{person.telefon}</td>
                  <td className="border px-4 py-2">{person.standort}</td>
                  <td className="border px-4 py-2">{person.beschreibung}</td>
                  <td className="border px-4 py-2">{person.programme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PersonTable;