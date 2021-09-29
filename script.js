
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const addButton = document.querySelector("#add");
addButton.addEventListener("click", function(e) {
    addBookToLibrary();
});

const deleteAllButton = document.querySelector("#deleteAll");
deleteAllButton.addEventListener("click", function(e) {
        let myLibraryFromJson = [];

        let json = JSON.stringify(myLibraryFromJson);
        localStorage.setItem("books", json);
        
        const tbody = document.querySelector("tbody");
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row) => {
            tbody.removeChild(row);
        });

        const readBooks = document.querySelector("#read");
        readBooks.textContent = `BOOKS READ: 0`;
        const unReadBooks = document.querySelector("#unread");
        unReadBooks.textContent = "BOOKS UNREAD: 0";
        const totalBooks = document.querySelector("#total");
        totalBooks.textContent = "TOTAL BOOKS: 0";
});

populateTable();

const table = document.querySelector("table");

table.addEventListener("mouseenter", function(e) {
    const deleteTbody = document.querySelector("tbody");
    const deleteRows = deleteTbody.querySelectorAll("tr");
    
    deleteRows.forEach((deleteRow) => {
        const tdDelete = deleteRow.querySelector(".removal");
        const deleteButton = tdDelete.querySelector("button.delete");
        
        deleteButton.addEventListener("click", function(e) {
            let rowId = Number(deleteRow.id);
            let myLibrary = JSON.parse(localStorage.getItem("books"));
            myLibrary.splice(rowId, 1);
            deleteTbody.removeChild(deleteRow);
    
            localStorage.setItem("books", JSON.stringify(myLibrary));
            myLibrary = JSON.parse(localStorage.getItem("books"));
    
            const readBooks = document.querySelector("#read");
            readBooks.textContent = `BOOKS READ: ${myLibrary.filter(book => book["isRead"]).length}`;
            const unReadBooks = document.querySelector("#unread");
            unReadBooks.textContent = `BOOKS UNREAD: ${myLibrary.filter(book => !book["isRead"]).length}`;
            const totalBooks = document.querySelector("#total");
            totalBooks.textContent = `TOTAL BOOKS: ${myLibrary.length}`;
        });
    });
    
    const editTbody = document.querySelector("tbody");
    const editRows = editTbody.querySelectorAll("tr");
    
    editRows.forEach((editRow) => {
        const tdEdit = editRow.querySelector(".status");
        const editButton = tdEdit.querySelector("button.edit");
    
        editButton.addEventListener("click", function(e) {
            let rowId = Number(editRow.id);
            let myLibrary = JSON.parse(localStorage.getItem("books"));
            myLibrary[rowId].isRead = !myLibrary[rowId].isRead;
    
            localStorage.setItem("books", JSON.stringify(myLibrary));
            myLibrary = JSON.parse(localStorage.getItem("books"));
    
            const readBooks = document.querySelector("#read");
            readBooks.textContent = `BOOKS READ: ${myLibrary.filter(book => book["isRead"]).length}`;
            const unReadBooks = document.querySelector("#unread");
            unReadBooks.textContent = `BOOKS UNREAD: ${myLibrary.filter(book => !book["isRead"]).length}`;
            const totalBooks = document.querySelector("#total");
            totalBooks.textContent = `TOTAL BOOKS: ${myLibrary.length}`;
    
            if (myLibrary[rowId].isRead) {
                editButton.classList.remove("btn-danger");
                editButton.classList.add("btn-success");

                const icon = editButton.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-check");
            }
            else {
                editButton.classList.remove("btn-success");
                editButton.classList.add("btn-danger");

                const icon = editButton.querySelector("i");
                icon.classList.remove("fa-check");
                icon.classList.add("fa-times");
            }
        });
    });
});

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = Number(document.querySelector("#pages").value);
    let isRead = document.querySelector("#isRead").checked;

    let book = new Book(title, author, pages, isRead);
    let myLibrary = [];
    
    if (localStorage.getItem("books")) {
        let myLibraryFromJson = JSON.parse(localStorage.getItem("books"));

        for (let i = 0; i < myLibraryFromJson.length; i++) {
            myLibrary[i] = myLibraryFromJson[i];
        }

        if (title != "" && author != "" && pages != 0 && pages >= 1 && pages <= 2000) {
            myLibrary.push(book);
            let json = JSON.stringify(myLibrary);
            localStorage.setItem("books", json);

            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#pages").value = "";
            document.querySelector("#isRead").checked = false;
        }
    }
    else {
        if (title != "" && author != "" && pages != 0 && pages >= 1 && pages <= 2000) {
            myLibrary.push(book);
            let json = JSON.stringify(myLibrary);
            localStorage.setItem("books", json);

            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#pages").value = "";
            document.querySelector("#isRead").checked = false;
        }
    }

    if (title != "" && author != "" && pages != 0 && pages >= 1 && pages <= 2000) {
        const tableBody = document.querySelector("tbody");

        const tableRow = document.createElement("tr");
        tableRow.setAttribute("id", `${myLibrary.length - 1}`);
        tableRow.classList.add("dottedRow");

        const tdTitle = document.createElement("td");
        tdTitle.textContent = title;
        tableRow.appendChild(tdTitle);

        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = author;
        tableRow.appendChild(tdAuthor);

        const tdPages = document.createElement("td");
        tdPages.textContent = pages.toString();
        tableRow.appendChild(tdPages);

        const tdIsRead = document.createElement("td");
        tdIsRead.classList.add("status");
        if (isRead) {
            const readCheck = document.createElement("button");
            readCheck.classList.add("btn");
            readCheck.classList.add("btn-success");
            readCheck.classList.add("edit");
            const icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-check");
            readCheck.appendChild(icon);
            tdIsRead.appendChild(readCheck);
        }
        else {
            const unreadCheck = document.createElement("button");
            unreadCheck.classList.add("btn");
            unreadCheck.classList.add("btn-danger");
            unreadCheck.classList.add("edit");
            const icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-times");
            unreadCheck.appendChild(icon);
            tdIsRead.appendChild(unreadCheck);
        }
        tableRow.appendChild(tdIsRead);

        const tdRemoval = document.createElement("td");
        tdRemoval.classList.add("text-danger");
        tdRemoval.classList.add("removal");
        const button = document.createElement("button");
        button.classList.add("delete");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        const trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash-alt");
        button.appendChild(trash);
        tdRemoval.appendChild(button);
        tableRow.appendChild(tdRemoval);

        tableBody.appendChild(tableRow);
    }

    const readBooks = document.querySelector("#read");
    readBooks.textContent = `BOOKS READ: ${myLibrary.filter(book => book["isRead"]).length}`;
    const unReadBooks = document.querySelector("#unread");
    unReadBooks.textContent = `BOOKS UNREAD: ${myLibrary.filter(book => !book["isRead"]).length}`;
    const totalBooks = document.querySelector("#total");
    totalBooks.textContent = `TOTAL BOOKS: ${myLibrary.length}`;

    // location.reload();
}

