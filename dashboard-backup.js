








// global variables
let storedTasks = {}
let totalTasksNumber = 0;
let lastCreatedTask;
let updating = false;

const tasksContainer = document.querySelector('.tasks-container');

function restoreStoredTasks() {
	const retrievedTasks = JSON.parse(localStorage.getItem('storedTasks'));
	for (const key of Object.keys(retrievedTasks)) {
		totalTasksNumber++;
		const taskId = totalTasksNumber;
		const title = retrievedTasks[key]["title"];
		const paragraph = retrievedTasks[key]["paragraph"];
		const done = retrievedTasks[key]["done"];
		storedTasks[taskId] = {};
		storedTasks[taskId]["title"] = title;
		storedTasks[taskId]["paragraph"] = paragraph;
		storedTasks[taskId]["done"] = done;
		recreateTask(taskId, title, paragraph, done);
	}
}

function recreateTask(id, title, paragraph, done) {
	// task boilerplate
	const task = document.createElement('div');
	task.setAttribute('id', id);
	task.classList.add('fat-button', 'task');

	const taskText = document.createElement('div');
	taskText.classList.add('fat-button', 'click--effect','task-text');
	const taskHeader = document.createElement('h1');
	taskHeader.innerText = title;
	const taskParagraph = document.createElement('p');
	taskParagraph.innerText = paragraph;
	taskText.appendChild(taskHeader);
	taskText.appendChild(taskParagraph);

	const taskBtns = document.createElement('div')
	taskBtns.classList.add('task-btns')
	
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('fat-button', 'click--effect', 'delete-task');
	const deleteIcon = document.createElement('i');
	deleteIcon.classList.add('fa-regular', 'fa-trash-can');
	deleteBtn.appendChild(deleteIcon);

	const editBtn = document.createElement('button');
	editBtn.classList.add('fat-button', 'click--effect', 'edit-task');
	const editIcon = document.createElement('i');
	editIcon.classList.add('fa-regular', 'fa-pen-to-square');
	editBtn.appendChild(editIcon);

	taskBtns.appendChild(deleteBtn);
	taskBtns.appendChild(editBtn);

	task.appendChild(taskText);
	task.appendChild(taskBtns);

	//adding effects of clicked tasks
	if (done) {
		let fatButtonClickedNoTransfrom = 'fat-button-clicked-no-transform';
		let fatButtonClicked = 'fat-button-clicked';
		task.classList.add(`${fatButtonClicked}`);
		taskText.classList.add(`${fatButtonClickedNoTransfrom}`);
		deleteBtn.classList.add(`${fatButtonClickedNoTransfrom}`);
		editBtn.classList.add(`${fatButtonClickedNoTransfrom}`);
	}

	// adding functionalities
	task.addEventListener('click', function(event) {
	    if (event.target.closest('.delete-task')) {
	        deleteTask(event.target.closest('.task'));
	    } else if (event.target.closest('.edit-task')) {
	    	showTaskPrompt(event.target.closest('.task'));
	    } else if (event.target.closest('.task-text')) {
	    	doneUndone(event.target.closest('.task'));
	    }
	});

	tasksContainer.appendChild(task);
}

function rewriteStoredTasks() {
	localStorage.clear();
	localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
}

const createTaskBtn = document.querySelector('.create-task');
createTaskBtn.addEventListener('click', createTask);

function createTask() {
	const task = document.createElement('div');
	task.classList.add('fat-button', 'width-transition', 'task');

	const taskText = document.createElement('div');
	taskText.classList.add('fat-button', 'click--effect','task-text');
	const taskHeader = document.createElement('h1');
	taskHeader.innerText = '';
	const taskParagraph = document.createElement('p');
	taskParagraph.innerText = '';
	taskText.appendChild(taskHeader);
	taskText.appendChild(taskParagraph);

	const taskBtns = document.createElement('div')
	taskBtns.classList.add('task-btns')
	
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('fat-button', 'click--effect', 'delete-task');
	const deleteIcon = document.createElement('i');
	deleteIcon.classList.add('fa-regular', 'fa-trash-can');
	deleteBtn.appendChild(deleteIcon);

	const editBtn = document.createElement('button');
	editBtn.classList.add('fat-button', 'click--effect', 'edit-task');
	const editIcon = document.createElement('i');
	editIcon.classList.add('fa-regular', 'fa-pen-to-square');
	editBtn.appendChild(editIcon);

	taskBtns.appendChild(deleteBtn);
	taskBtns.appendChild(editBtn);

	task.appendChild(taskText);
	task.appendChild(taskBtns);

	task.addEventListener('click', function(event) {
	    if (event.target.closest('.delete-task')) {
	        deleteTask(event.target.closest('.task'));
	    } else if (event.target.closest('.edit-task')) {
	    	showTaskPrompt(event.target.closest('.task'));
	    } else if (event.target.closest('.task-text')) {
	    	doneUndone(event.target.closest('.task'));
	    }
	});

	lastCreatedTask = task;

	showTaskPrompt(lastCreatedTask);
}


function doneUndone (task) {
	task.classList.toggle('fat-button-clicked');
	const allFatButtons = task.querySelectorAll('.fat-button');
	for (const fatButton of allFatButtons) {
		fatButton.classList.toggle('fat-button-clicked-no-transform');
	}
	storedTasks[task.getAttribute('id')]["done"] = !(storedTasks[task.getAttribute('id')]["done"]);
	rewriteStoredTasks();
}

const taskPrompt = document.querySelector('.task-prompt');
const taskTitle = document.querySelector('.title-input')
const taskParagraph = document.querySelector('.paragraph-input')
const confirmPrompt = document.querySelector('.confirm-prompt');
const cancelPrompt = document.querySelector('.cancel-prompt')

confirmPrompt.addEventListener('click', function() {
	editTask();
});
cancelPrompt.addEventListener('click', hideTaskPrompt);

function editTask(task=lastCreatedTask) {
	const title = taskTitle.value;
	const paragraph = taskParagraph.value;

	task.querySelector('h1').innerText = title;
	task.querySelector('p').innerText = paragraph;
	hideTaskPrompt();
	if (!updating) {

		totalTasksNumber++;
		task.setAttribute('id', `${totalTasksNumber}`);
		storedTasks[task.getAttribute('id')] = {};
		storedTasks[task.getAttribute('id')]["title"] = title; 
		storedTasks[task.getAttribute('id')]["paragraph"] = paragraph;
		storedTasks[task.getAttribute('id')]["done"] = false;

		rewriteStoredTasks();

		tasksContainer.appendChild(task);
	}

	storedTasks[task.getAttribute('id')]["title"] = title; 
	storedTasks[task.getAttribute('id')]["paragraph"] = paragraph;
	rewriteStoredTasks();

	// emptying the inputs fields
	taskTitle.value = '';
	taskParagraph.value = '';
}

function showTaskPrompt(task) {
	const header = task.querySelector('h1').innerText;
	const paragraph = task.querySelector('p').innerText;

	if (header !== '' && paragraph !== '') {
		updating = true;
		taskTitle.value = header;
		taskParagraph.value = paragraph;
	} else {
		updating = false;
	}

	lastCreatedTask = task;
	taskPrompt.style.display = 'block';
}

function hideTaskPrompt() {
	taskPrompt.style.display = 'none';
	taskTitle.value = '';
	taskParagraph.value = '';
}

function deleteTask(task) {
	tasksContainer.removeChild(task);
	delete storedTasks[task.getAttribute('id')];
	rewriteStoredTasks();
}


restoreStoredTasks()