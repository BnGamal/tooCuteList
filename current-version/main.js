



const mainMenuBtn = document.getElementById('main-menu-btn');
const mainMenuBtnText = document.querySelector('#main-menu-btn .text');
const mainMenuBtnIcon =document.querySelector('#main-menu-btn i')
const mainMenu = document.getElementById('main-menu');
mainMenuBtn.addEventListener('click', () => {
	showMainMenu();
})

let mainMenuBtnTextChoices = ['close', 'menu'];
let mainMenuBtnIconChoices = ['fa-solid',  'fa-xmark','fa-solid', 'fa-bars'];
function showMainMenu() {
	mainMenu.classList.toggle('show-item--flex');
	mainMenuBtnText.innerText = mainMenuBtnTextChoices[0];
	mainMenuBtnIcon.classList = [];
	mainMenuBtnIcon.classList.add(mainMenuBtnIconChoices[0], mainMenuBtnIconChoices[1]);
	mainMenuBtnTextChoices.reverse();
	mainMenuBtnIconChoices.reverse();
}