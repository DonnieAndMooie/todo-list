import './styles.css';
import {ToDo, createNewToDo} from './todo';
import {Project, createNewProject} from './project';
import { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, toggleForm, toggleProjectForm, showToDos } from './DOM';
import { addToDoFormSubmit, addProjectFormSubmit } from './listeners';
import { changeProject } from './listeners';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDQSMs0np2tg7IBCMYdAr2pmSBr3fXjzVw",
    authDomain: "todo-list-a045c.firebaseapp.com",
    projectId: "todo-list-a045c",
    storageBucket: "todo-list-a045c.appspot.com",
    messagingSenderId: "680695658362",
    appId: "1:680695658362:web:d649e09ff0a1f65cbd88c3"
  };

const app = initializeApp(firebaseConfig)

const signInBtn = document.querySelector(".sign-in")
const signOutBtn = document.querySelector(".sign-out")
const profilePic = document.querySelector(".profile-pic")
const usernameDiv = document.querySelector(".username")

async function signIn(){
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider); 

}

function signOutUser(){
    signOut(getAuth())
}

function getProfilePicUrl(){
    return getAuth().currentUser.photoURL
}

function getUserName(){
    return getAuth().currentUser.displayName
}

function authStateObserver(user){
    if (user){
        const profilePicUrl = getProfilePicUrl()
        const username = getUserName()
        signInBtn.classList.add("hide")
        profilePic.src = profilePicUrl
        usernameDiv.textContent = username
        profilePic.classList.remove("hide")
        usernameDiv.classList.remove("hide")
        signOutBtn.classList.remove("hide")
    }
    else{
        usernameDiv.classList.add("hide")
        profilePic.classList.add("hide")
        signInBtn.classList.remove("hide")
        signOutBtn.classList.add("hide")
    }
}

function initFirebaseAuth(){
    onAuthStateChanged(getAuth(), authStateObserver);
}

initFirebaseAuth()
signInBtn.addEventListener("click", signIn)
signOutBtn.addEventListener("click", signOutUser)

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


