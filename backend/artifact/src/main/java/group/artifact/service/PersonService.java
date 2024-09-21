package group.artifact.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import group.artifact.repository.PersonRepository;
import group.artifact.model.Person;

@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;
    
    public void save(Person person) {
        if (person == null) {
            throw new IllegalArgumentException("Person cannot be null");
        }
        try {
            personRepository.save(person);
        } catch (Exception e) {
            // Log the exception
            System.out.println("Error occurred while saving person: " + e.getMessage());
            throw new RuntimeException("Failed to save person", e);
        }
    }

    public List<Person> getAllPersons() {
        try {
            return personRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error occurred while retrieving persons: " + e.getMessage());
            throw new RuntimeException("Failed to retrieve persons", e);
        }
    }

    public Person getPersonById(Integer id) {
        try {
            Optional<Person> personOptional = personRepository.findById(id);
            return personOptional.orElse(null);
        } catch (Exception e) {
            System.out.println("Error occurred while retrieving person by id: " + e.getMessage());
            throw new RuntimeException("Failed to retrieve person by id", e);
        }
    }
}