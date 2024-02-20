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

const taskData = [];
let currentTask = {};
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value || imageInput.value;

  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
    image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
  };

   if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }

 taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="blog" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn">Edit</button>
          <button type="button" class="btn">Delete</button>
        </div>
      `)
    }
  );

  reset()
});