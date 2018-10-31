const addItemInput = document.querySelector('.addItemInput');
const addItemButton = document.querySelector('.addItemButton');
const copyText = document.querySelector('.generateCode');
const listUl = document.querySelector('.list');
const list = listUl.children;
const listCopy = document.querySelectorAll('span');

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
copyText.addEventListener('click', () => {
  let copyTextFromList = "";
  for (let i = 0; i < listCopy.length; i += 1) {
    if (listCopy[i].parentNode.querySelector("input:checked")) {
      listCopy[i].style.backgroundColor = 'green';
      copyTextFromList += listCopy[i].textContent + ',';
    }
  }
  console.log(copyTextFromList);
});


//Add item from the input field to the list
addItemButton.addEventListener('click', () => {
  let li = document.createElement('li');
  let span = document.createElement('span');
  span.textContent = addItemInput.value;
  listUl.appendChild(li);
  li.appendChild(span);
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