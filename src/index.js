import './styles.css';
import {ToDo, createNewToDo} from './todo';
import {Project, createNewProject} from './project';
import { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, toggleForm, toggleProjectForm, showToDos } from './DOM';
import { addToDoFormSubmit, addProjectFormSubmit } from './listeners';
import { changeProject } from './listeners';


const test = new ToDo("Walk", "Round the block", "2002-10-21", "High", "No notes")
const defaultProject = new Project("My Project")

global.currentProject = defaultProject
Object.setPrototypeOf(test, defaultProject)


createProjectCard(defaultProject)
createToDoCard(test)

loadFromStorage()


const form = document.querySelector(".form")
form.addEventListener("submit", ()=>{
    event.preventDefault()
    addToDoFormSubmit()
})


const projectForm = document.querySelector(".project-form")
projectForm.addEventListener("submit", ()=>{
    event.preventDefault()
    addProjectFormSubmit()
})




formPopUp()
projectFormPopUp()
showToDos()

document.querySelector(".project").click()


function loadFromStorage(){
    Object.keys(localStorage).forEach(function(key){
        const todoConverted = JSON.parse(localStorage.getItem(key))
        Object.setPrototypeOf(todoConverted, todoConverted.project)
        const projectsList = createArrayOfProjects()

        
        if (!projectsList.includes(todoConverted.project.title)){
            const newProject = new Project(todoConverted.project.title)
            createProjectCard(newProject)
            createToDoCard(todoConverted)
        }
        else{
            changeProject(todoConverted.project)
            createToDoCard(todoConverted)
        }
        
    })
    changeProject(defaultProject)
}


function createArrayOfProjects(){
    const projectCards = document.querySelectorAll(".project")
        let projectsList = []
        for (const item of projectCards){
            const projectTitle = item.textContent
            projectsList.push(projectTitle)
        }
        return projectsList
}


