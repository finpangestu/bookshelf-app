document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("bookSubmit");
    const searchForm = document.getElementById("bookSearch");
    submitForm.addEventListener("click", function() {
        addBook();
        clearForm();
    });
    searchForm.addEventListener("click", function(event) {
        event.preventDefault();
        searchOfBook();
    })
    if(isStorageExist()) {
        loadDataFormStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data saved successfully");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFormList();
});

const checkType = document.getElementById("isComplete");
checkType.addEventListener("click", () => {
    if(checkType.checked){
        document.getElementById("bookType").innerHTML = "<strong>Selesai Dibaca</strong>";
    } else {
        document.getElementById("bookType").innerHTML = "<strong>Belum Selesai Dibaca</strong>";
    }
});