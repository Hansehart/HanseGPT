package group.artifact.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "rossmann")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String vorname;
    String nachname;
    String abteilung;
    String position;
    String bereich;
    String mail;
    String telefon;
    String standort;
    String beschreibung;
    String programme;
}
