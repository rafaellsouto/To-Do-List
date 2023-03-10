let input = document.querySelector('input[name=tarefa]');
let btn = document.querySelector('#botao');
let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
// [
//     'Ler',
//     'Anotar',
//     'Revisar'
// ];

let renderizarTarefa = () =>
{
    // limpar listagem para mostrar adição de elemento
    lista.innerHTML = '';

    for( let tarefa of tarefas )
    {
        let itemLista = document.createElement('li');

        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        itemLista.onclick = function()
        {
            deletarTarefa(this);
        }

        let itemTexto = document.createTextNode(tarefa);

        itemLista.appendChild(itemTexto);

        lista.appendChild(itemLista);
    }
}

renderizarTarefa();

// adiciona novo elemento
btn.onclick = function()
{
    let novaTarefa = input.value;

    if( novaTarefa !== "" )
    {
        tarefas.push(novaTarefa);

        renderizarTarefa();

        input.value = '';

        removerSpans();

        savingStorage();
    } else {
        let card = document.querySelector('.card');

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msgErro = document.createTextNode('Informe o valor.');

        span.appendChild(msgErro);

        card.appendChild(span);
    }
}

document.addEventListener('keydown', function(event)
{
    if( event.key === "Enter" )
    {
        let novaTarefa = input.value;

        if( novaTarefa !== "" )
        {
            tarefas.push(novaTarefa);

            renderizarTarefa();

            input.value = '';

            removerSpans();

            savingStorage();
        } else {
            let card = document.querySelector('.card');

            let span = document.createElement('span');

            span.setAttribute('class', 'alert alert-warning');

            let msgErro = document.createTextNode('Informe o valor.');

            span.appendChild(msgErro);

            card.appendChild(span);
        }
    }    
})

let removerSpans = () =>
{
    let spans = document.querySelectorAll('span');

    let card = document.querySelector('.card');

    for( let s = 0; s < spans.length; s++ )
    {
        card.removeChild(spans[s]);
    }
}

let deletarTarefa = (tarefa) =>
{
    tarefas.splice(tarefas.indexOf(tarefa.textContent), 1);

    renderizarTarefa();

    savingStorage();
}

let savingStorage = () =>
{
    // constante localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}