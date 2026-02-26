const APIurl = "/tasks"
const taskList = document.getElementById("lista-tarefas");

function handleCheckTask(id) {};
function handleEditTask(id) {};
function handleDeleteTask(id) {};


async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Throwing an error here moves the execution to the catch block
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Process the data (see next section)
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Fetch operation failed:', error.message);
  }
}

async function loadTasks () {
    const tasks = await fetchData(APIurl)
    
    tasks.forEach(task => {
        const taskCard = document.createElement("article");

        taskCard.classList.add("tarefa")
        if (task.done == true) {
            taskCard.classList.add("concluida")
        }

        taskCard.innerHTML = `
        <div class="info">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <span class="status ${task.done == true ? "feito" : "pendente"}">${
                        task.done == true ? "Concluída" : "Pendente"
                    }</span>
                </div>
                <div class="acoes">
                    ${
                        task.done != true ? `
                    <button class="btn-check" title="Concluir" onclick="handleCheckTask(${task.id})">✔️</button>
                    <button class="btn-edit" title="Editar"  onclick="handleEditTask(${task.id})">🪶</button>
                    <button class="btn-delete" title="Deletar"  onclick="handleDeleteTask(${task.id})">🗑️</button>`
                        : 
                     `<button class="btn-uncheck" title="Refazer">❌</button>
                     <button class="btn-delete" title="Deletar">🗑️</button>`
                    }
                </div>
        `
        taskList.appendChild(taskCard)
    });
}

loadTasks()