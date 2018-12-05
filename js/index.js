/*=============================================================================
 |      Project:  TEMPLATE CREATOR
 | 
 |  Description:  This project has been created with the purporse to
 |                generate CFM and SCSS markups for new website elements.
 |
 |       Author:  MARK CLAUS NUNES
 |    
 |     Due Date:  05/12/2018
 *===========================================================================*/

// GLOBAL VARIABLES
// --------------------------------------------------
const addItemInput = document.querySelector('.addItemInput');
const addItemButton = document.querySelector('.addItemButton');
const copyTextArea = document.querySelectorAll('.copyTextArea');
const expandTextArea = document.querySelectorAll('.expandTextArea');
const copyText = document.querySelector('.generateCode');
const listUl = document.querySelector('.list');
const list = listUl.children;
let listCopy = listUl.getElementsByTagName('span');
const panelsBack = document.querySelector('.panels-back p');
const panelsScss = document.querySelector('.panels-scss p');
const siteScss = document.querySelector('.site-scss p');
const homepageCfm = document.querySelector('.homepage-cfm p');
const codeText = document.querySelectorAll('.code .wrapper p');


// GENERATE AND COLLECT INFORMATION FROM INFO TO CODE SECTIONS
// --------------------------------------------------
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
	checkbox.name = "checkboxSelect";
	checkbox.value = "value";
	checkbox.checked = "true";
	//checkbox.id = "id";
	item.insertBefore(checkbox, item.childNodes[0] || null);

	//BEM wrapper
	let bemWrapper = document.createElement('form');
	bemWrapper.className = 'bem-wrapper';
	bemWrapper.textContent = '';
	item.appendChild(bemWrapper);

	// //Checkbox - BEM - Block
	let checkboxBlock = document.createElement('input');
	checkboxBlock.type = 'radio';
	checkboxBlock.className = 'checkbox__block';
	checkboxBlock.title = 'Block';
	checkboxBlock.name = "radio";
	checkboxBlock.checked = "true";
	bemWrapper.appendChild(checkboxBlock);

	//Checkbox - BEM - Element
	let checkboxElement = document.createElement('input');
	checkboxElement.type = 'radio';
	checkboxElement.className = 'checkbox__element';
	checkboxElement.title = 'Element';
	checkboxElement.name = "radio";
	bemWrapper.appendChild(checkboxElement);

	//Checkbox - BEM - Modifier
	let checkboxModifier = document.createElement('input');
	checkboxModifier.type = 'radio';
	checkboxModifier.className = 'checkbox__modifier';
	checkboxModifier.title = 'Modifier';
	checkboxModifier.name = "radio";
	bemWrapper.appendChild(checkboxModifier);

	//Remove button
	let remove = document.createElement('button');
	remove.className = 'remove btn far fa-trash-alt';
	remove.title = 'Delete';
	remove.textContent = '';
	item.appendChild(remove);
};
for (let i = 0; i < list.length; i += 1) {
	attachItemListButton(list[i]);
}

