class Tarefa {
  constructor(texto) {
    this.texto = texto;
    this.concluida = false;
  }

  toggle() {
    this.concluida = !this.concluida;
  }
}

class App {
  constructor() {
    this.tarefas = [];
  }

  // Validação dos números no topo
  atualizarContadores() {
    const abertas = this.tarefas.filter(t => !t.concluida).length;
    const concluidas = this.tarefas.filter(t => t.concluida).length;

    document.getElementById("qtdAbertas").innerText = abertas;
    document.getElementById("qtdConcluidas").innerText = concluidas;
  }

  adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (texto === "") return;

    const novaTarefa = new Tarefa(texto);
    this.tarefas.push(novaTarefa);
    
    input.value = "";
    this.render();
  }

  removerTarefa(index) {
    this.tarefas.splice(index, 1);
    this.render();
  }

  toggleTarefa(index) {
    this.tarefas[index].toggle();
    this.render();
  }

  render() {
    const lista = document.getElementById("lista");
    if (!lista) return; // Segurança caso o elemento não exista
    
    lista.innerHTML = "";

    this.tarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");
      
      li.innerHTML = `
        <span class="${tarefa.concluida ? "concluida" : ""}">
          ${tarefa.texto}
        </span>
        <div>
          <button onclick="app.toggleTarefa(${index})">✔</button>
          <button onclick="app.removerTarefa(${index})">🚮</button>
        </div>
      `;
      lista.appendChild(li);
    });

    // Chama a validação dos contadores
    this.atualizarContadores();
  }
}

// Cria a instância global para o HTML encontrar
const app = new App();