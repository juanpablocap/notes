let notes = JSON.parse(localStorage.getItem('notes'));
if(!notes){
  notes=[];
  localStorage.setItem('notes',JSON.stringify(notes));
}

notes.forEach(noteItem =>{
  const note = document.createElement('div');
  note.innerHTML = `
  <div class="delete-button"><button onclick="deleteNote(${noteItem.id})" class="btn btn-danger">X</button></div>
  <div>${noteItem.text}</div>
  <div class="note-date">Creador:${noteItem.creator}<br>${new Date(noteItem.date)}</div>
  `;
  note.id=noteItem.id;
  note.classList.add('note-style','m-3')
  const noteContainer = document.querySelector('.tablero');
  noteContainer.appendChild(note);
})

//* Tomar los datos del formulario e ir mostrandolos en notita de ejemplo

const noteContent = document.querySelector('#note-text');
const noteCreator = document.querySelector('#note-creator');
const exampleNote = document.querySelector('#note-example');

noteContent.addEventListener('keyup',()=>{
  if(noteContent.value===''){
    exampleNote.innerText='Escriba una nota';
  }else{
    exampleNote.innerText=noteContent.value;
  }
})

const addNote = (event) => {
    event.preventDefault();
  
    // TODO Guardar en LS
    //! Traer lo que haya guardado en LS
    const notesLS = JSON.parse(localStorage.getItem('notes'));
    //! Editamos los datos que trajimos con la nueva nota
    let newNote = {
      id:notesLS.length+1,
      creator:noteCreator.value,
      text:noteContent.value,
      date:new Date()
    }
    notesLS.push(newNote);
    //! Volver a mandarlo a LS
    localStorage.setItem('notes',JSON.stringify(notesLS));
  
    //TODO Mostrar la nueva nota en el DOM
    const note = document.createElement('div');
    note.innerHTML =`
    <div class="delete-button"><button onclick="deleteNote(${newNote.id})" class="btn btn-danger">X</button></div>
    <div>${newNote.text}</div>
    <div class="note-date">Creador:${newNote.creator}<br>${newNote.date}</div>
    `;
    note.id= newNote.id;
    note.classList.add('note-style','m-3')
    const noteContainer = document.querySelector('.tablero');
    noteContainer.appendChild(note);
  
    //TODO Borrar infor de la nota de ejemplo y del form
    document.querySelector('form').reset();
    exampleNote.innerText = 'Escriba una nota';
  }
  
  
  //* Agregar botón para eliminar y eliminar
  //!Forma tambien valida de obtener el id del elemento a borrar
  // const deleteNote = (event) =>{
  //   console.log(event.target.parentElement.parentElement.id);
  
  //   //TODO Borrar del DOM
  //   // document.getElementById('')
  //   //TODO Borrar de LS
  // } 
  
  const deleteNote = (id) =>{
    //TODO Borrar del DOM
    const noteContainer = document.querySelector('.tablero');
    const noteToRemove = document.getElementById(id);
    noteContainer.removeChild(noteToRemove);
    // document.getElementById('')
    //TODO Borrar de LS
    //!Traer la informacion
    let notesLS = JSON.parse(localStorage.getItem('notes'));
    //!Modificar la informacion
    notesLS = notesLS.filter(noteLS=>noteLS.id!=id);
    //!Volver a subir
    localStorage.setItem('notes',JSON.stringify(notesLS));
  } 