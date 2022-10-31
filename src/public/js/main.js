function makeTable(element) {
    const table = document.querySelector("tbody");
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.appendChild(document.createTextNode(element["name"]));
    tr.appendChild(name);
    const semester = document.createElement("td");
    semester.appendChild(document.createTextNode(element["semester"]));
    tr.appendChild(semester);
    const year = document.createElement("td");
    year.appendChild(document.createTextNode(element["year"]));
    tr.appendChild(year);
    const review = document.createElement("td");
    review.appendChild(document.createTextNode(element["review"]));
    tr.appendChild(review);
    table.appendChild(tr);
}

function filter(event) {
    event.preventDefault();
    const semester = document.getElementById("filterSemester").value;
    const year = document.getElementById("filterYear").value;
    const url = "http://localhost:3000/api/reviews?semester=" + semester + "&year=" + year;
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            let reviews = JSON.parse(req.responseText);
            while(document.querySelector("tbody").hasChildNodes()) {
                document.querySelector("tbody").removeChild(document.querySelector("tbody").firstChild);
            }
            reviews.forEach(review => makeTable(review));
        }
    });
    req.send();
}

function add(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const semester = document.getElementById("semester").value;
    const year = document.getElementById("year").value;
    const review = document.getElementById("review").value;
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/api/review/create", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.addEventListener("load", function () {
        req = new XMLHttpRequest();
        req.open("GET", "http://localhost:3000/api/reviews", true);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                let reviews = JSON.parse(req.responseText);
                while(document.querySelector("tbody").hasChildNodes()) {
                    document.querySelector("tbody").removeChild(document.querySelector("tbody").firstChild);
                }
                reviews.forEach(review => makeTable(review));
            }
        });
        req.send();
    });
    req.send("name=" + name + "&semester=" + semester + "&year=" + year + "&review=" + review);
}

function main() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/api/reviews", true);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            let reviews = JSON.parse(req.responseText);
            reviews.forEach(review => makeTable(review));
        }
    });
    req.send();

    const filterBtn = document.getElementById("filterBtn");
    const addBtn = document.getElementById("addBtn");
  
    filterBtn.addEventListener("click", filter);
    addBtn.addEventListener("click", add);

}

document.addEventListener("DOMContentLoaded", main);
