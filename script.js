"use strict"


const library = [];


function Book(title, author, noPages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.isRead = false;
}


function addBook(title, author, noPages) {
    const book = new Book(title, author, noPages);
    library.push(book);
}


function deleteBook(id) {
    const index = library.findIndex( book => book.id === id);

    if (index !== -1) {
        library.splice(index, 1);
    }
}


// UI Logic

function updateView() {
    const bookContainer = document.querySelector(".books");
    const cards = []

    for (const book of library) {
        const bookCard = createBookCard(book);
        cards.push(bookCard);
    }

    bookContainer.replaceChildren(...cards);
}


function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    for (const prop in book) {
        if (prop == "id") {
            continue
        }

        const propName = document.createElement("div");
        const propValue = document.createElement("div");
        
        propName.classList.add("attrbName");
        propValue.classList.add("attrbValue");

        propName.textContent = prop;
        propValue.textContent = book[prop];
        
        const pair = document.createElement("div");
        pair.classList.add("pair");
        pair.appendChild(propName);
        pair.appendChild(propValue);

        card.appendChild(pair);
    }

    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    readButton.classList.add("read");
    deleteButton.classList.add("delete");

    readButton.textContent = "Read";
    deleteButton.textContent = "Delete";

    card.appendChild(readButton);
    card.appendChild(deleteButton);

    return card;
}


function deleteButtonHandler() {

}

// test

addBook("1984", "George Orwell", "400");
addBook("The Hobbit", "Tolkien", "800");
addBook("Dune", "Idk", "500");

