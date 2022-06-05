function createCourse() {
  const courseForm = document.getElementById("addCourseForm");
  courseForm.style.visibility = "visible";
}

const addCourseForm = document.getElementById("addCourseForm");

const courseNameInput = document.querySelector(".courseNamaInput")
const courseCodeInput = document.querySelector(".courseCodeInput")
const courseDesInput = document.querySelector(".courseDesInput")

const courseContainer = document.getElementById("courseContainer")

//array storing the courses
let courses = [];

class Course {
  constructor(name, code, description) {
    this.name = name;
    this.code = code;
    this.description = description;

    this.assessments = [];
    this.links = [];
  }
}

class Assessment {
  constructor(name, description, timeToComplete, course, priority, dueDate, completion) {
    this.name = name;
    this.description = description;
    this.timeToComplete = timeToComplete;
    this.course = course;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completion = completion;

    this.taskTodo = [];
    this.taskInprogress = [];
    this.taskDone = [];
  }
}

class task {
  constructor(name) {
    this.nama = name;
    this.completion = 0;
  }
}

addCourseForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addCourse(courseNameInput, courseCodeInput, courseDesInput);
})

function addCourse(courseNameInput, courseCodeInput, courseDesInput) {
  if (courseNameInput !== "" && courseCodeInput !== "" && courseDesInput !== "") {
    //create object
    const course = new Course(courseNameInput, courseCodeInput, courseDesInput);
    //push
    courses.push(course);
    //store
    addCoursesToLocalStorage(courses);
    //clear
    courseNameInput.value = "";
    courseCodeInput.value = "";
    courseDesInput.value = "";
  } 
}

function addCoursesToLocalStorage(courses) {
  localStorage.setItem("courses", JSON.stringify(courses));
  renderCourse(courses);
}

function getCourseFromLocalStorage() {
  const reference = localStorage.getItem("courses");
  if (reference) {
    renderCourse(JSON.parse(reference));
  }
}

function renderCourse(courses) {
  courseContainer.innerHTML = "";

  courses.forEach(function(course) {


  })


}



// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todoTasks"
const todoTasks = document.querySelector('.todoTasks');

// array which stores every todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item,
      completion: "toDo"
    };

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = '';
  }
}


// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todoTasks
  todoTasks.innerHTML = '';

  // run through each item inside todos
  todos.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      ${item.name}
      <button class="delete-button">✕</button>
    `;
    // finally add the <li> to the <ul>
    todoTasks.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoTasks.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

