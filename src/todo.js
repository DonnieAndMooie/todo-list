import { addDoc, collection, DocumentReference, doc, updateDoc, setDoc } from "firebase/firestore"
import { firestore } from "."


//ToDo Construction
function ToDoConstructor(title, description, dueDate, priority, notes){
    return {title, description, dueDate, priority, notes}
}

async function saveTodo(newTodo){
    const docRef = await setDoc(doc(firestore, 'todos', newTodo.title), newTodo)
    return docRef
}

//Returns a todo object
async function createNewToDo(uid){
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const dueDate = document.getElementById("dueDate").value
    const dateInput = document.getElementById("dueDate").value
    const  priority = document.getElementById("priority").value
    const notes = document.getElementById("notes").value
    const newToDo =   ToDoConstructor(title, description, dueDate, priority, notes)
    newToDo.project =  JSON.stringify(currentProject)
    newToDo.uid = uid
    if (uid){
        await saveTodo(newToDo)
    }
    return newToDo
}


export { createNewToDo, ToDoConstructor }