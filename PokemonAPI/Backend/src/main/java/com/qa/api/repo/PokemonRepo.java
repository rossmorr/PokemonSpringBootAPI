package com.qa.api.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.qa.api.model.Pokemon;

public interface PokemonRepo extends JpaRepository<Pokemon, Integer> {
	@Query(
			  value = "SELECT p.id as id, p.species as species, p.trainer_id as trainerid FROM POKEMON p WHERE trainer_id = :id", 
			  nativeQuery = true)
	
			List<Object[]> getAllPokemonWithTrainerId(Integer id);

}

