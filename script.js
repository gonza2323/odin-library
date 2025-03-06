"use strict"


const library = [];


function Book(title, author, noPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.isRead = read;
}


function addBook(title, author, noPages, read) {
    const book = new Book(title, author, noPages, read);
    library.push(book);
    return book;
}


function deleteBook(id) {
    const index = library.findIndex( book => book.id === id);

    if (index !== -1) {
        library.splice(index, 1);
    }
}

function updateBookRead(id, read) {
    const book = library.find(book => book.id === id);
    if (book)
        book.read = read;
}


// UI Logic

function displayBooks() {
    const booksContainer = document.querySelector(".books");
    const oldBooks = booksContainer.querySelectorAll(".book");
    
    oldBooks.forEach(e => e.remove());
    
    for (const book of library) {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    }
}


function createBookCard(book) {
    const template = document.querySelector(".template");
    const card = template.cloneNode(true);

    const title = card.querySelector(".title");
    const author = card.querySelector(".author");
    const pages = card.querySelector(".pages");
    const readText = card.querySelector(".read-status");
    const readCheck = card.querySelector(".read-checkbox");

    card.setAttribute("uuid", book.id);
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = "Pages: " + book.noPages;
    readText.textContent = book.isRead ? "Read" : "Unread";
    readCheck.checked = book.isRead;

    card.classList.remove("template");
    card.removeAttribute("hidden");

    const deleteButton = card.querySelector(".delete");
    deleteButton.addEventListener("click", () => deleteCard(book.id));
    
    const readButton = card.querySelector(".read");
    readButton.addEventListener("input",
        () => changeReadStatus(book.id, readText, readCheck));

    return card;
}


function addBookCard(event) {
    const form = event.target;
    
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const noPages = form.elements["noPages"].value;
    
    const book = addBook(title, author, noPages, false);
    const card = createBookCard(book);
    const booksContainer = document.querySelector(".books");
    const firstBook = booksContainer.querySelector(".book");

    booksContainer.insertBefore(card, firstBook);    
    form.reset();
}


function deleteCard(id) {
    deleteBook(id);
    const card = document.querySelector(`.book[uuid="${id}"]`);
    if (card) {
        card.remove();
    }
}


function changeReadStatus(id, readText, checkbox) {
    updateBookRead(id, checkbox.checked);
    readText.textContent = checkbox.checked ? "Read" : "Unread";
}


const addBookButton = document.querySelector(".card.add");
const addBookDialog = document.querySelector(".add-dialog");


addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});


addBookDialog.addEventListener("submit", addBookCard);


// test

addBook("1984", "George Orwell", "400", false);
addBook("The Hobbit", "J.R.R Tolkien", "800", true);
addBook("The Time Machine", "H.G. Wells", "500", true);
addBook("Dune", "Frank Herbert", "800", false);

displayBooks();
