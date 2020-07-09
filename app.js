// UI Variables
const form = document.querySelector("#note-form");
const notesList = document.querySelector(".collection");
const removeBtn = document.querySelector(".clear-notes");
const filter = document.querySelector("#filter");
const noteInput = document.querySelector("#note");

// eventListener Loader
loadListeners();

function loadListeners() {
  // Add Note
  form.addEventListener("submit", addNote);

  // Remove Note
  notesList.addEventListener("click", removeNote);

  // Clear All Notes
  removeBtn.addEventListener("click", removeAllNotes);
}

// Events
function addNote(e) {
  if (noteInput.value === "") {
    alert("Note cannot be empty!");
  } else {
    // Create <li>
    const li = document.createElement("li");
    li.className = "collection-item grey darken-2 white-text";
    li.appendChild(document.createTextNode(noteInput.value));
    li.classList.add("li-style");

    // Create <a>
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class='fa fa-remove'></i>`;

    li.appendChild(link);

    // Add <li> to <ul>
    notesList.appendChild(li);

    // Clear input
    noteInput.value = "";
  }

  e.preventDefault();
}

function removeNote(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    confirm("Are You Sure?");
    e.target.parentElement.parentElement.remove();
  }
}

function removeAllNotes(e) {
  confirm("Are You Sure?");
  while (notesList.firstChild) {
    notesList.firstChild.remove();
  }
}
