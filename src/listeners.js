import {createNewToDo} from './todo';
import {createToDoCard, createProjectCard, clearToDos, toggleForm, toggleProjectForm} from './DOM';
import {createNewProject} from './project';


//Creates new todo card when form is submitted
function addToDoFormSubmit(currentProject){
    const newToDo = createNewToDo(currentProject)
    createToDoCard(newToDo)
    const form = document.querySelector(".form")
    form.reset()
    
    const formHeader = document.querySelector(".form-header")
    const formBtn = document.querySelector(".submit")
    formHeader.textContent = "New To-Do"
    formBtn.textContent = "Add To-Do"

    clearToDos()
    toggleForm()
    changeProject(currentProject)
}

//Creates new project card when form is submitted
function addProjectFormSubmit(currentProject){
    const newProject = createNewProject()
    const newProjectCard = createProjectCard(newProject, currentProject).projectCard
    currentProject = newProject
    const projectForm = document.querySelector(".project-form")
    projectForm.reset()
    clearToDos()
    toggleProjectForm()
    newProjectCard.click()
    changeProject(currentProject)
    return currentProject
}

//Change to display a different project
function changeProject(project, currentProject){
    clearToDos()
    const cards = document.querySelectorAll(".card")
    for (const card of cards){
        if (card.getAttribute("project") === project.title){
            card.classList.remove("hide")
        }
        else{
            card.classList.add("hide")
        }
    }
    currentProject = project
    return currentProject
}

//Delete todo
function deleteToDo(todoCard, todo){
    todoCard.innerText = ""
    localStorage.removeItem(todo.title)
}

//Delete Project
function deleteProject(projectCard, project){
    const todoCards = document.querySelectorAll(".card")
    for(const card of todoCards){
        const projectAttribute = card.getAttribute("project")
        if (project.title === projectAttribute){
            const cardTitle = card.firstElementChild.textContent
            localStorage.removeItem(cardTitle)
            card.innerHTML = ""
        }
    }
    projectCard.innerText = ""
}

//When edit button is pressed, display correct form
function editToDo(todo, todoCard){
    todoCard.innerText = ""
    const formHeader = document.querySelector(".form-header")
    const formBtn = document.querySelector(".submit")
    const titleInput = document.getElementById("title")
    const descriptionInput = document.getElementById("description")
    const dateInput = document.getElementById("dueDate")
    const priorityInput = document.getElementById("priority")
    const notesInput = document.getElementById("notes")
    formHeader.textContent = "Edit To-Do"
    formBtn.textContent = "Confirm Changes"
    titleInput.value = todo.title
    descriptionInput.value = todo.description
    dateInput.value = todo.dueDate
    priorityInput.value = todo.priority
    notesInput.value = todo.notes
    todoCard.innerText = ""
    toggleForm()

}

export {addToDoFormSubmit, addProjectFormSubmit, changeProject, deleteToDo, editToDo, deleteProject}