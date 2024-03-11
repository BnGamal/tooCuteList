






// global variables
let storedTasks = JSON.parse(localStorage.getItem('storedTasks')) ?? [];
let currentIndex;
let updating = false;

function displayAllTasks() {
	tasksContainer.innerHTML = '';
	const storedTasksLength = storedTasks.length;
	for (let i = 0; i < storedTasksLength; i++) {
		const taskId = i;
		const currentTask = storedTasks[i];
		const title = currentTask["title"];
		const paragraph = currentTask["paragraph"];
		const done = currentTask["done"];
		const task = createTask(taskId, title, paragraph, done);
		appendTask(task);
	}
}

function createTask(id, title, paragraph, done) {
	// task boilerplate
	const task = document.createElement('div');
	task.setAttribute('id', `task${id}`);
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
		currentIndex = parseInt(((event.target.closest('.task')).getAttribute('id')).slice(4));
		let task = event.target.closest('.task');

	    if (event.target.closest('.delete-task')) {
	        deleteTask(currentIndex);
	        rewriteStoredTasks();
	        displayAllTasks();
	    } else if (event.target.closest('.edit-task')) {
	    	showTaskPrompt(task);
	    } else if (event.target.closest('.task-text')) {
	    	toggleDone(currentIndex, task);
	    	rewriteStoredTasks();
	    }
	});
	return task;
}

function toggleDone(index, task) {
	storedTasks[index]["done"] = !(storedTasks[index]["done"]);

	task.classList.toggle('fat-button-clicked');
	const allFatButtons = task.querySelectorAll('.fat-button');
	for (const fatButton of allFatButtons) {
		fatButton.classList.toggle('fat-button-clicked-no-transform');
	}
}

const tasksContainer = document.querySelector('.tasks-container');

function appendTask(task) {
	tasksContainer.appendChild(task);
}

const createTaskBtn = document.querySelector('.create-task');
createTaskBtn.addEventListener('click', function() {
	showTaskPrompt();
});
const taskPrompt = document.querySelector('.task-prompt');
const taskTitle = document.querySelector('.title-input')
const taskParagraph = document.querySelector('.paragraph-input')
const confirmPrompt = document.querySelector('.confirm-prompt');
const cancelPrompt = document.querySelector('.cancel-prompt');
confirmPrompt.addEventListener('click', function() {
	const title = taskTitle.value;
	const paragraph = taskParagraph.value;
	if (updating) {
		// console.log('updating', updating, currentIndex, title, paragraph);
		storeTask(currentIndex, title, paragraph);
		hideTaskPrompt();
	} else if (!updating) {
		// console.log('making new task', updating, title, paragraph);
		storeTask(false, title, paragraph);
		hideTaskPrompt();
	}
	rewriteStoredTasks();
	displayAllTasks();
});
cancelPrompt.addEventListener('click', hideTaskPrompt);

function showTaskPrompt(task) {
	taskPrompt.style.display = 'block';
	if (task === undefined) {
		updating = false;
		taskTitle.value = '';
		taskParagraph.value = '';
	} else {
		updating = true;
		taskTitle.value = task.querySelector('h1').innerText;
		taskParagraph.value = task.querySelector('p').innerText;
	}
}

function storeTask(index, title, paragraph) {
	console.log(index, title, paragraph);
	if (index !== false) {
		const task = storedTasks[index];
		task["title"] = title;
		task["paragraph"] = paragraph;
	} else {
		const newTask = {
			"title": title,
			"paragraph": paragraph,
			"done": false
		};
		storedTasks.push(newTask);
	}
}

function rewriteStoredTasks() {
	localStorage.clear();
	localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
}

function hideTaskPrompt() {
	taskPrompt.style.display = 'none';
}

function deleteTask(index) {
	storedTasks.splice(index, 1);	
}

displayAllTasks();