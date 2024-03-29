import {createNewToDo} from './todo';
import {createToDoCard, createProjectCard, clearToDos, toggleForm, toggleProjectForm} from './DOM';
import {createNewProject} from './project';
import { collection, deleteDoc, doc, getFirestore, query, onSnapshot, where, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { firestore } from '.';

//Creates new todo card when form is submitted
async function addToDoFormSubmit(uid){
    const newToDo =  await createNewToDo(uid)
    newToDo.project = JSON.parse(newToDo.project).title
    await createToDoCard(newToDo)
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
function addProjectFormSubmit(){
    const newProject = createNewProject()
    const newProjectCard = createProjectCard(newProject).projectCard
    currentProject = newProject
    const projectForm = document.querySelector(".project-form")
    projectForm.reset()
    clearToDos()
    toggleProjectForm()
    newProjectCard.click()
    changeProject(currentProject)
}

//Change to display a different project
function changeProject(project){
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
}

//Delete todo
async function deleteToDo(todoCard, todo){
    todoCard.innerHTML = ""
    const docRef = await doc(firestore, "todos", todo.title)
    await deleteDoc(docRef)
}



//Delete Project
async function deleteProject(projectCard, project){
    const todoCards = document.querySelectorAll(".card")
    for(const card of todoCards){
        const projectAttribute = card.getAttribute("project")
        if (project.title === projectAttribute){
            card.innerHTML = ""
        }
    }
    const query = await getDocs(collection(firestore, "todos"))
    query.forEach(async (document) => {
        const todo = await document.data()
        if (JSON.parse(todo.project).title === project.title){
            const docRef = await doc(firestore, "todos", todo.title)
            await deleteDoc(docRef)
        }
    })
    projectCard.innerText = ""
}

//When edit button is pressed, display correct form
function editToDo(todo, todoCard){
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
    toggleForm()
    deleteToDo(todoCard, todo)

}

export {addToDoFormSubmit, addProjectFormSubmit, changeProject, deleteToDo, editToDo, deleteProject}