const input = document.querySelector("#input")
const add = document.querySelector(".add")
const del = document.querySelector(".delete")
const list = document.getElementById("list")

let tasks = []
let task
add.addEventListener("click", function () {
    task = input.value.trim()
    if (task !== "") {
        tasks.push(task)
    }

    let li=document.createElement("li")
    li.textContent=task
    list.appendChild(li)

    input.value = ""
    console.log(tasks)
})

del.addEventListener("click", function () {
    if (tasks.length > 0) {
        tasks.pop()
    }
    if (list.lastChild) {
        list.removeChild(list.lastChild)
    }

    console.log(tasks)   
})
