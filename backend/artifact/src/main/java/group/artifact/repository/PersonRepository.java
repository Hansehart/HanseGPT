package group.artifact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    
}
