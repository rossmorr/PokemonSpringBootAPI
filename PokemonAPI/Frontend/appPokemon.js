const createPopup = document.querySelector(".confirmCreate");
const deletePopup = document.querySelector(".confirmDelete");

const updatePopup = document.querySelector(".confirmUpdate");



function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = JSON.stringify(Object.fromEntries(data));

let numvalue = Number(data.get("trainer"));
console.log(numvalue);

let newvalue;

  if (numvalue == 0){
    newvalue = JSON.stringify({species: data.get("species")});
  }
  else{
    newvalue = JSON.stringify({species: data.get("species"), trainer: numvalue});
  }


  console.log(typeof data.get("trainer"));

  // console.log({ value });

  console.log(data);


  fetch('http://localhost:8080/createPokemon',{
  method: 'POST',
  headers: {
    'dataType': "json",
     'Content-Type': 'application/json',
     'Accept': '*/*',
     'Accept-Encoding': 'gzip, deflate, br'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
  body: newvalue })
.then(res => {
  if (res.ok){
    console.log('Success');
    createPopup.innerHTML = "Pokemon created";
    createPopup.classList.add("showpopup");
    let removepopup = setTimeout(()=>{
      createPopup.classList.remove("showpopup");
    }, 500);
  } else {
    console.log('Fail');
    createPopup.classList.add("invalidpopup");
    createPopup.classList.add("showpopup");
    createPopup.innerHTML = "Invalid input";
    let removepopup = setTimeout(()=>{
      createPopup.classList.remove("showpopup");
      createPopup.classList.remove("invalidpopup");
    }, 500);
  }
})
.catch(error=> console.log('ERROR'));
}
const form = document.querySelector('.createPokemon');
form.addEventListener('submit', handleSubmit);





// retrieve list of trainers for delete and update selecters
const select = document.querySelector('.trainerselect');
const select4 = document.querySelector('.trainerUpdateSelect');

let listOfTrainer;
let test = async () => {
    const data = await fetch('http://localhost:8080/readAllTrainer')

    .then(res => {
      if (res.ok){
        return res.json();
      } else {
        console.log('Fail');
      }
    }).then(restext => {
      listOfTrainer = restext;
      // return
      for (let key in restext){
        let newOption = new Option((parseInt(restext[key].id)) + " " + restext[key].name , restext[key].id);
        let newOption2 = new Option((parseInt(restext[key].id)) + " " + restext[key].name , restext[key].id);
        select.add(newOption);
        select4.add(newOption2);
        console.log(restext[key].name);
      }
    })
    .catch(error=> console.log('ERROR'));
}

test();



// end of delete list population






// retrieve list of pokemon for update and delete selecters
const select2 = document.querySelector('.deleteSelect');
const select3 = document.querySelector('.updateSelect')

let listOfTrainer2;
let test2 = async () => {
    const data = await fetch('http://localhost:8080/readAllPokemon')

    .then(res => {
      if (res.ok){
        return res.json();
      } else {
        console.log('Fail');
      }
    }).then(restext => {
      listOfTrainer2 = restext;
      // return
      for (let key in restext){
        if(restext[key].trainer !== null){
          let newOption = new Option((parseInt(restext[key].id)) + " " + restext[key].species + " " + restext[key].trainer.name , restext[key].id);
          let newOption2 = new Option((parseInt(restext[key].id)) + " " + restext[key].species + " " + restext[key].trainer.name , restext[key].id);
                  select2.add(newOption);
                  select3.add(newOption2);
        }
        else{
          let newOption = new Option((parseInt(restext[key].id)) + " " + restext[key].species + " No Trainer", restext[key].id);
          let newOption2 = new Option((parseInt(restext[key].id)) + " " + restext[key].species + " No Trainer", restext[key].id);
                  select2.add(newOption);
                  select3.add(newOption2);
        }

      }
    })
    .catch(error=> console.log('ERROR'));
}

test2();



// end of delete list population


function handleDelete(event){
    event.preventDefault();

    let numdelete = new FormData(event.target).get("idDelete");

    fetch(('http://localhost:8080/deletePokemon(' + parseInt(numdelete) + ')'),{
    method: 'Delete',
    headers: {
      'dataType': "json",
       'Content-Type': 'application/json',
       'Accept': '*/*'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     }
   })
  .then(res => {
    if (res.ok){
    console.log('Success');
    deletePopup.innerHTML = "Pokemon deleted";
    deletePopup.classList.add("showpopup");
    deletePopup.classList.remove("invalidpopup");
    let removepopup = setTimeout(()=>{
      deletePopup.classList.remove("showpopup");
    }, 500);
  } else {
    console.log('Fail');
    deletePopup.classList.add("invalidpopup");
    deletePopup.classList.add("showpopup");
    deletePopup.innerHTML = "Invalid input";
    let removepopup = setTimeout(()=>{
      deletePopup.classList.remove("showpopup");
      deletePopup.classList.remove("invalidpopup");
    }, 500);
  }})
  .catch(error=> console.log('ERROR'));
  }

const deleteform = document.querySelector('.DeletePokemon')
deleteform.addEventListener('submit', handleDelete);



// UpdatePokemon


function handleUpdate(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = JSON.stringify(Object.fromEntries(data));

  console.log("Species: " + data.get("species"));
  console.log("trainer: " + data.get("trainer"));
  console.log("idupdate: " + data.get("idUpdate"));

let numvalue = Number(data.get("trainer"));
let idvalue = Number(data.get("idUpdate"));
console.log(numvalue);

let newvalue;

  if (numvalue == 0){
    newvalue = JSON.stringify({id: idvalue ,species: data.get("species"), trainer: null});
  }
  else{
    newvalue = JSON.stringify({id: idvalue, species: data.get("species"), trainer: numvalue});
  }


  console.log(typeof data.get("trainer"));

  // console.log({ value });

  console.log(data);


  fetch('http://localhost:8080/updatePokemon',{
  method: 'PUT',
  headers: {
    'dataType': "json",
     'Content-Type': 'application/json',
     'Accept': '*/*',
     'Accept-Encoding': 'gzip, deflate, br'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
  body: newvalue })
.then(res => {
  if (res.ok){
  console.log('Success');
  updatePopup.innerHTML = "Pokemon updated";
  updatePopup.classList.add("showpopup");
  updatePopup.classList.remove("invalidpopup");
  let updatepopup = setTimeout(()=>{
    updatePopup.classList.remove("showpopup");
  }, 500);
} else {
  console.log('Fail');
  updatePopup.classList.add("invalidpopup");
  updatePopup.classList.add("showpopup");
  updatePopup.innerHTML = "Invalid input";
  let updatepopup = setTimeout(()=>{
    updatePopup.classList.remove("showpopup");
    updatePopup.classList.remove("invalidpopup");
  }, 500);
}})
.catch(error=> console.log('ERROR'));
}

const formUpdate = document.querySelector('.UpdatePokemon');
formUpdate.addEventListener('submit', handleUpdate);
