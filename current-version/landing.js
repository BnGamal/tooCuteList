const allLandingPageTasks = document.querySelectorAll('.carousel div');
for (const task of allLandingPageTasks) {
	task.addEventListener('click', function() {
		const targetedTasksName = `.${this.classList.item(1)}`;
		const targetedTasksElements = document.querySelectorAll(targetedTasksName);
		for (const task of targetedTasksElements) {
			task.classList.toggle('fat-button-not-bg-clicked');
		}
	})
};