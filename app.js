const form = document.querySelector("#note-form");
const notesList = document.querySelector(".collection");
const removeBtn = document.querySelector(".clear-notes");
const filter = document.querySelector("#filter");
const noteInput = document.querySelector("#note");
let Notes = [];

form.addEventListener("submit", addNote);
notesList.addEventListener("click", removeNote);
removeBtn.addEventListener("click", removeAllNotes);
filter.addEventListener("keyup", filterTasks);

// Add Note on Enter keyPress
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    addNote();
  }
});

// Prevent TextArea next line
noteInput.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
  }
});

document.body.onload = function () {
  if (localStorage.getItem("notes") != null) {
    console.log("--------------- Notes Found! -------------");

    Notes = JSON.parse(localStorage.getItem("notes"));

    Notes.forEach((note) => {
      console.log(note);
      const li = document.createElement("li");
      li.className = "collection-item grey darken-2 white-text";
      li.setAttribute("value", note);
      li.appendChild(document.createTextNode(note));
      li.classList.add("li-style");

      // Create <a>
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = `<i class='fa fa-remove'></i>`;

      li.appendChild(link);

      // Add <li> to <ul>
      notesList.appendChild(li);
    });
  } else {
    console.log("------------ No Notes Found! ------------");
  }
};

function addNote(e) {
  if (noteInput.value != "") {
    console.log(noteInput.vale);

    Notes.push(noteInput.value);

    localStorage.setItem("notes", JSON.stringify(Notes));

    const li = document.createElement("li");
    li.className = "collection-item grey darken-2 white-text";
    li.setAttribute("value", noteInput.value);
    li.appendChild(document.createTextNode(noteInput.value));
    li.classList.add("li-style");

    // Create <a>
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class='fa fa-remove'></i>`;

    li.appendChild(link);

    // Add <li> to <ul>
    notesList.appendChild(li);

    noteInput.value = "";
  } else {
    alert("Note Should Not Be Empty!");
  }
}

function removeNote(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    const confirmOne = confirm("Are You Sure?");

    if (confirmOne) {
      e.target.parentElement.parentElement.remove();

      Notes = JSON.parse(localStorage.getItem("notes"));
      const delNote = e.target.parentElement.parentElement.getAttribute(
        "value"
      );

      Notes.splice(Notes.indexOf(delNote), 1);
      localStorage.setItem("notes", JSON.stringify(Notes));
    }
  }
}

function removeAllNotes(e) {
  if (e.target.classList.contains("clear-notes")) {
    const confirmAll = confirm("Are You Sure?");
    if (confirmAll) {
      while (notesList.firstChild) {
        notesList.firstChild.remove();
        localStorage.removeItem("notes");
      }
    }
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  notesList.querySelectorAll(".collection-item").forEach(function (note) {
    const item = note.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}
