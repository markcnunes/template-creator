const addItemInput = document.querySelector('.addItemInput');
const addItemButton = document.querySelector('.addItemButton');
const generateCode = document.querySelector('.generateCode');
const listUl = document.querySelector('.list');
const list = listUl.children;


//FUNCTION: Generate value/items = Draggable, Checkbox, Remove button
const attachItemListButton = (item) => {

    //Draggable
    item.draggable = "true";
    item.classList.add("list--item");

    //Checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.name = "chkboxName1";
    checkbox.value = "value";
    checkbox.id = "id";
    item.insertBefore(checkbox, item.childNodes[0] || null);

    //Remove button
    let remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'Delete';
    item.appendChild(remove);
};
for (let i = 0; i < list.length; i += 1) {
    attachItemListButton(list[i]);
}


//Checking if there are checked items
let generateCodeFromList = "";
generateCode.addEventListener('click', () => {

    for (let i = 0; i < list.length; i += 1) {
        
        if (list[i].querySelector("input:checked")) {
            list[i].style.backgroundColor = 'green';
            generateCodeFromList += list[i].textContent + ',';
        }
    }
    console.log('working');
    console.log(generateCodeFromList);
});


//Add item from the input field to the list
addItemButton.addEventListener('click', () => {
    let ul = document.getElementsByTagName('ul')[0];
    let li = document.createElement('li');
    li.textContent = addItemInput.value;
    ul.appendChild(li);
    attachItemListButton(li);
    addItemInput.value = '';
});


//Function to interact with the Remove button
listUl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.className == 'remove') {
            let li = event.target.parentNode;
            let ul = li.parentNode;
            ul.removeChild(li);
        }
    }
});


//FUNCTION: Drag and drog Items
//Source: https://codepen.io/jbartels/pen/yPemMB
let dragSourceElement = null;

function handleStart(e) {
  dragSourceElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', this.outerHTML);
  this.classList.add('draggingElement');
}

function handleOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  this.classList.add('over');
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSourceElement != this) {
    this.parentNode.removeChild(dragSourceElement);
    let dropHTML = e.dataTransfer.getData('text');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    let dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
  }
  this.classList.remove('over');
  return false;
}

function handleEnd(e) {
  this.classList.remove('over');
  this.classList.remove('draggingElement');
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleStart, false);
  elem.addEventListener('dragover', handleOver, false);
  elem.addEventListener('dragleave', handleLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleEnd, false);

}

[].forEach.call(list, addDnDHandlers);