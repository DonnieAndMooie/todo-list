import './styles.css';
import ToDo from './todo';
import Project from './project';
import { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, changeProject } from './DOM';


const test = new ToDo("Walk", "Round the block", "11th oct", "High", "No notes")
const defaultProject = new Project("My Project")

let currentProject = defaultProject

Object.setPrototypeOf(test, defaultProject)

function createNewToDo(){
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const dueDate = document.getElementById("dueDate").value
    const  priority = document.getElementById("priority").value
    const notes = document.getElementById("notes").value
    const newToDo = new ToDo(title, description, dueDate, priority, notes)
    Object.setPrototypeOf(newToDo, currentProject)
    createToDoCard(newToDo)
}

function createNewProject(){
    const title = document.getElementById("project-title").value
    const newProject = new Project(title)
    createProjectCard(newProject)
    currentProject = newProject
    changeProject()

}

const form = document.querySelector(".form")
form.addEventListener("submit", ()=>{
    createNewToDo()
    form.reset()
    const formHeader = document.querySelector(".form-header")
    const formBtn = document.querySelector(".submit")
    formHeader.textContent = "New To-Do"
    formBtn.textContent = "Add To-Do"
})


const projectForm = document.querySelector(".project-form")
projectForm.addEventListener("submit", ()=>{
    createNewProject()
    projectForm.reset()
})

createProjectCard(defaultProject)
createToDoCard(test)
formPopUp()
projectFormPopUp()





