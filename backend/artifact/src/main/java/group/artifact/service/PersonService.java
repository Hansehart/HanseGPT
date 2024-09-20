package group.artifact.service;

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
        System.out.println(person.getAbteilung());
        try {
            personRepository.save(person);
        } catch (Exception e) {
            // Log the exception
            System.out.println("Error occurred while saving person: " + e.getMessage());
            throw new RuntimeException("Failed to save person", e);
        }
    }
}