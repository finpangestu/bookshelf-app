const ID_LIST_BEFORE = "uncompleteBookshelfList";
const ID_LIST_AFTER = "completeBookshelfList";
const ID_BOOK = "idBook";

function makeListOfBook(titleX, authorX, yearX, isComplete) {
    const titleBook = document.createElement("h2");
    const title = document.createElement("span");
    title.classList.add("title-book");
    title.innerText = titleX;
    titleBook.append(title);

    const authorBook = document.createElement("p");
    authorBook.innerText = "Penulis : ";
    const author = document.createElement("span");
    author.classList.add("author-book");
    author.innerText = authorX;
    authorBook.append(author);

    const yearBook = document.createElement("p");
    yearBook.innerText = "Tahun : ";
    const year = document.createElement("span");
    year.classList.add("year-book");
    year.innerText = yearX;
    yearBook.append(year);

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("info");
    bookInfo.append(titleBook, authorBook, yearBook);
    const bookAction = document.createElement("div");
    bookAction.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book-item");
    container.append(bookInfo, bookAction);
    if(isComplete){
        bookAction.append(
            makeButton("edit", function(event) {
                const parent = event.target.parentElement;
                editBookInfo(parent.parentElement);
            }),
            makeButton("undo", function(event) {
                const parent = event.target.parentElement;
                undoBookIsComplete(parent.parentElement);
            }),
            makeButton("trash", function(event) {
                const parent = event.target.parentElement;
                clearBookIsComplete(parent.parentElement);
            })
        );
    } else {
        bookAction.append(
            makeButton("edit", function(event) {
                const parent = event.target.parentElement;
                editBookInfo(parent.parentElement);
            }),
            makeButton("checklist", function(event) {
                const parent = event.target.parentElement;
                addBookIsComplete(parent.parentElement);
            }),
            makeButton("trash", function(event) {
                const parent = event.target.parentElement;
                clearBookIsComplete(parent.parentElement);
            })
        );
    }
    return container;
}

function addBook() {
    const listComplete = document.getElementById(ID_LIST_AFTER);
    const listUncomplete = document.getElementById(ID_LIST_BEFORE);
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const checkType = document.getElementById("isComplete");
    
    if(!checkType.checked){
        const listOfBook = makeListOfBook(title, author, year, false);
        const bookObject = makeBookObject(title, author, year, false);
        listOfBook[ID_BOOK] = bookObject.id;
        list.push(bookObject);
        listUncomplete.append(listOfBook);
    } else {
        const listOfBook = makeListOfBook(title, author, year, true);
        const bookObject = makeBookObject(title, author, year, true);
        listOfBook[ID_BOOK] = bookObject.id;
        list.push(bookObject);
        listComplete.append(listOfBook);
    }
    updateDataToStorage();
}

function searchOfBook() {
    const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
    const searchList = document.querySelector(".info");
    let i = 0;
    for(item of searchList){
        if(searchTitle === searchList[i].childNodes[0].innerText.toLowerCase()){
            searchList[i].style.display = "block";
        } else {
            searchList[i].style.display = "none";
        }
    }
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("isComplete").checked = false;
}

function makeButton(buttonTypeClass, eventListener) {
    const btn = document.createElement("button");
    btn.classList.add(buttonTypeClass);
    btn.addEventListener("click", function(event) {
        eventListener(event);
    });
    return btn;
}

function addBookIsComplete(bookElement) {
    const titleBook = bookElement.querySelector(".title-book").innerText;
    const authorBook = bookElement.querySelector(".author-book").innerText;
    const yearBook = bookElement.querySelector(".year-book").innerText;
    const newBook = makeListOfBook(titleBook, authorBook, yearBook, true);
    const listComplete = document.getElementById(ID_LIST_AFTER);
    const book = findBook(bookElement[ID_BOOK]);
    book.isComplete = true;
    newBook[ID_BOOK] = book.id;
    listComplete.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}

function undoBookIsComplete(bookElement) {
    const titleBook = bookElement.querySelector(".title-book").innerText;
    const authorBook = bookElement.querySelector(".author-book").innerText;
    const yearBook = bookElement.querySelector(".year-book").innerText;
    const newBook = makeListOfBook(titleBook, authorBook, yearBook, false);
    const listUncomplete = document.getElementById(ID_LIST_BEFORE);
    const book = findBook(bookElement[ID_BOOK]);
    book.isComplete = false;
    newBook[ID_BOOK] = book.id;
    listUncomplete.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}

function editBookInfo(bookElement) {
    document.getElementById("bookSubmit").style.display = "none";
    const editButton = document.getElementById("bookEdit");
    editButton.style.display = "block";
    document.getElementById("title").value = bookElement.querySelector(".title-book").innerText;
    document.getElementById("author").value = bookElement.querySelector(".author-book").innerText;
    document.getElementById("year").value = bookElement.querySelector(".year-book").innerText;
    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        addBookOfEdit(bookElement);
    });
}

function addBookOfEdit(bookElement) {
    bookElement.remove();
    clearBookIsComplete(bookElement);
    const listUncomplete = document.getElementById(ID_LIST_BEFORE);
    const listComplete = document.getElementById(ID_LIST_AFTER);
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const checkType = document.getElementById("isComplete");
    if(!checkType.checked){
        const listOfBook = makeListOfBook(title, author, year, false); 
        const bookObject = makeBookObject(title, author, year, false);
        listOfBook[ID_BOOK] = bookObject.id;
        list.push(bookObject);
        listUncomplete.append(listOfBook);
    } else {
        const listOfBook = makeListOfBook(title, author, year, true);
        const bookObject = makeBookObject(title, author, year, true);
        listOfBook[ID_BOOK] = bookObject.id;
        list.push(bookObject);
        listComplete.append(listOfBook);
    }
    updateDataToStorage();
    clearForm();
    buttonBack();
}

function clearBookIsComplete(bookElement) {
    const bookPosition = findIndexBook(bookElement[ID_BOOK]);
    list.splice(bookPosition, 1);
    bookElement.remove();
    updateDataToStorage();
}

function buttonBack() {
    document.getElementById("bookSubmit").style.display = "block";
    document.getElementById("bookEdit").style.display = "none";
}