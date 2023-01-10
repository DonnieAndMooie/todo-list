//Class for ToDo Objects
class ToDo{
    constructor(title, description, dueDate, priority, notes){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
    }
}

//Returns a todo object
function createNewToDo(){
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const dueDate = document.getElementById("dueDate").value
    const dateInput = document.getElementById("dueDate").value
    const  priority = document.getElementById("priority").value
    const notes = document.getElementById("notes").value
    const newToDo = new ToDo(title, description, dueDate, priority, notes)
    return newToDo
}

export { createNewToDo, ToDo }