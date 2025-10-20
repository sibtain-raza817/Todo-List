// Select DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Try to load saved todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement('li');

  // Checkbox to toggle completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
    saveTodo();
  });

  // Create span for text
  const textSpan = document.createElement('span');
  textSpan.textContent = todo.text;
  textSpan.style.margin = '0 8px';
  if (todo.completed) {
    textSpan.style.textDecoration = 'line-through';
  }

  // Double click to edit todo
  textSpan.addEventListener('dblclick', () => {
    const newText = prompt('Edit todo', todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodo();
    }
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    todos.splice(index, 1);
    render();
    saveTodo();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = '';
  saveTodo();
  render();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e)=>{
    if(e.key =='Enter'){
        addTodo();
    }
})
render();
