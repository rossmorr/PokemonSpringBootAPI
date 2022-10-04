package com.qa.api.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="Pokemon")
public class Pokemon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@NotNull
	String species;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "trainer_id", nullable = true)
	Trainer trainer;
	
	
	
	
	
	public Pokemon() {};
	
	
	public Pokemon( @NotNull String species, Trainer trainer) {
		this.species = species;
		this.trainer = trainer;
	}
	
	
	public Pokemon(@NotNull String species) {
		this.species = species;
		this.trainer = null;
	}
	
	
	
	

	public Pokemon(Integer id, @NotNull String species) {
		this.id = id;
		this.species = species;
		this.trainer = null;
	}
	

	public Pokemon(Integer id, @NotNull String species, Integer trainerid) {
		super();
		this.id = id;
		this.species = species;
		Trainer justid = new Trainer();
		justid.setId(trainerid);
		if (trainerid == 0) {
			justid.setId(null);
		}
		this.trainer = justid;
	}
	

	public Pokemon(Integer id, @NotNull String species, Trainer trainer) {
		super();
		this.id = id;
		this.species = species;
		this.trainer = trainer;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public Trainer getTrainer() {
		return trainer;
	}
	
	@Autowired
	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	@Override
	public int hashCode() {
		return Objects.hash(species, trainer);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pokemon other = (Pokemon) obj;
		return Objects.equals(species, other.species) && Objects.equals(trainer, other.trainer);
	}
	
	
	
	
	
	
	
	
}
