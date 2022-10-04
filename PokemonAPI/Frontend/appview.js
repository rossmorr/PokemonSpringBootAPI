// retrieve list of trainers for delete and update selecters
const table = document.querySelector('.trainerTable')
const trainerlesstable = document.querySelector(".trainerlesstable");
let ids = [];
let names = [];
let trainlist = [];
let pokemonList = [];
let populatedTrainerlessPokemon = [];

let makeTrainerList = async () => {
  const data = await fetch('http://localhost:8080/readAllTrainer')

    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Fail');
      }
    }).then(restext => {
      for (let key in restext) {
        ids.push(restext[key].id);
        names.push(restext[key].name);
        trainlist.push({
          id: restext[key].id,
          name: restext[key].name,
          pokemon: []
        });
      }
    })
    .catch(error => console.log('ERROR'));
  makePokemonList();
}

makeTrainerList();


let makePokemonList = async () => {
  const data = await fetch('http://localhost:8080/readAllPokemon')

    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Fail');
      }
    }).then(restext => {
      for (let element of trainlist) {
        for (let key in restext) {
          if (restext[key].trainer != null) {
            if (element.id == restext[key].trainer.id) {
              element.pokemon.push(restext[key].species)
              console.log(element);
            }
          } else {
            pokemonList.push({
              id: restext[key].id,
              species: restext[key].species
            });
          }
        }
      }
      populate();
    })
    .catch(error => console.log('ERROR'));
}

function populate() {
  for (let element of trainlist) {
    let count = 0
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = element.id;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = element.name;
    for (let poke of element.pokemon) {
      var cell = row.insertCell(2 + count)
      cell.innerHTML = poke;
      count++;
    }
  }

  for (let poke of pokemonList) {
    if (!(populatedTrainerlessPokemon.some(pokemon=> pokemon.id=== poke.id))){
      var row = trainerlesstable.insertRow(trainerlesstable.rows.length)
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = poke.id;
      cell2.innerHTML = poke.species;
      populatedTrainerlessPokemon.push(poke);
    }

  }
}
