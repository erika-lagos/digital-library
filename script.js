class Book {

    constructor(title, author, numPages, isRead, bookId) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
        this.bookId = bookId;
    }

    info() {
        const message = `${this.title} by ${this.author}, ${numPages} pages, ${isRead ? 'read' : 'not read yet'}`;
        return message;
    }
}

const myLibrary = [
    new Book('The Steppenwolf', 'Herman Hesse', 224, true, 0),
    new Book('The Baron in the Trees', 'Italo Calvino', 319, true, 1),
    new Book("If on a Winter's Night a Traveler", 'Italo Calvino', 275, true, 2),
    new Book('The Restaurant at the End of the World', 'Douglas Adams', 255, true, 3),
    new Book('Life, the Universe and Everything', 'Douglas Adams', 242, true, 4),
    new Book("Ender's Game", 'Orson Scott Card', 374, true, 5),
    new Book("Life is Elsewhere", 'Milan Kundera', 429, true, 6)
];

let lastBookId = myLibrary.length + 1;

const mainContainer = document.querySelector('.main');
const newBookButton = document.querySelector('.new');
const newBookModal = document.querySelector('.new-book-modal');
const confirmButton = document.querySelector('.confirm');
const cancelButton = document.querySelector('.cancel');
const newTitleInput = document.querySelector('#new-title');
const newAuthorInput = document.querySelector('#new-author');
const newPagesInput = document.querySelector('#new-pages');
const newPagesContainer = document.querySelector('.new-pages');
const newReadInput = document.querySelector('#new-read');



function addBookToLibrary() {
    const newTitle = newTitleInput.value;
    const newAuthor = newAuthorInput.value;
    const newPages = +newPagesInput.value;
    const newRead = newReadInput.value;
    const newBook = new Book(newTitle, newAuthor, newPages, newRead, lastBookId++);
    myLibrary.push(newBook);
    addBookCard(newBook);
}

function addBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.bookId = book.bookId;
    
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');  
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;
    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;
    const cover = document.createElement('img');
    cover.classList.add('book-cover');
    cover.setAttribute('src', `images/cover-${book.bookId}.jpg`);
    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = `${book.numPages} Pages`;
    bookDetails.appendChild(title);
    bookDetails.appendChild(author);
    bookDetails.appendChild(cover);
    bookDetails.appendChild(pages);

    const bookButtons = document.createElement('div');
    bookButtons.classList.add('book-buttons');
    
    const readContainer = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'read');
    checkbox.setAttribute('id', `read-${book.bookId}`);
    checkbox.checked = book.isRead;
    const label = document.createElement('label');
    label.setAttribute('for', `read-${book.bookId}`);
    label.textContent = 'Read';
    readContainer.appendChild(checkbox);
    readContainer.appendChild(label);
    const delButton = document.createElement('button');
    delButton.classList.add('delete');
    delButton.dataset.bookId = book.bookId;
    delButton.addEventListener('click', deleteBook);
    const delIcon = document.createElement('img');
    delIcon.classList.add('icon');
    delIcon.setAttribute('src', 'images/delete.svg');
    delButton.appendChild(delIcon);

    bookButtons.appendChild(readContainer);
    bookButtons.appendChild(delButton);

    bookCard.appendChild(bookDetails);
    bookCard.appendChild(bookButtons);

    mainContainer.appendChild(bookCard);
}

function deleteBook(evt) {
    const bookCard = evt.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    const bookIndex = myLibrary.findIndex(book => book.bookId === bookId);
    myLibrary.splice(bookIndex,1);
    mainContainer.removeChild(bookCard);
}

function clearModal() {
    newTitleInput.value = '';
    newAuthorInput.value = '';
    newPagesInput.value = '';
    newReadInput.checked = false;
    newBookModal.close();
}

function init() {
    myLibrary.forEach((book, i) => {
        addBookCard(book, i);
    });
}

newBookButton.addEventListener('click', e => {
    newBookModal.showModal();
});

newPagesInput.addEventListener('input', e => {
    if (Number.isInteger(+newPagesInput.value)) {
        newPagesContainer.classList.remove('error');
    } else {
        newPagesContainer.classList.add('error');
    }
});

confirmButton.addEventListener('click', e => {
    e.preventDefault();
    addBookToLibrary();
    clearModal();
});

cancelButton.addEventListener('click', e => {
    e.preventDefault();
    clearModal();
});

init();


