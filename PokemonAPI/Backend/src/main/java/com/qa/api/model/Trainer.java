package com.qa.api.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Trainer")
public class Trainer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@Size(min = 2)
	@Size(max = 20)
	String name;
	
	@OneToMany(targetEntity=Pokemon.class, mappedBy ="trainer", cascade = CascadeType.ALL, orphanRemoval = false)
	@JsonIgnore
    private List<Pokemon> pokemon;
	
	public Trainer() {};
	
	

	
	public Trainer(Integer id) {
		this.id = id;
	};
	
	
	
	public Trainer(Integer id, @Size(min = 2) @Size(max = 20) String name, List<Pokemon> pokemon) {
		super();
		this.id = id;
		this.name = name;
		this.pokemon = pokemon;
	}










	public List<Pokemon> getPokemon() {
		return pokemon;
	}



	public void setPokemon(List<Pokemon> pokemon) {
		this.pokemon = pokemon;
	}



	public Trainer(@Size(min = 2) @Size(max = 20) String name) {
		this.name = name;
	}

	public Trainer(Integer id, @Size(min = 2) @Size(max = 20) String name) {
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Trainer other = (Trainer) obj;
		return Objects.equals(name, other.name);
	}
	
	
	

}
