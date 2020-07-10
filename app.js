const form = document.querySelector("#note-form");
const notesList = document.querySelector(".collection");
const removeBtn = document.querySelector(".clear-notes");
const filter = document.querySelector("#filter");
const noteInput = document.querySelector("#note");
let Notes = [];

form.addEventListener("submit", addNote);
notesList.addEventListener("click", removeNote);
removeBtn.addEventListener("click", removeAllNotes);

document.body.onload = function () {
  if (localStorage.getItem("notes") != "") {
    console.log("--------------- Notes Found! -------------");

    Notes = JSON.parse(localStorage.getItem("notes"));

    Notes.forEach((note) => {
      console.log(note);
      const li = document.createElement("li");
      li.className = "collection-item grey darken-2 white-text";
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
    console.log("-------------- No Notes Found! ------------");
  }
};

function addNote(e) {
  console.log("Clicked");

  if (noteInput.value != "") {
    Notes.push(noteInput.value);
    localStorage.setItem("notes", JSON.stringify(Notes));

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
  } else {
    alert("Note Should Not Be Empty!");
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
