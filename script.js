// ======================================================
// CLASSE Tarefa
// ======================================================
// Esta classe serve como um "modelo" para criar tarefas.
// Sempre que criamos uma nova tarefa, estamos criando
// um OBJETO baseado nessa classe.
//
// Exemplo:
// const tarefa1 = new Tarefa("Estudar JavaScript");
//
// A tarefa criada terá:
// texto = "Estudar JavaScript"
// concluida = false
// ======================================================

class Tarefa {

  // O constructor é executado automaticamente
  // quando usamos "new Tarefa()"
  constructor(texto) {

    // ATRIBUTO:
    // Guarda o texto digitado pelo usuário
    this.texto = texto;

    // ATRIBUTO:
    // Define se a tarefa foi concluída ou não.
    // Toda tarefa começa como FALSE,
    // ou seja, ainda não foi concluída.
    this.concluida = false
  }

  // ==================================================
  // MÉTODO toggle()
  // ==================================================
  // "toggle" é uma palavra em inglês muito usada
  // na programação.
  //
  // Significa:
  // alternar / trocar / inverter estado
  //
  // Exemplo:
  // ligado -> desligado
  // aberto -> fechado
  // true -> false
  //
  // Neste caso:
  // se a tarefa estiver concluída (true),
  // ela volta para não concluída (false).
  //
  // Se estiver false,
  // passa para true.
  // ==================================================

  toggle() {

    // O operador ! significa "inverter".
    //
    // Exemplos:
    // !true  = false
    // !false = true
    //
    // Então aqui estamos dizendo:
    // "pegue o valor atual e inverta"

    this.concluida = !this.concluida;
  }
}



// ======================================================
// CLASSE App
// ======================================================
// Essa classe controla toda a aplicação.
//
// Ela é responsável por:
// - adicionar tarefas
// - remover tarefas
// - marcar tarefas
// - atualizar a tela
// ======================================================

class App {

  constructor() {

    // ARRAY DE TAREFAS
    // Aqui ficam armazenados todos os objetos criados
    //
    // Exemplo:
    // [
    //   Tarefa {texto: "Estudar", concluida: false},
    //   Tarefa {texto: "Treinar", concluida: true}
    // ]

    this.tarefas = [];
  }



  // ==================================================
  // MÉTODO adicionarTarefa()
  // ==================================================
  // Esse método é executado quando o usuário
  // clica no botão de adicionar.
  // ==================================================

  adicionarTarefa() {

    // Pega o elemento input do HTML
    const input = document.getElementById("tarefaInput");

    // Pega o texto digitado pelo usuário
    const texto = input.value;

    // Verifica se o usuário deixou vazio
    //
    // Se estiver vazio:
    // return encerra o método imediatamente
    if (texto === "") return;

    // Cria um NOVO OBJETO da classe Tarefa
    const novaTarefa = new Tarefa(texto);

    // Adiciona o objeto dentro do array tarefas
    this.tarefas.push(novaTarefa);

    // Limpa o campo input
    input.value = "";

    // Atualiza a lista na tela
    this.render();
  }



  // ==================================================
  // MÉTODO removerTarefa(index)
  // ==================================================
  // Remove uma tarefa do array usando a posição.
  //
  // Exemplo:
  // index 0 = primeira tarefa
  // index 1 = segunda tarefa
  // ==================================================

  removerTarefa(index) {

    // splice remove elementos do array
    //
    // splice(posição, quantidade)
    //
    // Exemplo:
    // splice(1,1)
    // remove 1 elemento na posição 1

    this.tarefas.splice(index, 1);

    // Atualiza a tela
    this.render();
  }



  // ==================================================
  // MÉTODO toggleTarefa(index)
  // ==================================================
  // Marca ou desmarca a tarefa como concluída.
  // ==================================================

  toggleTarefa(index) {

    // Acessa uma tarefa específica do array
    // e executa o método toggle()

    this.tarefas[index].toggle();

    // Atualiza a tela
    this.render();
  }



  // ==================================================
  // MÉTODO render()
  // ==================================================
  // Responsável por desenhar os elementos HTML
  // na tela.
  //
  // Toda vez que algo muda:
  // - adiciona
  // - remove
  // - conclui tarefa
  //
  // esse método é chamado novamente.
  // ==================================================

  render() {

    // Pega a lista do HTML
    const lista = document.getElementById("lista");

    // Limpa o conteúdo atual da lista
    //
    // Isso evita duplicações na tela.
    lista.innerHTML = "";



    // forEach percorre todo o array tarefas
    //
    // tarefa = objeto atual
    // index = posição da tarefa
    //
    // Exemplo:
    // tarefa 0
    // tarefa 1
    // tarefa 2

    this.tarefas.forEach((tarefa, index) => {

      // Cria um elemento <li>
      const li = document.createElement("li");



      // innerHTML adiciona HTML dentro da li
      li.innerHTML = `

        <!--
          Se tarefa.concluida for TRUE:
          adiciona a classe "concluida"

          Se for FALSE:
          não adiciona nada
        -->

        <span class="${tarefa.concluida ? "concluida" : ""}">
          ${tarefa.texto}
        </span>

        <div>

          <!--
            Botão para concluir/desmarcar tarefa
          -->
          <button onclick="app.toggleTarefa(${index})">
            ✔
          </button>

          <!--
            Botão para remover tarefa
          -->
          <button onclick="app.removerTarefa(${index})">
            🚮
          </button>

        </div>
      `;

      // Adiciona a <li> dentro da lista <ul>
      lista.appendChild(li);
    });
  }
}



// ======================================================
// CRIAÇÃO DO OBJETO PRINCIPAL
// ======================================================
//
// Aqui estamos criando UM OBJETO da classe App.
//
// Esse objeto será responsável por controlar
// toda a aplicação.
//
// Depois disso podemos usar:
//
// app.adicionarTarefa()
// app.render()
// app.removerTarefa()
//
// ======================================================

const app = new App();