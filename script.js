class Book {

    static lastBookId = 0;

    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
        this.bookId = Book.lastBookId++;
    }

    info() {
        const message = `${this.title} by ${this.author}, ${numPages} pages, ${isRead ? 'read' : 'not read yet'}`;
        return message;
    }
}

const myLibrary = [
    new Book('The Steppenwolf', 'Herman Hesse', 224, true),
    new Book('The Baron in the Trees', 'Italo Calvino', 319, true),
    new Book("If on a Winter's Night a Traveler", 'Italo Calvino', 275, true),
    new Book('The Restaurant at the End of the World', 'Douglas Adams', 255, true),
    new Book('Life, the Universe and Everything', 'Douglas Adams', 242, true),
    new Book("Ender's Game", 'Orson Scott Card', 374, true),
    new Book("Life is Elsewhere", 'Milan Kundera', 429, true)
];

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
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);
    renderBook(newBook);
}

function renderBook(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.bookId = book.bookId;
    const bookDetails = renderBookDetails(book);
    bookCard.appendChild(bookDetails);
    const bookButtons = renderBookButtons(book);
    bookCard.appendChild(bookButtons);
    mainContainer.appendChild(bookCard);
}

function renderBookDetails(book) {
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
    return bookDetails;
}

function renderBookButtons(book) {
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

    return bookButtons;
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
        renderBook(book, i);
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


