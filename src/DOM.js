function createProjectCard(project){
    const sidebar = document.querySelector(".sidebar");
    const projectCard = document.createElement("a");
    projectCard.textContent = project.title;
    projectCard.classList.add("project");
    projectCard.href = "#"
    sidebar.appendChild(projectCard)
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

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "X"
    deleteBtn.classList.add("deleteBtn")
    todoCard.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", ()=>{
        todoCard.innerText = ""
    })

}

function formPopUp(){
    const addBtn = document.querySelector(".add")
    const formDiv = document.querySelector(".formdiv")
    const submitBtn = document.querySelector(".submit")
    const form = document.querySelector(".form")

    function toggleForm(){
        formDiv.classList.toggle("hide")
        const todos = document.querySelectorAll(".card")
        for (const card of todos){
            card.classList.toggle("hide")
        }
    }

    addBtn.addEventListener("click", toggleForm)
    form.addEventListener("submit", ()=>{
        event.preventDefault()
        toggleForm()
        const todos = document.querySelectorAll(".card")
        for (const card of todos){
            card.classList.remove("hide")
        }
    })
    }


export { createProjectCard, createToDoCard, formPopUp }