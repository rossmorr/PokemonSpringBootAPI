const createPopup = document.querySelector(".confirmCreate");
const deletePopup = document.querySelector(".confirmDelete");

const updatePopup = document.querySelector(".confirmUpdate");

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = JSON.stringify(Object.fromEntries(data));


  console.log({ value });

  console.log(value);

  fetch('http://localhost:8080/createTrainer',{
  method: 'POST',
  headers: {
    'dataType': "json",
     'Content-Type': 'application/json',
     'Accept': '*/*'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
  body: value })
.then(res => {
  if (res.ok){
    console.log('Success');
    createPopup.innerHTML = "Trainer created";
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
const form = document.querySelector('.createTrainer');
form.addEventListener('submit', handleSubmit);



// Delete trainer form functionality


function handleDelete(event){
    event.preventDefault();

    let numdelete = new FormData(event.target).get("idDelete");

    fetch(('http://localhost:8080/deleteTrainer(' + parseInt(numdelete) + ')'),{
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
    deletePopup.innerHTML = "Trainer deleted";
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

const deleteform = document.querySelector('.deleteTrainer')
deleteform.addEventListener('submit', handleDelete);






// retrieve list of trainers for delete and update selecters
const select = document.querySelector('.deleteSelect')
const updateselect = document.querySelector('.updateSelect')

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
        updateselect.add(newOption2);
        console.log(restext[key].name);
      }
    })
    .catch(error=> console.log('ERROR'));
}

test();



// end of delete list population








function handleUpdate(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = JSON.stringify(Object.fromEntries(data));

  console.log({ value });

  console.log(value);
  console.log("test");

  let numupdate = new FormData(event.target).get("idUpdate");

  fetch('http://localhost:8080/updateTrainer',{
  method: 'PUT',
  headers: {
    'dataType': "json",
     'Content-Type': 'application/json',
     'Accept': '*/*'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
  body: value })
.then(res => {
  if (res.ok){
  console.log('Success');
  updatePopup.innerHTML = "Trainer updated";
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
const updateform = document.querySelector('.UpdateTrainer');
updateform.addEventListener('submit', handleUpdate);
