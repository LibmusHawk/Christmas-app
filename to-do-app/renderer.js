const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = [];

// Load saved todos from JSON file
async function loadTodos() {
  todos = await window.todoAPI.loadTodos(); // Get todos from main process
  renderTodos(); // Render todos in the UI
}

// Save todos to JSON file
function saveTodos() {
  window.todoAPI.saveTodos(todos); // Send updated todos to main process to save
}

// Render the list of todos
function renderTodos() {
  todoList.innerHTML = ''; // Clear the existing list in the UI
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo; // Set the todo text

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // Create a delete button for each todo
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1); // Remove the todo from the list
      renderTodos(); // Re-render the list after deletion
      saveTodos(); // Save the updated list to the file
    });

    li.appendChild(deleteButton); // Append the delete button to the todo item
    todoList.appendChild(li); // Add the todo item to the list in the UI
  });
}

// Add new task
addTodoButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push(task); // Add the new task to the todos array
    todoInput.value = ''; // Clear the input field
    renderTodos(); // Re-render the list with the new task
    saveTodos(); // Save the updated todo list
  }
});

// Load todos on startup
loadTodos(); // Call loadTodos to load the todos when the app starts
