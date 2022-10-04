package com.qa.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.qa.api.model.Pokemon;
import com.qa.api.model.Trainer;
import com.qa.api.repo.PokemonRepo;

@Service
public class PokemonService {
	
	PokemonRepo repo;

	@Autowired
	public void setRepo(PokemonRepo repo) {
		this.repo = repo;
	}
	
	public Pokemon createPokemon(Pokemon pokemon) {
		if (pokemon.getTrainer()!= null) {
			Trainer trainer = pokemon.getTrainer();
			Integer trainerid = trainer.getId();
			if (pokemon.getTrainer()!= null) {
				if (this.repo.getAllPokemonWithTrainerId(trainerid).size() < 6){
					return this.repo.save(pokemon);
				}
			}
		}

		else {
			return this.repo.save(pokemon);
		}
		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "too many pokemon attached to trainer\n");
	}
	
	public boolean deletePokemon(Integer id) {
		this.repo.deleteById(id);
		return true;
	}
	
	
	public List<Pokemon> readAllPokemon(){
		return this.repo.findAll();
	}
	
	public Pokemon updatePokemon(Pokemon pokemon) {
		if (pokemon.getTrainer()!= null) {
			Trainer trainer = pokemon.getTrainer();
			Integer trainerid = trainer.getId();
			if (pokemon.getTrainer()!= null) {
				if (this.repo.getAllPokemonWithTrainerId(trainerid).size() < 6){
					return this.repo.save(pokemon);
				}
			}
		}

		else {
			return this.repo.save(pokemon);
		}
		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "too many pokemon attached to trainer\n");
	}
	}
