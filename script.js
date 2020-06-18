//! KNOWN ELEMENTS
// Currently Selected Person
const displayName = document.getElementById('nameDisplay');
const captioned = document.getElementById('displayCaption');

// Random Person Button
const randForm = document.getElementById('randomForm');
const randBtn = document.getElementById('randomBtn');

// Add a Person
const addForm = document.getElementById('addForm');
const input = document.getElementById('inputField');
const btn = document.getElementById('btn');

// Tables
const add_tb = document.getElementById('add-tbody');
const selTB = document.getElementById('select-tbody');
const clearBTN = document.getElementById('clearBTN');

//! EVENT LISTENERS
randForm.addEventListener('submit', jumboDisplay);
addForm.addEventListener('submit', addArrFunc);
clearBTN.addEventListener('click', clearTable);


let addArr = [];
let selectedArr = [];
// let totalPeople = addArr.length + selectedArr.length;
let capArr = [
    'Caption 1', 'Caption 2', 'Caption 3', 'Caption 4', 'Caption 5'
]

//! SELECTED PERSON

// Jumbotron
function jumboDisplay(e) {
    e.preventDefault();

    let x = Math.floor(Math.random(0) * addArr.length);
    // selectedArr.push(addArr[x]);
    let c = Math.floor(Math.random(0) * capArr.length);
    
    displayName.textContent = addArr[x];
    captioned.textContent = capArr[c];
    
    addArr.splice(x, 1);
    
    selectedArr.length === 0 ? captioned.textContent = 'You have been chosen as the First... ' : addArr.length === 0 ? captioned.textContent = 'They say the best is last...  I guess we\'ll see' : addArr.length === 1 ? captioned.textContent = `I wonder who will be after you?  Looking at you ${addArr[0]}!` : captioned.textContent = capArr[c];

    console.log('Updated addArr: ', addArr);
    addTableDisplay(addArr);
    selectedArrTable();
}

//! BUILD TABLES

function addArrFunc(e) {
    e.preventDefault();

    name = input.value; 
    addArr.push(name);

    console.log(`addArr: ${addArr}`);

    input.value = '';

    addTableDisplay(addArr)
}

function addTableDisplay(arr) {

    // const add_tb = document.getElementById('add-tbody');
    
    while (add_tb.firstChild) {
        add_tb.removeChild(add_tb.firstChild);
    }
    
    arr.forEach(e => {
        let addtr = document.createElement('tr');
        let addtd = document.createElement('td');
        
        addtd.textContent = e;

        addtr.appendChild(addtd);
        add_tb.appendChild(addtr);
    })

}

function selectedArrTable() {
    console.log(displayName.textContent)
    let inputSelName = displayName.textContent;

    selectedArr.push(inputSelName);
    console.log('selectedArr: ', selectedArr)

    // const selTB = document.getElementById('select-tbody');
    
    while (selTB.firstChild) {
        selTB.removeChild(selTB.firstChild);
    }
    
    selectedArr.forEach(m => {
        let seltr = document.createElement('tr');
        let seltd = document.createElement('td');
        
        seltd.textContent = m;

        seltr.appendChild(seltd);
        selTB.appendChild(seltr);
    })
}

function clearTable() {

    while(selTB.firstChild) {
        selTB.removeChild(selTB.firstChild);
    }

    while (add_tb.firstChild) {
        add_tb.removeChild(add_tb.firstChild);
    }

    displayName.textContent = 'Another Round?'
    captioned.textContent = null;
}