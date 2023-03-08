const addNote = document.querySelector(".addNewNote"),
      container = document.querySelector(".container"),
      arrayNotes = Array.from(JSON.parse(localStorage.getItem("notes") || "[]"));
      

let isUpdate = false , updateID;

addNote.onclick = () =>{
   const newNoteForm = document.createElement("div"),
         date = new Date()
   

   newNoteForm.className = "addnoteform";
   newNoteForm.innerHTML = `
   <div class="addNoteFormContainer">
      <header>
         <h2>Add new note</h2>
         <i class="fa-solid fa-xmark close"></i>
      </header>
      <form class ="form" >
         <div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
         </div>
         <div>
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
         </div>
         <input class = "submit" type="submit" value="Add Note">
      </form>
   </div>`

   document.body.appendChild(newNoteForm)
   document.forms[0].firstElementChild.lastElementChild.focus()
   const closeNewnote = document.querySelector(".close"),
         title = document.querySelector("#title"),
         description = document.querySelector("#description");

   

   closeNewnote.onclick = () => {
      document.body.removeChild(newNoteForm)
   }

   document.forms[0].addEventListener("submit", (e) =>{
      e.preventDefault();
      let noteObject = {
         "id" : date.getTime(),
         "title" : title.value,
         "description" : description.value
      }
      if(!isUpdate){
         arrayNotes.push(noteObject);
         
      }
      else{
         
         arrayNotes[updateID].title = title.value
         arrayNotes[updateID].description = description.value
         isUpdate = false
      }
      
      localStorage.setItem("notes", JSON.stringify(arrayNotes))
      showNote()
      closeNewnote.click();

   })

}  


function showNote(){
   document.querySelectorAll(".note").forEach(ele => ele.remove())
   arrayNotes.forEach((note , index) => {
      const date=new Date(note.id),
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate();
      let Note = `
      <div class = "note" key = ${note.id}>
      <div class="details">
            <h3 class="title">${note.title}</h3>
         <div class="description">${note.description}</div>
      </div>   
      <div class="dateEdit">
         <span class="date">${month + 1}/${day}/${year}</span>
         <div class="dots">
            <i class="fa-solid fa-ellipsis" ></i>
            <div class="editDelete">
               <div class="edit" onclick = "updatenote(${index},'${note.title}','${note.description}')">
                  <i class="fa-solid fa-pen-to-square"></i>
                  <span>Edit</span>
               </div>
               <div class="delete" onclick = "deletenote(${index})">
                  <i class="fa-solid fa-trash-can"></i>
                  <span>Delete</span>
               </div>
            </div>
         </div>
      </div>
      </div>`
      addNote.insertAdjacentHTML("afterend",Note);
      
   })
   const dots = document.querySelectorAll(".dots"),
         dotsIcon=document.querySelectorAll(".dots > i")
   dotsIcon.forEach((dot,index) =>{
      dot.onclick = () =>{
      dots[index].classList.toggle("active")
      }
   })
}

function updatenote(index ,titlevalue ,descriptionvalue){
   isUpdate = true
   updateID = index
   addNote.click()
   const btn = document.querySelector(".submit"),
         title = document.querySelector("#title"),
         description = document.querySelector("#description"),
         h2 = document.querySelector(".addNoteFormContainer header h2");
   h2.textContent = "Update note"
   title.value = titlevalue;
   description.value = descriptionvalue
   btn.value = "Update Note"

}

function deletenote(index){
   arrayNotes.splice(index,1)
   localStorage.setItem("notes", JSON.stringify(arrayNotes))
   showNote()
}
showNote()
