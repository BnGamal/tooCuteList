### Visit The Website on => *[tooCuteList](https://toocutelist.netlify.app/)*.
## Urgent Problems:
- [x] used dvh on body's height to display the github account
- [x] make the focus on the title input of the prompt when it shows up
- [x] the logo goes right when the 'menu' button changes it's text to 'close' since it's somehow shorter
- [x] add the tab title in the head + check missing meta tags
## Problems to Solve:
## Want to Add:
- [x] Cosider the timeline of the task added (prepend vs append)
- [x] clocks and date of creating the task
    - [x] add a small clock to the top/left side of tasks container
    - [x] the small clock is always a bit late since it starts changing after a minute from it's creation
    - [x] add "hide the clock option" option
- [x] on small screen sizes make the prompt with bigger
- [ ] Total number of tasks and % of how many is "done"
- [ ] get back a list of the deleted tasks (in case you want to undo)
- [ ] Add theme button
- [ ] Change the logo everytime (a task get's done/deleted/edited) or when the logo is actually clicked
- [ ] add 'no tasks to show' header in the middle of the screen if there are no tasks
- [ ] repeatable tasks
- [ ] multi select to remove tasks
- [ ] draggable items to change the order
- [ ] Make 'guide tour' on how to use the website
- [ ] Add the arabic version
## Boilerplates:
- task
```html
<div class="fat-button trans--effect task example-task">
    <div class="fat-button no-trans--effect click--effect task-text">
        <h1>example task</h1>
        <p>This is the description of the example task</p>
    </div>
    <div class="task-btns">
        <button class="fat-button no-trans-effect click--effect delete-task">
            <i class="fa-regular fa-trash-can"></i>
        </button>
        <button class="fat-button no-trans-effect click--effect edit-task">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>
    </div>
    <span class=task-date>date of creation</span>
</div>
```

