import './styles.css';
import {ToDo, createNewToDo} from './todo';
import {Project, createNewProject} from './project';
import { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, toggleForm, toggleProjectForm, showToDos } from './DOM';
import { addToDoFormSubmit, addProjectFormSubmit } from './listeners';
import { changeProject } from './listeners';


const test = new ToDo("Walk", "Round the block", "2002-10-21", "High", "No notes")
const defaultProject = new Project("My Project")

let currentProject = defaultProject
Object.setPrototypeOf(test, defaultProject)


createProjectCard(defaultProject, currentProject)
createToDoCard(test)



const form = document.querySelector(".form")
form.addEventListener("submit", ()=>{
    event.preventDefault()
    addToDoFormSubmit(currentProject)
})


const projectForm = document.querySelector(".project-form")
projectForm.addEventListener("submit", ()=>{
    event.preventDefault()
    currentProject = addProjectFormSubmit(currentProject)
    return currentProject
})




formPopUp()
projectFormPopUp()
showToDos()

document.querySelector(".project").click()

