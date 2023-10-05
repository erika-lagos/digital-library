const myLibrary = [
    {
        title: 'The Steppenwolf',
        author: 'Herman Hesse',
        numPages: 224,
        isRead: true,
    },
    {
        title: 'The Baron in the Trees',
        author: 'Italo Calvino',
        numPages: 319,
        isRead: true,
    },
    {
        title: "If on a Winter's Night a Traveler",
        author: 'Italo Calvino',
        numPages: 275,
        isRead: true,
    },
    {
        title: 'The Restaurant at the End of the World',
        author: 'Douglas Adams',
        numPages: 255,
        isRead: true,
    },
    {
        title: 'Life, the Universe and Everything',
        author: 'Douglas Adams',
        numPages: 242,
        isRead: true,
    },
    {
        title: "Ender's Game",
        author: 'Orson Scott Card',
        numPages: 374,
        isRead: true,
    },
    {
        title: "Life is Elsewhere",
        author: 'Milan Kundera',
        numPages: 429,
        isRead: true,
    },
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

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function() {
        const message = `${this.title} by ${this.author}, ${numPages} pages, ${isRead ? 'read' : 'not read yet'}`;
        return message;
    }
}

function addBookToLibrary() {
    const newTitle = newTitleInput.value;
    const newAuthor = newAuthorInput.value;
    const newPages = +newPagesInput.value;
    const newRead = newReadInput.value;
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);
    addBookCard(newBook);
}

function addBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
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
    const dashedTitle = 
        `images/${book.title.toLowerCase().replaceAll(' ','-')}`;
    cover.setAttribute('src', dashedTitle);
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
    checkbox.setAttribute('id', dashedTitle);
    checkbox.checked = book.isRead;
    const label = document.createElement('label');
    label.setAttribute('for', dashedTitle);
    label.textContent = 'Read';
    readContainer.appendChild(checkbox);
    readContainer.appendChild(label);
    const delButton = document.createElement('button');
    delButton.classList.add('delete');
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

function clearModal() {
    newTitleInput.value = '';
    newAuthorInput.value = '';
    newPagesInput.value = '';
    newReadInput.checked = false;
    newBookModal.close();
}

function init() {
    myLibrary.forEach(book => {
        addBookCard(book);
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


