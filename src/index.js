import './styles.css';
import ToDo from './todo';
import Project from './project';
import { createProjectCard, createToDoCard, formPopUp } from './DOM';


const test = new ToDo("Walk", "Round the block", "11th oct", "High", "No notes")
const defaultProject = new Project("My Project", "Tasks to be completed")

Object.setPrototypeOf(test, defaultProject)

function createNewToDo(){
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const dueDate = document.getElementById("dueDate").value
    const  priority = document.getElementById("priority").value
    const notes = document.getElementById("notes").value
    const newToDo = new ToDo(title, description, dueDate, priority, notes)
    createToDoCard(newToDo)
}

const form = document.querySelector(".form")
form.addEventListener("submit", ()=>{
    createNewToDo()
    form.reset()
})


createProjectCard(defaultProject)
createToDoCard(test)
formPopUp()