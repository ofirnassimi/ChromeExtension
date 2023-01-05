const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
let urls = [];
const urlsFromLocalStorage = JSON.parse(localStorage.getItem("urls"));

if(urlsFromLocalStorage) {
    urls = urlsFromLocalStorage;
    render(urls);
}

function addUrl(url) {
    urls.push(url);
    // Update urls array in local storage
    localStorage.setItem("urls", JSON.stringify(urls));
    console.log(localStorage.getItem("urls"));
    inputEl.value = "";
    render(urls);
}

async function extractUrl() {
    let tabs = await chrome.tabs.query({'active': true, 'currentWindow': true});
    return tabs[0].url;
}

function render(items) {
    let listItems = "";
    for (let i = 0; i < items.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${items[i]}'>
                ${items[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

function deleteAllUrls() {
    urls = [];
    localStorage.clear();
    render(urls);
}

inputBtn.addEventListener("click", () => addUrl(inputEl.value));
tabBtn.addEventListener("click", function() {
    extractUrl().then(url => addUrl(url));
})
deleteBtn.addEventListener("dblclick", () => deleteAllUrls());