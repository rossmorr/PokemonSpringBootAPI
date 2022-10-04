package com.qa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.qa.api.model.Trainer;
import com.qa.api.service.TrainerService;

@RestController
public class TrainerController {
	
	TrainerService service;
	
	@PostMapping("/createTrainer")
	public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer) {
		return new ResponseEntity<Trainer>(this.service.createTrainer(trainer), HttpStatus.ACCEPTED) ;
	}
	
	@GetMapping("/readAllTrainer")
	public ResponseEntity<List<Trainer>> readAllTrainer(){
		return new ResponseEntity<List<Trainer>>(this.service.readAllTrainer(),HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/deleteTrainer({id})")
	public boolean deleteTrainer(@PathVariable Integer id) {
		return this.service.deleteTrainer(id);
	}
	
	@PutMapping("/updateTrainer")
	public ResponseEntity<Trainer> updateTrainer(@RequestBody Trainer trainer){
	return new ResponseEntity<Trainer>(this.service.updateTrainer(trainer.getId(), trainer), HttpStatus.ACCEPTED);	}
	
	@Autowired
	public void setService(TrainerService service) {
		this.service = service;
	}
	

}
