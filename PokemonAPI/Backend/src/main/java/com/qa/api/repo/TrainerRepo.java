package com.qa.api.repo;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.qa.api.model.Pokemon;
import com.qa.api.model.Trainer;

@Repository
public interface TrainerRepo extends JpaRepository<Trainer, Integer> {
	
	@Query(
			  value = "SELECT p.id as id, p.species as species, p.trainer_id as trainerid FROM POKEMON p WHERE trainer_id = :id", 
			  nativeQuery = true)
	
			List<Object[]> getAllPokemonWithTrainerId(Integer id);

}
