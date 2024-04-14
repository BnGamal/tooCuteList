### Visit The Website on => *[tooCuteList](https://toocutelist.netlify.app/)*.
## Urgent Problems:
- [x] used dvh on body's height to display the github account
- [x] make the focus on the title of the prompt when it shows up
- [x] the logo goes right when the 'menu' button changes it's text to 'close' since it's somehow shorter
- [x] add the tab title in the head + check missing meta tags
## Problems to Solve:
- [ ] Change the carousel tasks areas, they look awful
- [ ] Made another uneccessary div for the carousel overflow
- [ ] Change the landing tasks' text
- [ ] The padding-top/margin-top of the element under the logo is not dynamic
- [ ] Change `querySelector` with `getElementById`, using multiple html files it's hard to choose specific elements
- [ ] title doesn't perserve it's place when it's empty and the paragraph is not empty
## Want to Add:
- [ ] Cosider the timeline of the task added (prepend vs append)
- [ ] make the 'not functional yet' hover effect follow the cursor
- [ ] Scroll on task to make a flip animation that makes that task marked as "done"
- [ ] Make 'guide tour' on how to use the website
- [ ] Change the logo everytime (a task get's done/deleted/edited) or when the logo is actually clicked
- [ ] Add the date at which every task was created
- [ ] Total number of tasks and % of how many is "done"
- [ ] Add the arabic version
- [ ] Add theme button
- [ ] get back a list of the deleted tasks (in case you want to undo)
- [ ] repeatable tasks
- [ ] remove all tasks button

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
</div>
```

