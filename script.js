const form = document.getElementById("form")
const input = document.querySelector("#input")
const list = document.getElementById("list")
const count = document.getElementById("count")
const completeCount = document.getElementById("completedCount")
const deleteAll = document.querySelector(".deleteAll button")
const error = document.querySelector("#error")

let tasks = []
let editIndex = null;
let editSpan = null;

function updateCount() {
    count.textContent = tasks.length
}

function updateCompleted() {
    completeCount.textContent =
        document.querySelectorAll("#list select option:checked[value='complete']").length
}

const regex = /^[A-Za-z ]+$/

form.addEventListener("submit", function (e) {

    e.preventDefault()

    let task = input.value.trim()

    console.log("Submitted Task:", task)

    if (task === "") {
        error.textContent = "Type the Task"
        return
    }

    if (!regex.test(task)) {
        error.textContent = "Invalid text format"
        return
    }

    error.textContent = ""

    if (editIndex !== null) {
        tasks[editIndex] = task
        editSpan.textContent = task

        editIndex = null
        editSpan = null

        document.querySelector(".add").textContent = "Add Task"

        input.value = ""
        updateCount()
        return
    }

    tasks.push(task)

    let li = document.createElement("li")

    let span = document.createElement("span")
    span.textContent = task

    let btnGroup = document.createElement("div")

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    let status = document.createElement("select")

    let show = document.createElement("option")
    show.textContent="Select"

    let pending = document.createElement("option")
    pending.value = "pending"
    pending.textContent = "Pending"

    let complete = document.createElement("option")
    complete.value = "complete"
    complete.textContent = "Complete"

    status.appendChild(show)
    status.appendChild(pending)
    status.appendChild(complete)

    status.addEventListener("change", function(){
        updateCompleted()
    })

    li.appendChild(span)
    btnGroup.appendChild(status) 
    btnGroup.appendChild(editBtn)
    btnGroup.appendChild(deleteBtn)

    li.appendChild(btnGroup)
    list.appendChild(li)

    editBtn.addEventListener("click", function () {
        input.value = span.textContent
        editIndex = tasks.indexOf(span.textContent)
        editSpan = span

        document.querySelector(".add").textContent = "Update Task"
    })

    deleteBtn.addEventListener("click", function () {
        const index = tasks.indexOf(span.textContent)
        if (index > -1) tasks.splice(index, 1)
        li.remove()
        updateCount()
        updateCompleted()
    })

    deleteAll.addEventListener("click", function(){
        tasks=[]
        list.innerHTML=""
        updateCount()
        updateCompleted()
    })

    input.value = ""
    updateCount()
    updateCompleted()

    console.log(tasks)
})