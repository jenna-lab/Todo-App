const addButton = document.querySelector('.todo-input button');
const itemInput = document.getElementById('todo-input');
const todoList = document.querySelector('.todos ul');
const itemCount = document.querySelector('.count span');
const mobItemCount = document.querySelector('.mob-count span');
const selectedFilter = document.querySelector('.filters input[type="radio"]:checked');

// todo items from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = JSON.parse(localStorage.getItem('todoItems')) || [];
    storedTodos.forEach(todoText => createTodo(todoText));
});

addButton.addEventListener('click', () => {
    if (itemInput.value.length > 0) {
        createTodo(itemInput.value);
        itemInput.value = '';
    }
});

itemInput.addEventListener('keypress', (event) => {
    if (event.charCode === 13 && itemInput.value.length > 0) {
        createTodo(itemInput.value);
        itemInput.value = '';
    }
});


//create a todo
function createTodo(text) {
    const todo = document.createElement('li');
    todo.innerHTML =
        `
    <label class="list">
    <input class="checkbox" type="checkbox"> 
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;
    if (selectedFilter.id === 'completed') {
        todo.classList.add('hidden');
    }
    todoList.append(todo);
    updateCount(1);

    // Save updated todo items to local storage
    updateLocalStorage();
}

//counts number of todos left
function updateCount(num) {
    itemCount.innerText = +itemCount.innerText + num;
    mobItemCount.innerText = +mobItemCount.innerText + num;
}

//delete a todo
function deleteTodo(todoItem) {
    todoItem.remove();
    updateCount(-1);
    updateLocalStorage();
}


//update a todo by clicking on the specific todo
function updateTodoText(todoItem) {
    const textSpan = todoItem.querySelector('.text');
    const newText = prompt('Update todo:', textSpan.innerText);
    if (newText !== null) {
        textSpan.innerText = newText;
        updateLocalStorage();
    }
}


todoList.addEventListener('click', (event) => {
    const clickedTodo = event.target.closest('li');
    if (event.target.classList.contains('remove')) {
        deleteTodo(clickedTodo);
    } else if (event.target.classList.contains('text')) {
        updateTodoText(clickedTodo);
    } 

});


Sortable.create(simpleList);

function updateLocalStorage() {
    const todoItems = Array.from(document.querySelectorAll('.text')).map(span => span.innerText);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
