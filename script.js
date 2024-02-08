let body = document.body;
let add = document.querySelector('.add')
let main = document.querySelector('.main')
let mainDone = document.querySelector('.main.done')
let divMessage = document.querySelector('.message')

add.addEventListener('click',createTask)
document.addEventListener('click',removeTask)
document.addEventListener('click',editTask)
document.addEventListener('click', completeTask)

function createTask(event) {

    let table = document.createElement('table')
    table.classList.add('for-task');

    let tr = document.createElement('tr');

    let tdTask = document.createElement('td')
    tdTask.classList.add('task')
    let divTask = document.createElement('div')
    let textarea = document.createElement('textarea')
    textarea.setAttribute('placeholder','write here...')
    let p = document.createElement('p')

    let tdOption = document.createElement('td')
    tdOption.classList.add('option')
    let divOption = document.createElement('div')
    let spanComplete = document.createElement('span')
    spanComplete.textContent = '✔️'
    spanComplete.tabIndex = 0
    let spanEdit = document.createElement('span')
    spanEdit.classList.add('edit')
    spanEdit.textContent = '🖊️'
    let spanRemove = document.createElement('span')
    spanRemove.classList.add('remove')
    spanRemove.textContent = '🗑️'
    
    main.prepend(table)

    table.append(tr);

    tr.append(tdTask)
    tr.append(tdOption)

    tdTask.append(divTask)
    divTask.append(textarea)

    tdOption.append(divOption)

    divOption.append(spanComplete)
    divOption.append(spanEdit)
    divOption.append(spanRemove)

    textarea.focus()

    textarea.onblur = function(event) {
        p.textContent = textarea.value;
        if(!p.textContent) {
            table.remove();
            return
        }
        textarea.remove();
        divTask.append(p)
        setTimeout(() => spanComplete.classList.add('complete'), 1000)
    }  
}

function removeTask(event) {
    if(!event.target.classList.contains('remove')) return;

    let table = event.target.closest('table');

    table.remove()
}

function editTask(event) {
    if(!event.target.classList.contains('edit')) return

    let table = event.target.closest('table');
    let complete = table.querySelector('.complete')
    complete.classList.remove('complete')
    let p = table.querySelector('p')
    let div = p.closest('div')
    let textarea = document.createElement('textarea')

    textarea.value = p.textContent
    p.style.display = 'none'
    div.append(textarea)
    textarea.focus()
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length

    textarea.onblur = function (event) {
		p.textContent = textarea.value
        textarea.remove()
		if(!p.textContent) table.remove()
		p.style.display = ''
        setTimeout(()=> complete.classList.add('complete'),1000)
	}
}

function createDoneTask(text) {
    let table = document.createElement('table')
    table.classList.add('for-task','done')

    let tr = document.createElement('tr');

    let tdTask = document.createElement('td')
    tdTask.classList.add('task','done')
    let divTask = document.createElement('div')
    let p = document.createElement('p')
    p.textContent = text

    let tdOption = document.createElement('td')
    tdOption.classList.add('option', 'done')
    let divOption = document.createElement('div')
    let spanRemove = document.createElement('span')
    spanRemove.classList.add('remove', 'done')
    spanRemove.textContent = '🗑️'
    
    mainDone.prepend(table)

    table.append(tr);

    tr.append(tdTask)
    tr.append(tdOption)

    tdTask.append(divTask)
    divTask.append(p)

    tdOption.append(divOption)

    divOption.append(spanRemove)
}

function completeTask(event) {
    if(!event.target.classList.contains('complete')) return
    let completeTable = event.target.closest('table');
    let text = completeTable.querySelector('p').textContent
    completeTable.remove()
    createDoneTask(text)
    
}

let containerObserver = new MutationObserver(function() {
    let container = document.querySelector('.container')
    let main = container.querySelector('.main')
    let tables = main.querySelectorAll('table')
    if(tables.length === 0) {
        divMessage.style.display = 'block'
    } else {
        divMessage.style.display = 'none'
    }
})

containerObserver.observe(main, {
	childList: true,
})

let containerDoneObserver = new MutationObserver(function() {
    let containerDone = document.querySelector('.container.done')
    let main = containerDone.querySelector('.main.done')
	let tables = main.querySelectorAll('table.done')
    let divMessageDone = containerDone.querySelector('.message.done')

    if(tables.length === 0) {
        divMessageDone.style.display = 'block'
    } else {
        divMessageDone.style.display = 'none'
    } 
})

containerDoneObserver.observe(mainDone,{
    childList: true
})