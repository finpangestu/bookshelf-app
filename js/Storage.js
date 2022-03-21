const STORAGE_KEY = "BOOKSHELF_APP";
let list = [];

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Your Browser is not Supported by localStorage");
        return false;
    }
    return true;
}

function loadDataFormStorage() {
    const serialized = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serialized);
    if(data !== null){
        list = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist()){
        const parsed = JSON.stringify(list);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event("ondatasaved"));
    }
}

function makeBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBook(idBook) {
    for(book of list){
        if(book.id === idBook){
            return book;
        }
    }
    return null;
}

function findIndexBook(idBook) {
    let index = 0;
    for (book of list){
        if(book.id === idBook){
            return index;
        }
        index++;
    }
    return -1;
}

function refreshDataFormList() {
    const listUncomplete = document.getElementById(ID_LIST_BEFORE);
    let listComplete = document.getElementById(ID_LIST_AFTER);
    for (book of list){
        const newBook = makeListOfBook(book.title, book.author, book.year, book.isComplete);
        newBook[ID_BOOK] = book.id;
        if(book.isComplete){
            listComplete.append(newBook);
        } else {
            listUncomplete.append(newBook);
        }
    }
}