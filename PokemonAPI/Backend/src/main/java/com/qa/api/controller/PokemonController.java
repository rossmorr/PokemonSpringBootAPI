package com.qa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.qa.api.model.Pokemon;
import com.qa.api.service.PokemonService;

@RestController
public class PokemonController {
	PokemonService service;

	@PostMapping("/createPokemon")
	public ResponseEntity<Pokemon> createPokemon(@RequestBody Pokemon pokemon) {
		try {

			return new ResponseEntity<Pokemon>(this.service.createPokemon(pokemon),HttpStatus.ACCEPTED);	
		}
		catch(Error e){
			return new ResponseEntity<Pokemon>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deletePokemon({id})")
	public boolean deletePokemon(@PathVariable Integer id){
		return service.deletePokemon(id);
	}
	
	@GetMapping("/readAllPokemon")
	public ResponseEntity<List<Pokemon>> readAllPokemon(){
		return new ResponseEntity<List<Pokemon>>(this.service.readAllPokemon(),HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/updatePokemon")
	public ResponseEntity<Pokemon> updatePokemon(@RequestBody Pokemon pokemon){
		try {

			return new ResponseEntity<Pokemon>(this.service.createPokemon(pokemon),HttpStatus.ACCEPTED);	
		}
		catch(Error e){
			return new ResponseEntity<Pokemon>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@Autowired
	public void setService(PokemonService service) {
		this.service = service;
	}
	

}
