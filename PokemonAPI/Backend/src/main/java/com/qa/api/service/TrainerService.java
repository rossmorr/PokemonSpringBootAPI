package com.qa.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.api.model.Pokemon;
import com.qa.api.model.Trainer;
import com.qa.api.repo.PokemonRepo;
import com.qa.api.repo.TrainerRepo;

@Service
public class TrainerService {
	TrainerRepo repo;
	PokemonRepo pokerepo;
	
	@Autowired
	public void setRepo(TrainerRepo repo) {
		this.repo = repo;
	}
	
	
	@Autowired
	public void setPokerepo(PokemonRepo pokerepo) {
		this.pokerepo = pokerepo;
	}



	public Trainer createTrainer(Trainer trainer)
	{
		this.repo.saveAndFlush(trainer);
		return trainer;
	}
	
	public List<Trainer> readAllTrainer(){
		return this.repo.findAll();
	}
	
	public Optional<Trainer> readTrainer(Integer id) {
		return this.repo.findById(id);
	}
	
	
	public boolean deleteTrainer(Integer id) {
//		List<Object[]> pokemon = this.repo.getAllPokemonWithTrainerId(id);
//		for(Object[] object: pokemon) {
//			Integer pokeid = (Integer) object[0];
//			String pokename = (String) object[1];
//			Pokemon newpoke = new Pokemon(pokeid,pokename, 0);
//			this.pokerepo.save(newpoke);
//		}
		
		this.repo.deleteById(id);
		return true;
	}
	
	public Trainer updateTrainer(Integer id, Trainer trainer) {
		
		this.repo.save(trainer);
		return trainer;
	}
	

}
