// elements
const createTaskBtn = document.querySelector('.create-task');
const tasksContainer = document.querySelector('.tasks-container');
const smallClock = document.getElementById('small-clock');

const taskPrompt = document.querySelector('.task-prompt');
const taskTitle = document.querySelector('.title-input')
const taskParagraph = document.querySelector('.paragraph-input')
const confirmPrompt = document.querySelector('.confirm-prompt');
const cancelPrompt = document.querySelector('.cancel-prompt');
// global variables
let storedTasks = JSON.parse(localStorage.getItem('storedTasks')) ?? [];
let currentIndex;
let updating = false;
// event listeners
const hideClockOption = document.getElementById('hide-clock-option');
let hideClockOptionLabels = ["show clock", "hide clock"];
hideClockOption.addEventListener('click', () => {
	smallClock.classList.toggle('hide-element');
	hideClockOption.innerText = hideClockOptionLabels[0];
	hideClockOptionLabels.reverse();
});
createTaskBtn.addEventListener('click', function() {
	showTaskPrompt();
});
confirmPrompt.addEventListener('click', () => {
	const title = taskTitle.value;
	const paragraph = taskParagraph.value;
	if (updating) {
		storeTask(currentIndex, title, paragraph);
	} else if (!updating) {
		const currentDate = getDateAndTime('task');
		storeTask(false, title, paragraph, currentDate);
	}
	hideTaskPrompt();
	rewriteStoredTasks();
	displayAllTasks();
});
cancelPrompt.addEventListener('click', () => {
	hideTaskPrompt()
});
// functions
function displayAllTasks() {
	tasksContainer.innerHTML = '';
	const storedTasksLength = storedTasks.length;
	for (let i = 0; i < storedTasksLength; i++) {
		const taskId = i;
		const currentTask = storedTasks[i];
		const title = currentTask["title"];
		const paragraph = currentTask["paragraph"];
		const done = currentTask["done"];
		const date = currentTask["date"];
		const task = createTask(taskId, title, paragraph, date, done);
		appendTask(task);
	}
}
function createTask(id, title, paragraph, date, done) {
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

	const taskDate = document.createElement('span');
	taskDate.innerText = date;
	taskDate.classList.add('task-date');

	task.appendChild(taskText);
	task.appendChild(taskBtns);
	task.appendChild(taskDate);

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
function appendTask(task) {
	tasksContainer.appendChild(task);
}
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
	taskTitle.focus();
}
function storeTask(index, title, paragraph, date) {
	if (index !== false) {
		const task = storedTasks[index];
		task["title"] = title;
		task["paragraph"] = paragraph;
	} else {
		const newTask = {
			"title": title,
			"paragraph": paragraph,
			"done": false,
			"date": date,
		};
		storedTasks.unshift(newTask);
	}
}
function rewriteStoredTasks() {
	localStorage.clear();
	localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
}
function hideTaskPrompt() {
	taskPrompt.style.display = 'none';
}
function toggleDone(index, task) {
	storedTasks[index]["done"] = !(storedTasks[index]["done"]);
	task.classList.toggle('fat-button-clicked');
	const allFatButtons = task.querySelectorAll('.fat-button');
	for (const fatButton of allFatButtons) {
		fatButton.classList.toggle('fat-button-clicked-no-transform');
	}
	const taskDate = task.querySelector('.task-date');
	taskDate.classList.toggle('task-date-clicked');
}
function deleteTask(index) {
	storedTasks.splice(index, 1);	
}
function getDateAndTime(taskOrClock) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (taskOrClock === 'task') {
        return `${day}/${month}/${year}, at ${hours}:${minutes}`;
    } else if (taskOrClock === 'clock') {
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        const amPm = hours >= 12 ? 'PM' : 'AM';
        return `${weekday} ${hour12}:${minutes} ${amPm}, ${month} ${day}, ${year}`;
    }
}
function initializeClock() {
	updateClock();
    const seconds = new Date().getSeconds();
    const tillNextMinute = 60000 - (seconds * 1000);
    setTimeout(function () {
		updateClock();
		setInterval(function() {
			updateClock();
		}, 60000)
    }, tillNextMinute);
}
function updateClock() {
    const currentDate = getDateAndTime('clock');
	smallClock.innerText = currentDate;
}
// run at first
displayAllTasks();
initializeClock();
