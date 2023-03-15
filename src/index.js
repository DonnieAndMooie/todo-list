import './styles.css';
import {ToDoConstructor, createNewToDo} from './todo';
import {Project, createNewProject} from './project';
import { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, toggleForm, toggleProjectForm, showToDos, deleteAllTodos } from './DOM';
import { addToDoFormSubmit, addProjectFormSubmit } from './listeners';
import { changeProject } from './listeners';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp, getDocs, getFirestore } from 'firebase/firestore'

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
    deleteAllTodos()
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider); 

}

function signOutUser(){
    deleteAllTodos()
    signOut(getAuth())
    
}

function getProfilePicUrl(){
    return getAuth().currentUser.photoURL
}

function getUserName(){
    return getAuth().currentUser.displayName
}

let uid

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
        uid = user.uid
        loadFromStorage(uid)
    }
    else{
        usernameDiv.classList.add("hide")
        profilePic.classList.add("hide")
        signInBtn.classList.remove("hide")
        signOutBtn.classList.add("hide")
        uid = null
        loadFromStorage(uid)
    }
}

function initFirebaseAuth(){
    onAuthStateChanged(getAuth(), authStateObserver);
}

initFirebaseAuth()
signInBtn.addEventListener("click", signIn)
signOutBtn.addEventListener("click", signOutUser)

//const test = new ToDo("Walk", "Round the block", "2002-10-21", "High", "No notes")
const defaultProject = new Project("My Project")

global.currentProject = defaultProject
//Object.setPrototypeOf(test, defaultProject)


createProjectCard(defaultProject)
//createToDoCard(test)




const form = document.querySelector(".form")
form.addEventListener("submit", async ()=>{
    event.preventDefault()
    await addToDoFormSubmit(uid)
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


async function loadFromStorage(uid){
    const createdProjects = [defaultProject.title]
    const todosQuery = await getDocs(collection(getFirestore(), 'todos'))
    todosQuery.forEach((doc) => {
        const todo = doc.data()
        if (todo.uid === uid){
            const project = JSON.parse(todo.project)
        if (!createdProjects.includes(project.title)){
                createProjectCard(project)
                createdProjects.push(project.title)
            }
            changeProject(project)
            
            createToDoCard(todo, project.title)
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

const firestore = getFirestore()

export { firestore }
