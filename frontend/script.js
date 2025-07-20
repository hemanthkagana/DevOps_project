document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const itemsLeftSpan = document.getElementById('items-left');
    const themeSwitch = document.getElementById('theme-switch');

    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTodos();
    updateItemsLeft();
    checkThemePreference();

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });

        clearCompletedBtn.addEventListener('click', clearCompleted);
        themeSwitch.addEventListener('change', toggleTheme);

        // Functions
        function addTodo() {
            const text = todoInput.value.trim();
            if (text) {
                const newTodo = {
                    id: Date.now(),
                          text,
                          completed: false
                };
                todos.push(newTodo);
                saveTodos();
                renderTodos();
                updateItemsLeft();
                todoInput.value = '';
                todoInput.focus();
            }
        }

        function renderTodos() {
            todoList.innerHTML = '';

            const filteredTodos = todos.filter(todo => {
                if (currentFilter === 'active') return !todo.completed;
                if (currentFilter === 'completed') return todo.completed;
                return true;
            });

            if (filteredTodos.length === 0) {
                const emptyMessage = document.createElement('li');
                emptyMessage.textContent = currentFilter === 'all' ? 'No tasks yet!' :
                currentFilter === 'active' ? 'No active tasks!' :
                'No completed tasks!';
                emptyMessage.classList.add('empty-message');
                todoList.appendChild(emptyMessage);
                return;
            }

            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = 'todo-item' + (todo.completed ? ' completed' : '');
                li.dataset.id = todo.id;

                li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
                `;

                const checkbox = li.querySelector('.todo-checkbox');
                const deleteBtn = li.querySelector('.delete-btn');

                checkbox.addEventListener('change', () => toggleComplete(todo.id));
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                });

                li.addEventListener('dblclick', () => editTodo(todo.id, li));

                todoList.appendChild(li);
            });
        }

        function toggleComplete(id) {
            todos = todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
            );
            saveTodos();
            updateItemsLeft();
        }

        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
            updateItemsLeft();
        }

        function clearCompleted() {
            todos = todos.filter(todo => !todo.completed);
            saveTodos();
            renderTodos();
            updateItemsLeft();
        }

        function editTodo(id, li) {
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const textSpan = li.querySelector('.todo-text');
            const currentText = textSpan.textContent;

            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'edit-input';

            textSpan.replaceWith(input);
            input.focus();

            function saveEdit() {
                const newText = input.value.trim();
                if (newText && newText !== currentText) {
                    todos = todos.map(t =>
                    t.id === id ? {...t, text: newText} : t
                    );
                    saveTodos();
                }
                renderTodos();
            }

            input.addEventListener('blur', saveEdit);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') saveEdit();
            });
        }

        function updateItemsLeft() {
            const activeCount = todos.filter(todo => !todo.completed).length;
            itemsLeftSpan.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;
        }

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkTheme', themeSwitch.checked);
        }

        function checkThemePreference() {
            const darkTheme = localStorage.getItem('darkTheme') === 'true';
            if (darkTheme) {
                document.body.classList.add('dark-theme');
                themeSwitch.checked = true;
            }
        }
});
