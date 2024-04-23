const mainMenuBtn = document.getElementById('main-menu-btn');
const mainMenuBtnText = document.querySelector('#main-menu-btn .text');
const mainMenuBtnIcon =document.querySelector('#main-menu-btn i');
const mainMenu = document.getElementById('main-menu');
let mainMenuBtnTextLabels = ['close', 'menu'];
let mainMenuBtnIconLabels = ['fa-solid',  'fa-xmark','fa-solid', 'fa-bars'];
mainMenuBtn.addEventListener('click', () => {
	showMainMenu();
});
function showMainMenu() {
	mainMenu.classList.toggle('show-item--flex');
	mainMenuBtnText.innerText = mainMenuBtnTextLabels[0];
	mainMenuBtnIcon.classList = [];
	mainMenuBtnIcon.classList.add(mainMenuBtnIconLabels[0], mainMenuBtnIconLabels[1]);
	mainMenuBtnTextLabels.reverse();
	mainMenuBtnIconLabels.reverse();
};