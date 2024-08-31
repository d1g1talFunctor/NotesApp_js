const noteEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');

let notesAdded = Number(localStorage.getItem('notesAdded')) || 0;

function createNote(title, text, noteNumber) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.innerHTML = `
        <div class="note-header">
          <p class="note-number">Note ${noteNumber}</p>
            <p id="note-title">${title}</p>
            <textarea id="note-title-input" class="hidden" maxlength="10">${title}</textarea>
            <div>
                <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          
        </div>
        <p id="note-text">${text}</p>
        <textarea id="note-textarea" class="hidden" maxlength="30">${text}</textarea>
    `;

    const editBtn  = noteEl.querySelector('.note-edit');
    const deleteBtn  = noteEl.querySelector('.note-delete');
    const titleEl  = noteEl.querySelector('#note-title');
    const textEl  = noteEl.querySelector('#note-text');
    const titleInputEl = noteEl.querySelector('#note-title-input');
    const textInputEl = noteEl.querySelector('#note-textarea');

    editBtn.addEventListener('click', (e) => {
        titleEl.classList.toggle('hidden');
        textEl.classList.toggle('hidden');

        titleInputEl.classList.toggle('hidden');
        textInputEl.classList.toggle('hidden');
    }); 

    deleteBtn.addEventListener('click', (e) => {
        noteEl.remove();
        notesAdded--; 
        saveNotes();
        updateCounters();
    });

    titleInputEl.addEventListener('input', (e) => {
       titleEl.innerHTML = e.target.value;
       saveNotes();
    });

    textInputEl.addEventListener('input', (e) => {
        textEl.innerHTML = e.target.value;
        saveNotes();
     });

    return noteEl;
}

function saveNotes() {
    const notes = document.querySelectorAll('.note');
    const notesData = Array.from(notes).map(note => {
        const title = note.querySelector('#note-title').textContent;
        const text = note.querySelector('#note-text').textContent;
        
        return {title, text};
    });
    localStorage.setItem('notes', JSON.stringify(notesData));
    localStorage.setItem('notesAdded', notesAdded); 
}

function loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        const notesData = JSON.parse(storedNotes);
        notesData.forEach((note, index) => {
            const el = createNote(note.title, note.text, index + 1);
            noteEl.appendChild(el);
        });
        notesAdded = notesData.length; 
    }
}

function updateCounters() {
    const countersEl = document.querySelector('.counters');
    if (!countersEl) {
        const countersEl = document.createElement('div');
        countersEl.classList.add('counters');
        document.body.appendChild(countersEl);
    }
 
}

document.addEventListener('DOMContentLoaded', loadNotes);

addBtn.addEventListener('click', (e) => {
    const el = createNote("Заголовок", "Ваш текст", notesAdded + 1);
    noteEl.appendChild(el);
    notesAdded++;
    saveNotes();
    updateCounters();
});
