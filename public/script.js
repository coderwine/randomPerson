//! KNOWN ELEMENTS
// Currently Selected Person
const displayName = document.getElementById('nameDisplay');
const captioned = document.getElementById('displayCaption');

// Random Person Button
const randForm = document.getElementById('randomForm');
const randBtn = document.getElementById('randomBtn');

// Add a Person
const addForm = document.getElementById('addForm');
const inputFirst = document.getElementById('inputFirstField');
const inputLast = document.getElementById('inputLastField');
const btn = document.getElementById('btn');

// Tables
const add_tb = document.getElementById('add-tbody');
const selTB = document.getElementById('select-tbody');
const clearBTN = document.getElementById('clearBTN');
const resetBTN = document.getElementById('resetBTN');
const addTableTitle = document.getElementById('studentsLeft');
const selTableTitle = document.getElementById('studentsGone');

//! EVENT LISTENERS
randForm.addEventListener('submit', jumboDisplay);
addForm.addEventListener('submit', addArrFunc);
clearBTN.addEventListener('click', clearTable);
resetBTN.addEventListener('click', resetTables);

let addArr = [];
let selectedArr = [];
let totalPeople = addArr.length + selectedArr.length;

console.log(totalPeople);

let joke;

//! FETCH
// const url = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist&type=single';
const url = 'https://official-joke-api.appspot.com/random_joke';
// const url = 'https://icanhazdadjoke.com/';
// const options = {
//     headers: {
//         User-Agent: 'My Library (https://github.com/coderwine/randomPerson)',
//         Content-Type: 'application/json'
//     }
// }

function fetchJoke() {
    // fetch(url, options)
    fetch(url)
        .then(res => res.json())
        .then(data => makeJoke(data));

    function makeJoke(data) {
        console.log('MAKE JOKE FUNC: ', data)
        // return joke = data.joke // used for jokeapi
        return joke = `${data.setup}   ${data.punchline}` // needed for official-joke-api 
        // return joke = `${data.setup}   ${data.punchline}` 
    }
}

// fetchJoke();


//! SELECTED PERSON

// Jumbotron
function jumboDisplay(e) {
    e.preventDefault();
    fetchJoke();

    let x = Math.floor(Math.random(0) * addArr.length);
    
    console.log('Joke: ',joke)

    displayName.textContent = addArr[x];
    
    addArr.splice(x, 1);
    
    selectedArr.length === 0 ? captioned.textContent = 'You have been chosen as the First... ' : addArr.length === 0 ? captioned.textContent = 'They say the best is last...  I guess we\'ll see' : addArr.length === 1 ? captioned.textContent = `I wonder who will be after you?  Looking at you ${addArr[0]}!` : captioned.textContent = joke;

    console.log('Updated addArr: ', addArr);
    addTableDisplay(addArr);
    selectedArrTable();
}

//! BUILD TABLES

function addArrFunc(e) {
    e.preventDefault();

    let first = inputFirst.value;
    let last = inputLast.value;

    console.log(`${first} ${last}`);
    console.log(first.length + last.length)

    name = `${first} ${last}`; 
    addArr.push(name);

    console.log(`addArr: ${addArr}`);

    inputFirst.value = '';
    inputLast.value = '';

    addTableDisplay(addArr);
}

function addTableDisplay(arr) {
    
    while (add_tb.firstChild) {
        add_tb.removeChild(add_tb.firstChild);
    }
    
    arr.forEach(e => {
        let addtr = document.createElement('tr');
        let addtd = document.createElement('td');
        
        addtd.textContent = e;
        addTableTitle.textContent = 
        addArr.length === 1 ? `There is only ${addArr.length} person.  Gonna be hard to make this Random...` :`There are ${addArr.length} people left to go.`

        addtr.appendChild(addtd);
        add_tb.appendChild(addtr);
    })

}

function selectedArrTable() {
    console.log(displayName.textContent)
    let inputSelName = displayName.textContent;

    selectedArr.push(inputSelName);
    console.log('selectedArr: ', selectedArr)
    
    while (selTB.firstChild) {
        selTB.removeChild(selTB.firstChild);
    }
    
    selectedArr.forEach(m => {
        let seltr = document.createElement('tr');
        let seltd = document.createElement('td');
        
        seltd.textContent = m;
        selTableTitle.textContent = 
        selectedArr.length === 1 ? `Only ${selectedArr.length} has gone.`: `${selectedArr.length} people have gone so far.`

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

    displayName.textContent = 'I Hate Saying Goodbye... so I Won\'t'
    captioned.textContent = null;
}

function resetTables() {
    addArr = [ ...selectedArr];
    console.log('Copied Array: ', addArr)

    addTableDisplay(addArr);

    while(selTB.firstChild) {
        selTB.removeChild(selTB.firstChild);
    }

    displayName.textContent = 'Another Round?'
    captioned.textContent = null;

}

console.log('delete this')