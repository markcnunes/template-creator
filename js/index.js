// VARIABLES
// --------------------------------------------------
const addItemInput = document.querySelector('.addItemInput');
const addItemButton = document.querySelector('.addItemButton');
const copyTextArea = document.querySelectorAll('.copyTextArea');
const copyText = document.querySelector('.generateCode');
const listUl = document.getElementsByClassName('list')[0];
const list = listUl.getElementsByTagName('li');
let listCopy = listUl.getElementsByTagName('span');
const panelsBack = document.querySelector('.panels-back p');
const panelsScss = document.querySelector('.panels-scss p');


// GENERATE AND COLLECT INFORMATION FROM INFO TO CODE SECTIONS
// --------------------------------------------------

//Edit Text on double click
const editText = () => {
  let elements = list;
  for (let i = 0; i < elements.length; i++) {
    elements[i].ondblclick = function () {
      let textBox = prompt('How would you like to call this element?');
      let elementParent = elements[i].parentNode;
      let textEl = elementParent.querySelector('span');
      textEl.textContent = textBox;
    }
  };
}
editText();

//Get index of clicked element using pure javascript
//https://stackoverflow.com/questions/8801787/get-index-of-clicked-element-using-pure-javascript


var g = document.getElementById('my_div');
for (var i = 0, len = g.children.length; i < len; i++)
{

    (function(index){
        g.children[i].onclick = function(){
              alert(index)  ;
        }    
    })(i);

}







window.onload = function () {
  var elements = getElementsByClassName('editInPlace', '*', document);
  for (var i = 0; i < elements.length; i++) {
    elements[i].ondblclick = function () {
      this.setAttribute('oldText', this.innerHTML); // not actually required. I use this just in case you want to cancel and set the original text back.
      var textBox = document.createElement('INPUT');
      textBox.setAttribute('type', 'text');
      textBox.value = this.innerHTML;
      textBox.onblur = function () {
        var newValue = this.value;
        this.parentNode.innerHTML = newValue;
      }

      this.innerHTML = '';

      this.appendChild(textBox);
    }
  } (i);
}
function getElementsByClassName(className, tag, elm) {
  var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;
  var length = elements.length;
  for (var i = 0; i < length; i++) {
    current = elements[i];
    if (testClass.test(current.className)) {
      returnElements.push(current);
    }
  }
  return returnElements;
}















//Generate value/items = Draggable, Checkbox, Remove button
const attachItemListButton = (item) => {

    //Draggable
    item.draggable = "true";
    item.classList.add("list--item");
    addDnDHandlers(item);

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
    remove.className = 'remove btn far fa-trash-alt';
    remove.textContent = '';
    item.appendChild(remove);

    editText();

};
for (let i = 0; i < list.length; i += 1) {
    attachItemListButton(list[i]);
}

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

//Remove button
listUl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        //if (event.target.className == 'remove') {
            let li = event.target.parentNode;
            let ul = li.parentNode;
            ul.removeChild(li);
        //}
    }
});

//Copy text from checked items
copyText.addEventListener('click', () => {
  let copyTextPanelBack = "";
  let copyTextPanelScss = "";
  for (let i = 0; i < listCopy.length; i += 1) {
    if (listCopy[i].parentNode.querySelector("input:checked")) {
      copyTextPanelBack += listCopy[i].textContent + ',';
      copyTextPanelScss += listCopy[i].textContent + '+ TEST +';
    }
  }
  panelsBack.innerHTML = copyTextPanelBack;
  panelsScss.innerHTML = copyTextPanelScss;
});


// DRAG AND DROP ITEMS
// --------------------------------------------------
//Source: https://codepen.io/jbartels/pen/yPemMB
var dragSourceElement = null;

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
    var dropHTML = e.dataTransfer.getData('text');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
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

for (let i = 0; i < list.length; i += 1) {
  addDnDHandlers(list[i]);
}


// COPY TEXT FROM TEXT AREA
// --------------------------------------------------

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
//Animation when copied
const copyAnimation = (e) => {
    e.parentNode.classList.add('copied');
    setTimeout(function(){  e.parentNode.classList.remove('copied'); }, 1000);
};
//Loop for copyTextArea buttons to affect only the elements targeted
for (let i = 0; i < copyTextArea.length; i += 1) {
  copyTextArea[i].addEventListener('click', () => {
    let wrapper = copyTextArea[i].parentNode;
    let textEl = wrapper.querySelector('p');

    copyToClipboard(textEl.textContent);
    copyAnimation(textEl);
  });
}


