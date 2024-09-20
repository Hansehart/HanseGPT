package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.model.Person;
import group.artifact.service.PersonService;

@RestController
@RequestMapping("/api/service")
public class PersonController {
    @Autowired
    PersonService personService;

    @PostMapping("/save/person")
    public ResponseEntity<String> savePerson(@RequestBody Person p) {
        try {
            personService.save(p);
            return ResponseEntity.ok(
                    "person successfully saved");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