//Edit Text on double click
const editText = () => {
	let elements = list;
	for (let i = 0; i < elements.length; i++) {
		elements[i].ondblclick = function () {
			let textBox = prompt('How would you like to rename this element?');
			this.querySelector('span').textContent = textBox;
		}
	};
}
editText();

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
	let copyTextSiteScss = "";
	let copyTextHomepageCfm = "";

	for (let i = 0; i < listCopy.length; i += 1) {
		//If Checked
		if (listCopy[i].parentNode.querySelector(".checkbox:checked")) {

			let el = listCopy[i];

			// If Blcok - BEM
			if (el.parentNode.querySelector(".checkbox__block:checked")) {

				//Panel Back Office
				copyTextPanelBack += `${el.textContent.replace(/\s/g, "")},`;

				//Panel SCSS
				copyTextPanelScss += `//== PANEL: ${el.textContent.toUpperCase()}
			
				.${el.textContent.toLowerCase().replace(/\s/g, "-")} .panel	{ } 
				

				`;

				//Site SCSS
				copyTextSiteScss += `//== SECTION: ${el.textContent.toUpperCase()}
				
				.${el.textContent.toLowerCase().replace(/\s/g, "-")}	{ } 
				
				
				`;
				//Homepage CFM
				copyTextHomepageCfm += `<p>&lt;!--- PANEL:  ${el.textContent.toUpperCase()} ---&gt;</p>
				<br>
				<p>#cb.renderReusableContent(position='${el.textContent.replace(/\s/g, "")}', outerWrapper='</p>
				<p>&nbsp;&nbsp;&lt;div class="${el.textContent.toLowerCase().replace(/\s/g, "-")}"&gt;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;[content]</p>
				<p>&nbsp;&nbsp;&lt;/div&gt;</p>
				<p>')#</p>
				<br>`;
			}
			// If Element - BEM
			if (el.parentNode.querySelector(".checkbox__element:checked")) {

				//Panel Back Office
				copyTextPanelBack += `${el.textContent.replace(/\s/g, "")},`;

				//Panel SCSS
				copyTextPanelScss += `//== PANEL: ${el.textContent.toUpperCase()}
			
				.${el.textContent.toLowerCase().replace(/\s/g, "__")} .panel	{ } 
				

				`;
				//Site SCSS
				copyTextSiteScss += `//== SECTION: ${el.textContent.toUpperCase()}
				
				.${el.textContent.toLowerCase().replace(/\s/g, "__")}	{ } 
				
				
				`;
				//Homepage CFM
				copyTextHomepageCfm += `<p>&lt;!--- PANEL:  ${el.textContent.toUpperCase()} ---&gt;</p>
				<br>
				<p>#cb.renderReusableContent(position='${el.textContent.replace(/\s/g, "")}', outerWrapper='</p>
				<p>&nbsp;&nbsp;&lt;div class="${el.textContent.toLowerCase().replace(/\s/g, "__")}"&gt;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;[content]</p>
				<p>&nbsp;&nbsp;&lt;/div&gt;</p>
				<p>')#</p>
				<br>`;
			}
			// If Modifier - BEM
			if (el.parentNode.querySelector(".checkbox__modifier:checked")) {

				//Panel Back Office
				copyTextPanelBack += `${el.textContent.replace(/\s/g, "")},`;

				//Panel SCSS
				copyTextPanelScss += `//== PANEL: ${el.textContent.toUpperCase()}
			
				.${el.textContent.toLowerCase().replace(/\s/g, "--")} .panel	{ } 
				

				`;
				//Site SCSS
				copyTextSiteScss += `//== SECTION: ${el.textContent.toUpperCase()}
				
				.${el.textContent.toLowerCase().replace(/\s/g, "--")}	{ } 
				
				
				`;
				//Homepage CFM
				copyTextHomepageCfm += `<p>&lt;!--- PANEL:  ${el.textContent.toUpperCase()} ---&gt;</p>
				<br>
				<p>#cb.renderReusableContent(position='${el.textContent.replace(/\s/g, "")}', outerWrapper='</p>
				<p>&nbsp;&nbsp;&lt;div class="${el.textContent.toLowerCase().replace(/\s/g, "--")}"&gt;</p>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;[content]</p>
				<p>&nbsp;&nbsp;&lt;/div&gt;</p>
				<p>')#</p>
				<br>`;
			}
		}

	}
	panelsBack.innerText = copyTextPanelBack;
	panelsScss.innerText = copyTextPanelScss;
	siteScss.innerText = copyTextSiteScss;
	homepageCfm.innerHTML = copyTextHomepageCfm;
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
		this.insertAdjacentHTML('beforebegin', dropHTML);
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
	setTimeout(function () {
		e.parentNode.classList.remove('copied');
	}, 1000);
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


//Show full code on click
for (let i = 0; i < expandTextArea.length; i += 1) {
	expandTextArea[i].addEventListener('click', () => {
		if (expandTextArea[i].parentNode.classList.contains('show')) {
			expandTextArea[i].parentNode.classList.remove('show');
		} else {
			expandTextArea[i].parentNode.classList.add('show');
		}
	});
}