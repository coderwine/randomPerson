//! KNOWN ELEMENTS
// On Load Modal
const onLoadModal = document.getElementById('loadModal');
const closeLoad = document.getElementById('modalClose');

// Currently Selected Person
const displayName = document.getElementById('nameDisplay');
const captioned = document.getElementById('displayCaption');
const prog = document.querySelector('progress');

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
// let delBTN;
const clearBTN = document.getElementById('clearBTN');
const resetBTN = document.getElementById('resetBTN');
const addTableTitle = document.getElementById('studentsLeft');
const selTableTitle = document.getElementById('studentsGone');

// Dumb Modal
const modal = document.getElementById('goatModal');

//! EVENT LISTENERS
// randForm.addEventListener('submit', jumboDisplay);
closeLoad.addEventListener('click', loadModal);
randForm.addEventListener('submit', quickCheck);
addForm.addEventListener('submit', addArrFunc);
clearBTN.addEventListener('click', clearTable);
resetBTN.addEventListener('click', resetTables);
// delBTN.addEventListener('click', 
//     function clearName() {
//         console.log('button was clicked')
// })

let addArr = [];
let selectedArr = [];

// console.log(totalPeople);

let joke;

//! LOAD MODAL
function loadModal(e) {
    e.preventDefault();
    onLoadModal.className = 'modal'
    onLoadModal.style = 'display: none;'
}

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
        // console.log('MAKE JOKE FUNC: ', data)
        // return joke = data.joke // used for jokeapi
        return joke = `${data.setup}   ${data.punchline}` // needed for official-joke-api 
        // return joke = `${data.setup}   ${data.punchline}` 
    }
}

//! SELECTED PERSON

// Jumbotron - RANDOM BTN SELECTION
function quickCheck(e) {
    e.preventDefault();
    // console.log('addArr: ',addArr, 'selectedArr: ', selectedArr)

    // addArr.length == selectedArr.length && addArr.length != 0 && selectedArr != 0 ? modalFun() : jumboDisplay();
    addArr.length === 1 && selectedArr.length > addArr.length ? modalFun() : jumboDisplay();
}

function jumboDisplay(e) {
    // e.preventDefault();
    fetchJoke();

    // progress bar
    let totalPeople = addArr.length + selectedArr.length;
    let percent = Math.floor(((selectedArr.length + 1) / totalPeople)*100);
    prog.value = percent;

    if(addArr.length === 0){
        alert('Zero is an infinit set of random nothingness all swimming in a soupy mud of wonder.  If there are no users, I\'d say it\'s pretty easy to randomly select.  Try resetting or clearing the tables.')
    } else {
        null
    }

    let firstCaption = `Odds were 1 out of ${addArr.length} and you nailed it!`
    let x = Math.floor(Math.random(0) * addArr.length);
    
    console.log('Joke: ',joke)

    displayName.textContent = addArr[x];
    if (selectedArr.length == 0) {
        displayName.id = 'css-typed';
    } else {
        displayName.id = 'nameDisplay';
    }

    addArr.splice(x, 1);
    
    selectedArr.length === 0 ? captioned.textContent = firstCaption : addArr.length === 0 ? captioned.textContent = 'They say the best is last...  I guess we\'ll see' : addArr.length === 1 ? captioned.textContent = `I wonder who will be after you?  Looking at you ${addArr[0]}!` : captioned.textContent = joke;
    
    console.log('Updated addArr: ', addArr);
    addTableDisplay(addArr);
    selectedArrTable();
}

//! BUILD TABLES

function addArrFunc(e) {
    e.preventDefault();
        
    let first = inputFirst.value;
    let capFirst;
    let last = inputLast.value
    let capLast;

    for(let i in first) {
        i == 0 ? capFirst = first[i].toUpperCase() :
        capFirst += first[i].toLowerCase()
    }

    for(let n in last) {
        n == 0 ? capLast = last[n].toUpperCase() : capLast += last[n].toLowerCase();
    }

    let name = `${capFirst} ${capLast}`; 
    addArr.push(name);

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
        // delBTN = document.createElement('button');
        
        addtd.textContent = e;
        addTableTitle.textContent = 
        addArr.length === 1 ? `There is only ${addArr.length} person.  Gonna be hard to make this Random...` :`There are ${addArr.length} people left to go.`

        // delBTN.textContent = 'X';
        // delBTN.className = "delPerson btn btn-outline-warning btn-danger"

        // addtd.appendChild(delBTN);
        addtr.appendChild(addtd);
        add_tb.appendChild(addtr);
    })

}

function selectedArrTable() {
    
    addArr.length === 0 ? addTableTitle.textContent = "No Name in the Hat... also, no hat." : null;

    let inputSelName = displayName.textContent;

    selectedArr.push(inputSelName);
    
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
    addTableTitle.textContent = `Remember when there were ${addArr.length} names?  Those were good times.`
    selTableTitle.textContent = `${addArr.length} - ${addArr.length} = a hungry Table.`;

    addArr = [];
    selectedArr = [];
}

function resetTables() {
    addArr = [ ...selectedArr];

    addTableDisplay(addArr);

    while(selTB.firstChild) {
        selTB.removeChild(selTB.firstChild);
    }

    displayName.textContent = 'Another Round?'
    captioned.textContent = null;
    addTableTitle.textContent = `Rerack to ${addArr.length}!`
    selTableTitle.textContent = `Ohh... let's go another ${addArr.length} Rounds!`;

}

function modalFun() {
    modal.className = 'modal is-active'
    setTimeout(function showGoat() {
        modal.className = 'modal';
        jumboDisplay();
    }, 2000);
}
