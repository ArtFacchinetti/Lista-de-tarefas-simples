const APIurl = "/tasks"
const taskList = document.getElementById("lista-tarefas");

function handleEditTask(id) {};

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

    taskList.innerHTML = '';
    
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
                    <button class="btn-check" title="Concluir" onclick="handleCheckTask(${task.id},true)">✔️</button>
                    <button class="btn-edit" title="Editar"  onclick="handleEditTask(${task.id})">🪶</button>
                    <button class="btn-delete" title="Deletar"  onclick="handleDeleteTask(${task.id})">🗑️</button>`
                        : 
                     `<button class="btn-uncheck" title="Refazer" onclick="handleCheckTask(${task.id},false)">❌</button>
                     <button class="btn-delete" title="Deletar" onclick="handleDeleteTask(${task.id})">🗑️</button>`
                    }
                </div>
        `
        taskList.appendChild(taskCard)
    });
}

async function handleDeleteTask(id) {
        try {
    const response = await fetch(`${APIurl}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
      // Throwing an error here moves the execution to the catch block
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    loadTasks()

  } catch (error) {
    console.error('Fetch operation failed:', error.message);
  }
};

async function handleCheckTask(id, check) {
    try {
    const response = await fetch(check ? `${APIurl}/check/${id}` : `${APIurl}/uncheck/${id}`, {
        method: "PUT"
    });

    if (!response.ok) {
      // Throwing an error here moves the execution to the catch block
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    loadTasks()

  } catch (error) {
    console.error('Fetch operation failed:', error.message);
  }
};

async function handleCreateTask () {
  try {
  const body = {
    title: document.getElementById("titulo").value,
    description: document.getElementById("descricao").value
  }

  console.log(JSON.stringify(body))


    const response = await fetch(APIurl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json" // Essencial para o servidor ler seu JSON
    },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
      // Throwing an error here moves the execution to the catch block
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    modal.style.display = 'none';
    loadTasks()

  } catch (error) {
    console.log(error)
    console.error('Fetch operation failed:', error.message);
  }
}


///////////
// Modal //
///////////

const modal = document.getElementById('modal-container');
const btnNovaTarefa = document.getElementById('btn-nova-tarefa');
const btnCancelar = document.getElementById('btn-cancelar');

// Abrir modal
btnNovaTarefa.onclick = () => {
    modal.style.display = 'flex';
};

// Fechar modal
btnCancelar.onclick = () => {
    modal.style.display = 'none';
};

// Fechar se clicar fora da caixa branca
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

loadTasks()