






// global variables
let storedTasks = JSON.parse(localStorage.getItem('storedTasks')) ?? [];
let currentIndex;
let updating = false;

function displayAllTasks() {
	tasksContainer.innerHTML = '';

	for (let i = 0; i < storedTasks.length; i++) {
		const taskId = i;
		const currentTask = storedTasks[i];
		const title = currentTask["title"];
		const paragraph = currentTask["paragraph"];
		const done = currentTask["done"];

		// console.log(taskId, title, paragraph, done);
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
		setTimeout(function() {
			task.classList.add(`${fatButtonClicked}`);
		}, 1);
		taskText.classList.add(`${fatButtonClickedNoTransfrom}`);
		deleteBtn.classList.add(`${fatButtonClickedNoTransfrom}`);
		editBtn.classList.add(`${fatButtonClickedNoTransfrom}`);
	}

	// adding functionalities
	task.addEventListener('click', function(event) {
		currentIndex = parseInt(((event.target.closest('.task')).getAttribute('id')).split("").slice(4));
		// currentIndex = (event.target.closest('.task')).getAttribute('id');
	    if (event.target.closest('.delete-task')) {
	        deleteTask(currentIndex);
	        displayAllTasks();
	    } else if (event.target.closest('.edit-task')) {
	    	showTaskPrompt(event.target.closest('.task'));
	    } else if (event.target.closest('.task-text')) {
	    	toggleDone(currentIndex);
	    	// displayAllTasks()
	    }
	});

	return task;
}

function toggleDone(index) {
	storedTasks[index]["done"] = !(storedTasks[index]["done"]);
	// console.log(taskContainer)
	const task = tasksContainer.querySelector(`#task${index}`);
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
	if (updating) {
		// console.log('updating', currentIndex, taskTitle.value, taskParagraph.value);
		storeTask(currentIndex, taskTitle.value, taskParagraph.value);
		hideTaskPrompt();
	} else {
		// console.log('making new task', taskTitle.value, taskParagraph.value);
		storeTask(false, taskTitle.value, taskParagraph.value);
		hideTaskPrompt();
	}
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
	// console.log('actualy updating:', storedTasks[index]);
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
	// console.log(storedTasks);
}

// function rewriteStoredTasks() {
// 	localStorage.clear();
// 	localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
// }

function hideTaskPrompt() {
	taskPrompt.style.display = 'none';
}

function deleteTask(index) {
	storedTasks.splice(index, 1);	
}

displayAllTasks();