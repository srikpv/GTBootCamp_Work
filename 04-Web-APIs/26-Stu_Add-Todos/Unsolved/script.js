var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
const TODOS = "TODOS";
var todos = [];

function renderTodos() {
  var count = 0;
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;
  todos.forEach(element => {
      var node = document.createElement("LI");
      node.setAttribute("data-attribute", count++);
      var textNode = document.createTextNode(element);
      node.appendChild(textNode);
      var btn = document.createElement("button");
      btn.textContent = "Complete";
      node.appendChild(btn);
      todoList.appendChild(node);
  });
  localStorage.setItem(TODOS, JSON.stringify(todos));
}

todoForm.addEventListener("submit", function(e){
  e.preventDefault();
  var todo = todoInput.value.trim();
  if(todo.length > 0) {
    todos.push(todo);
    todoInput.value = "";
    renderTodos();
  }
});

todoList.addEventListener("click", function(e) {
  if(e.target.tagName == "BUTTON"){
    let completed = e.target.parentNode.getAttribute("data-attribute");
    todos.splice(completed, 1);
    renderTodos();
  }
});

window.addEventListener("load", function(){
  let local_storage_todos = localStorage.getItem(TODOS);
  if (local_storage_todos != null)
    todos = JSON.parse(local_storage_todos);
  renderTodos();
});