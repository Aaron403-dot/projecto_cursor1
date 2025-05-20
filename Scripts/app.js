document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Cargar tareas guardadas
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Función para guardar tareas en localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Función para renderizar las tareas
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.style.cursor = 'pointer';
            taskText.onclick = () => toggleTask(index);

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Editar';
            editButton.onclick = () => editTask(index);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => deleteTask(index);            

            li.appendChild(taskText);
            li.appendChild(deleteButton);
            li.appendChild(editButton);
            taskList.appendChild(li);
        });
    };

    // Función para agregar una nueva tarea
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    // Función para eliminar una tarea
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Función para marcar/desmarcar una tarea como completada
    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Función para editar una tarea
    const editTask = (index) => {
        const newText = prompt('Editar tarea:', tasks[index].text);
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        }
    };

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Renderizar tareas iniciales
    renderTasks();
}); 