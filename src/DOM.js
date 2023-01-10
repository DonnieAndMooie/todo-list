import { changeProject, deleteProject, deleteToDo, editToDo } from "./listeners";
import {format, parseISO } from './../node_modules/date-fns'

const formDiv = document.querySelector(".formdiv")
const projectFormDiv = document.querySelector(".project-formdiv")


//Create a new project card
function createProjectCard(project, currentProject){
    const sidebar = document.querySelector(".sidebar");
    const projectsDiv = document.querySelector(".projects-div")
    const btn = document.querySelector(".add-project")
    const projectCard = document.createElement("div");
    projectCard.classList.add("projectCard")
    const projectLink = document.createElement("a")
    projectLink.textContent = project.title;
    projectLink.classList.add("project");
    projectLink.href = "#"
    projectsDiv.appendChild(projectCard)
    projectCard.appendChild(projectLink)

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "X"
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.classList.add("deleteProjectBtn")
    projectCard.appendChild(deleteBtn)

    projectLink.addEventListener("click", (currentProject)=>{
        currentProject = changeProject(project, currentProject)
        return currentProject
        
    })

    deleteBtn.addEventListener("click", ()=>{
        deleteProject(projectCard)
        clearToDos()
    })

    return {projectCard, currentProject}
} 

//Create a new todo card
function createToDoCard(todo){
    const todoDiv = document.querySelector(".todo")
    const todoCard = document.createElement("div")
    todoCard.classList.add("card")
    const todoCardTitle = document.createElement("h2")
    todoCardTitle.textContent = todo.title
    todoCard.appendChild(todoCardTitle)
    const todoCardDescription = document.createElement("p")
    todoCardDescription.textContent = todo.description
    todoCardDescription.classList.add("description")
    todoCard.appendChild(todoCardDescription)
    const todoCardDueDate = document.createElement("p")
    todoCardDueDate.textContent = "Due: " + format(parseISO(todo.dueDate), "PPP")
    todoCardDueDate.classList.add("date")
    todoCard.appendChild(todoCardDueDate)
    const todoCardPriority = document.createElement("p")
    todoCardPriority.textContent = "Priority: " + todo.priority
    todoCard.appendChild(todoCardPriority)
    const todoCardNotes = document.createElement("p")
    todoCardNotes.textContent = "Notes: " + todo.notes
    todoCard.appendChild(todoCardNotes)
    todoCard.setAttribute("project", Object.getPrototypeOf(todo).title )
    todoDiv.appendChild(todoCard)

    if (todo.priority === "High"){
        todoCard.classList.add("high")
    }
    if (todo.priority === "Medium"){
        todoCard.classList.add("medium")
    }
    if (todo.priority === "Low"){
        todoCard.classList.add("low")
    }

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.classList.add("editBtn")
    todoCard.append(editBtn)
    

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "X"
    deleteBtn.classList.add("deleteBtn")
    todoCard.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", ()=>{
        deleteToDo(todoCard)
    })

    editBtn.addEventListener("click", ()=>{
        editToDo(todo, todoCard)
    })

}
//Add event listener to add todo button
function formPopUp(){
    const addBtn = document.querySelector(".add")
    addBtn.addEventListener("click", ()=>{
        toggleForm()
    })
    }


//Toggles if form is displayed and hides all todos
function toggleForm(){
    formDiv.classList.toggle("hide")
    const todos = document.querySelectorAll(".card")
    if (formDiv.classList.contains("hide")){
        for (const card of todos){
            card.classList.toggle("hide")
        }
}   
    else{
        for (const card of todos){
            card.classList.add("hide")
        }
    }
}

//Add event listener to add project button
function projectFormPopUp(){
    const addBtn = document.querySelector(".add-project")
    addBtn.addEventListener("click", ()=>{
        toggleProjectForm()
        clearToDos()
    })
    }

//Toggle if project form is displayed and toggles all todos
function toggleProjectForm(){
    const projectFormDiv = document.querySelector(".project-formdiv")
    projectFormDiv.classList.toggle("hide")
    const todos = document.querySelectorAll(".card")
    for (const card of todos){
        card.classList.toggle("hide")
    }
}

//Remove all todos from display
function clearToDos(){
    const cards = document.querySelectorAll(".card")
    for (const card of cards){
        card.classList.add("hide")
    }
}

//Show all todos
function showToDos(){
    const cards = document.querySelectorAll(".card")
    for (const card of cards){
        card.classList.remove("hide")
    }
}





export { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, toggleForm, toggleProjectForm, showToDos }