function populateTable() {
    let myLibrary = [];
    
    if (localStorage.getItem("books")) {
        let myLibraryFromJson = JSON.parse(localStorage.getItem("books"));

        for (let i = 0; i < myLibraryFromJson.length; i++) {
            myLibrary[i] = myLibraryFromJson[i];
        }
    }

    const tableBody = document.querySelector("tbody");

    for (let i = 0; i < myLibrary.length; i++) {
        const tableRow = document.createElement("tr");
        if (!tableRow.classList.contains("dottedRow")) {
            tableRow.classList.add("dottedRow");
        }
        tableRow.setAttribute("id", `${i}`);

        const tdTitle = document.createElement("td");
        tdTitle.textContent = myLibrary[i].title;
        tableRow.appendChild(tdTitle);

        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = myLibrary[i].author;
        tableRow.appendChild(tdAuthor);

        const tdPages = document.createElement("td");
        tdPages.textContent = myLibrary[i].pages.toString();
        tableRow.appendChild(tdPages);

        const tdIsRead = document.createElement("td");
        tdIsRead.classList.add("status");
        if (myLibrary[i].isRead) {
            const readCheck = document.createElement("button");
            readCheck.classList.add("btn");
            readCheck.classList.add("btn-success");
            readCheck.classList.add("edit");
            const icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-check");
            readCheck.appendChild(icon);
            tdIsRead.appendChild(readCheck);
        }
        else {
            const unreadCheck = document.createElement("button");
            unreadCheck.classList.add("btn");
            unreadCheck.classList.add("btn-danger");
            unreadCheck.classList.add("edit");
            const icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-times");
            unreadCheck.appendChild(icon);
            tdIsRead.appendChild(unreadCheck);
        }
        tableRow.appendChild(tdIsRead);

        const tdRemoval = document.createElement("td");
        tdRemoval.classList.add("text-danger");
        tdRemoval.classList.add("removal");
        const button = document.createElement("button");
        button.classList.add("delete");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        const trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash-alt");
        button.appendChild(trash);
        tdRemoval.appendChild(button);
        tableRow.appendChild(tdRemoval);

        tableBody.appendChild(tableRow);
    }

    const readBooks = document.querySelector("#read");
    readBooks.textContent = `BOOKS READ: ${myLibrary.filter(book => book["isRead"]).length}`;
    const unReadBooks = document.querySelector("#unread");
    unReadBooks.textContent = `BOOKS UNREAD: ${myLibrary.filter(book => !book["isRead"]).length}`;
    const totalBooks = document.querySelector("#total");
    totalBooks.textContent = `TOTAL BOOKS: ${myLibrary.length}`;
}