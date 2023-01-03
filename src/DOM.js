const formDiv = document.querySelector(".formdiv")
const projectFormDiv = document.querySelector(".project-formdiv")

function createProjectCard(project){
    const sidebar = document.querySelector(".sidebar");
    const projectsDiv = document.querySelector(".projects-div")
    const btn = document.querySelector(".add-project")
    const projectCard = document.createElement("a");
    projectCard.textContent = project.title;
    projectCard.classList.add("project");
    projectCard.href = "#"
    projectsDiv.appendChild(projectCard)

}

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
    todoCardDueDate.textContent = "Due: " + todo.dueDate
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
        todoCard.innerText = ""})

    editBtn.addEventListener("click", ()=>{
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
        toggleForm()

        
    })

    

}


function formPopUp(){
    const addBtn = document.querySelector(".add")
    const form = document.querySelector(".form")


    addBtn.addEventListener("click", toggleForm)
    form.addEventListener("submit", ()=>{
        event.preventDefault()
        clearToDos()
        toggleForm()
        changeProject()
    })
    }

function toggleForm(){
    formDiv.classList.toggle("hide")
    const todos = document.querySelectorAll(".card")
    for (const card of todos){
        card.classList.add("hide")
    }}

function projectFormPopUp(){
    const addBtn = document.querySelector(".add-project")
    const form = document.querySelector(".project-form")

    addBtn.addEventListener("click", toggleProjectForm)
    form.addEventListener("submit", ()=>{
        clearToDos()
        event.preventDefault()
        toggleProjectForm()
        changeProject()
        })
    }

function toggleProjectForm(){
    projectFormDiv.classList.toggle("hide")
    const todos = document.querySelectorAll(".card")
    for (const card of todos){
        card.classList.toggle("hide")
    }
}


function clearToDos(){
    const cards = document.querySelectorAll(".card")
    for (const card of cards){
        card.classList.add("hide")
    }
}

function changeProject(){
    const projects = document.querySelectorAll(".project")
    for (const project of projects){
        project.addEventListener("click", ()=>{
            clearToDos()
            const cards = document.querySelectorAll(".card")
            for (const card of cards){
                if (card.getAttribute("project") === project.textContent){
                    card.classList.remove("hide")
                }
                else{
                    card.classList.add("hide")
                }
            }
            }
            )
        }
}

export { createProjectCard, createToDoCard, formPopUp, projectFormPopUp, clearToDos, changeProject }

