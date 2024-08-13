document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.querySelector(".todo-input");
    const addButton = document.querySelector(".add-button");
    const todosContainer = document.querySelector(".todos");
    const filters = document.querySelectorAll(".filter");
    const deleteAllButton = document.querySelector(".delete-all");
  
    let todos = [];
  
    addButton.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") addTodo();
    });
  
    filters.forEach((filter) =>
      filter.addEventListener("click", function () {
        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");
        filterTodos(filter.getAttribute("data-filter"));
      })
    );
  
    deleteAllButton.addEventListener("click", function () {
      todos = [];
      renderTodos();
    });
  
    function addTodo() {
      const task = todoInput.value.trim();
      if (task === "") return;
      const todo = {
        id: Date.now(),
        task,
        completed: false,
      };
      todos.push(todo);
      todoInput.value = "";
      renderTodos();
    }
  
    function renderTodos() {
      todosContainer.innerHTML = "";
      todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "todo";
  
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", function () {
          todo.completed = checkbox.checked;
          renderTodos();
        });
  
        const span = document.createElement("span");
        span.textContent = todo.task;
  
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener("click", function () {
          todos = todos.filter((t) => t.id !== todo.id);
          renderTodos();
        });
  
        label.appendChild(checkbox);
        label.appendChild(span);
        li.appendChild(label);
        li.appendChild(deleteButton);
  
        todosContainer.appendChild(li);
      });
      applyFilter(document.querySelector(".filter.active").getAttribute("data-filter"));
    }
  
    function applyFilter(filter) {
      const allTodos = document.querySelectorAll(".todo");
      allTodos.forEach((todo) => {
        switch (filter) {
          case "completed":
            if (todo.querySelector("input[type='checkbox']").checked) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "pending":
            if (!todo.querySelector("input[type='checkbox']").checked) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          default:
            todo.style.display = "flex";
            break;
        }
      });
    }
  
    function filterTodos(filter) {
      applyFilter(filter);
    }
  });
  