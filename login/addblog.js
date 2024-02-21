const taskForm = document.getElementById("blog-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-blog-form-btn");
const closeTaskFormBtn = document.getElementById("close-blog-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-blog-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("blogs-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const imageInput = document.getElementById("image-input");

let taskData = [];
let currentTask = {};

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
  taskForm.classList.add("hidden");
  currentTask = {};
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
      <div class="blog" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="edit-btn" data-id="${id}">Edit</button>
        <button type="button" class="delete-btn" data-id="${id}">Delete</button>
      </div>
    `;
  });
};

const editTask = (id) => {
  const taskToEdit = taskData.find((task) => task.id === id);
  if (taskToEdit) {
    titleInput.value = taskToEdit.title;
    dateInput.value = taskToEdit.date;
    descriptionInput.value = taskToEdit.description;
    currentTask = taskToEdit;
    taskForm.classList.remove("hidden");
  }
};

const deleteTask = (id) => {
  taskData = taskData.filter((task) => task.id !== id);
  renderTasks();
};

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value || imageInput.value;

  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const taskId = e.target.getAttribute("data-id");
    editTask(taskId);
  } else if (e.target.classList.contains("delete-btn")) {
    const taskId = e.target.getAttribute("data-id");
    deleteTask(taskId);
  }
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: currentTask.id || `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
    image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  renderTasks();
  reset();
});

renderTasks();
