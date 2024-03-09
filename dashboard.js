








// global variables
let storedTasks = {}
let totalTasksNumber = 0;
let lastCreatedTask;
let updating = false;

const tasksContainer = document.querySelector('.tasks-container');

function restoreStoredTasks() {
	const retrievedTasks = JSON.parse(localStorage.getItem('storedTasks'));
	for (const key of Object.keys(retrievedTasks)) {
		const title = retrievedTasks[key]["title"];
		const paragraph = retrievedTasks[key]["paragraph"];
		const done = retrievedTasks[key]["done"];
		createTask(true, title, paragraph, done);
	}
}

const createTaskBtn = document.querySelector('.create-task');
createTaskBtn.addEventListener('click', function() {
	createTask(false);
});

function createTask(restoring, title, paragraph, done) {
	totalTasksNumber++;
	let taskId = totalTasksNumber;
	console.log('creating task number:', taskId);
	if (restoring) {
		let task = makeTaskBoilerplate(taskId, title, paragraph, done);
		storeTaskData(taskId, title, paragraph, done);
		appendTask(task);
	} else {
		let task = makeTaskBoilerplate(taskId, "", "", false);
		lastCreatedTask = task;
		showTaskPrompt();
	}
}

function makeTaskBoilerplate(id, title, paragraph, done) {
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
		lastCreatedTask = event.target.closest('.task');
	    if (event.target.closest('.delete-task')) {
	        deleteTask(event.target.closest('.task'));
	    } else if (event.target.closest('.edit-task')) {
	    	showTaskPrompt();
	    } else if (event.target.closest('.task-text')) {
	    	doneUndone(event.target.closest('.task'));
	    }
	});

	return task;
}

function storeTaskData(id, title, paragraph, done) {
	console.log('storing data');
	storedTasks[id] = {};
	storedTasks[id]["title"] = title;
	storedTasks[id]["paragraph"] = paragraph;
	if (done !== undefined) {
		storedTasks[id]["done"] = done;
	}
}

function appendTask(task) {
	tasksContainer.appendChild(task);
}

// checking which input values should I use
function showTaskPrompt() {
	const header = lastCreatedTask.querySelector('h1').innerText;
	const paragraph = lastCreatedTask.querySelector('p').innerText;

	if (header !== '' && paragraph !== '') {
		updating = true;
		taskTitle.value = header;
		taskParagraph.value = paragraph;
	} else {
		updating = false;
	}
	// lastCreatedTask = task;
	taskPrompt.style.display = 'block';
}

const taskPrompt = document.querySelector('.task-prompt');
const taskTitle = document.querySelector('.title-input')
const taskParagraph = document.querySelector('.paragraph-input')
const confirmPrompt = document.querySelector('.confirm-prompt');
const cancelPrompt = document.querySelector('.cancel-prompt')

confirmPrompt.addEventListener('click', function() {
	editTask();
});
cancelPrompt.addEventListener('click', function() {
	hideTaskPrompt();
});

function editTask() {
	console.log(storedTasks);

	const taskId = lastCreatedTask.getAttribute('id');
	const title = taskTitle.value;
	const paragraph = taskParagraph.value;

	lastCreatedTask.querySelector('h1').innerText = title;
	lastCreatedTask.querySelector('p').innerText = paragraph;

	if (!updating) {
		storeTaskData(taskId, title, paragraph, false);
		appendTask(lastCreatedTask);
	} else {
		storeTaskData(taskId, title, paragraph)	
	}
	rewriteLocalStorage();

	hideTaskPrompt();
	// emptying the inputs fields
	taskTitle.value = '';
	taskParagraph.value = '';
}

function doneUndone (task) {
	task.classList.toggle('fat-button-clicked');
	const allFatButtons = task.querySelectorAll('.fat-button');
	for (const fatButton of allFatButtons) {
		fatButton.classList.toggle('fat-button-clicked-no-transform');
	}
	storedTasks[task.getAttribute('id')]["done"] = !(storedTasks[task.getAttribute('id')]["done"]);
	rewriteLocalStorage();
}

function hideTaskPrompt() {
	if (updating) {
		totalTasksNumber--;
	}
	taskPrompt.style.display = 'none';
	taskTitle.value = '';
	taskParagraph.value = '';
}

function deleteTask(task) {
	tasksContainer.removeChild(task);
	delete storedTasks[task.getAttribute('id')];
	rewriteLocalStorage();
}

function rewriteLocalStorage() {
	localStorage.clear();
	localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
}

// functions to call when the script gets called
restoreStoredTasks()