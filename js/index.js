/*=============================================================================
 |      Project:  TEMPLATE CREATOR
 | 
 |  Description:  This project has been created with the purporse to
 |                generate CFM and SCSS markups for new website elements.
 |
 |       Author:  MARK CLAUS NUNES
 |    
 |     Created - Date:  05/12/2018
 |     Last Modified - Date:  21/12/2018
 |     Version: 1.3.01
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
const bemSelect = listUl.getElementsByClassName('bem__select');
const bemSelectItem = listUl.getElementsByClassName('bem__select-item');
const listWord = listUl.getElementsByClassName('word__text');
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
		
	//Remove button
	let remove = document.createElement('button');
	remove.className = 'remove btn far fa-trash-alt';
	remove.title = 'Delete';
	remove.textContent = '';
	item.appendChild(remove);
};
//Create divs around the words and add BEM targets
let splitWords = (item) => {
	let text = item.textContent.split(" ").map(function (word) {
		if (word ===  item.textContent.split(" ")[0]) {
			return `<div class="word">
						<div class="word__text word__bem--block" >${word}</div>
					</div>`;
		} else {
		return `<div class="word">
					<form>
						<input type="radio" name="bem" title="Block" value="1" class="bem__select-item bem__select-item--block" checked >
						<input type="radio" name="bem" title="Element" value="2" class="bem__select-item bem__select-item--element"  >
						<input type="radio" name="bem" title="Modifier" value="3" class="bem__select-item bem__select-item--modifier"  >
					</form>	
					<div class="word__text word__bem--block" >${word}</div>
				</div>`;}
	}).join(" ");
	item.innerHTML = text;
};

//Edit/Rename Text on double click
const editText = () => {
	let elements = list;
	for (let i = 0; i < elements.length; i++) {
		elements[i].ondblclick = function () {
			let textBox = prompt('How would you like to rename this element?');
			if (textBox === null) {
				console.log('emp');
				return; //break out of the function early
			} else if (textBox) {
				this.querySelector('span').textContent = textBox;
				splitWords(this.querySelector('span'));
			}
		}
	};
}
editText();

for (let i = 0; i < list.length; i += 1) {
	attachItemListButton(list[i]);
}
for (let i = 0; i < listCopy.length; i ++) {
	splitWords(listCopy[i]);
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
	splitWords(span);
	activeChangeBem();
});

//Remove button
listUl.addEventListener('click', (event) => {
	if (event.target.tagName == 'BUTTON') {
		let li = event.target.parentNode;
		let ul = li.parentNode;
		ul.removeChild(li);
	}
});

const activeChangeBem = () => {
	// Change BEM classes of each word by radio buttons
	for (let i = 0; i < bemSelectItem.length; i++) {
		bemSelectItem[i].addEventListener('click', () => {
			//Values: Block(1), Element(2) and Modifier(3)
			if (bemSelectItem[i].value === '1' ) {
				bemSelectItem[i].parentNode.parentNode.lastElementChild.className = 'word__text word__bem--block';
			} else if (bemSelectItem[i].value === '2' ) {
				bemSelectItem[i].parentNode.parentNode.lastElementChild.className = 'word__text word__bem--element';
			} else if (bemSelectItem[i].value === '3' ) {
				bemSelectItem[i].parentNode.parentNode.lastElementChild.className = 'word__text word__bem--modifier';
			}
		});
	}	
};	
activeChangeBem();

// COPY TEXT FROM CHECKED ITEMS
// --------------------------------------------------
copyText.addEventListener('click', () => {
	let copyTextPanelBack = "";
	let copyTextPanelScss = "";
	let copyTextPanelScssSecondLine = "";
	let copyTextSiteScss = "";
	let copyTextHomepageCfm = "";
	
	for (let a = 0; a < listWord.length; a += 1) { 
		let elW = listWord[a];
		console.log(elW);
		//Select the span div wrapping all words
		let elSpan = elW.parentNode.parentNode;
		let elLastChild = elW.parentNode.parentNode.lastElementChild.lastElementChild;
		let elFirstChild = elW.parentNode.parentNode.firstElementChild.lastElementChild;
	

		//If Checked
		if (elW.parentNode.parentNode.parentNode.querySelector(".checkbox:checked")) {
			console.log('it is checked');

			//Panel Back Office
			const fnPanelBackOffice = () => {
				//Add coma to the last child
				if (elW === elLastChild) { 
					copyTextPanelBack += `${elW.textContent.replace(/^\w/, c => c.toUpperCase())},`;
				} else {
				copyTextPanelBack += `${elW.textContent.replace(/^\w/, c => c.toUpperCase())}`;
				}
			};
			fnPanelBackOffice();
			
			//Panel SCSS
			const fnPanelScss = () => {
				if (elW === elFirstChild) { 
					copyTextPanelScss += `//== PANEL: ${elW.textContent.toUpperCase()}`;
				} else if (elW === elLastChild) {
					
					copyTextPanelScss += ` ${elW.textContent.toUpperCase()}
					
					${copyTextPanelScssSecondLine}`;				
				} else {
					copyTextPanelScss += ` ${elW.textContent.toUpperCase()}`;
				}
			};
			//Panel SCSS - Function to create second line of Panel SCSS
			const fnPanelScssSecondLine = () => {
				if (elW === elFirstChild) { 
					copyTextPanelScssSecondLine = `.${elW.textContent.toLowerCase()}`;
				} else if (elW === elLastChild) {
					if (elW.classList.contains("word__bem--block")) {
						copyTextPanelScssSecondLine += `-${elW.textContent.toLowerCase()} .panel	{ }
					

						`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextPanelScssSecondLine += `__${elW.textContent.toLowerCase()} .panel	{ }
					

						`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextPanelScssSecondLine += `--${elW.textContent.toLowerCase()} .panel	{ }
					

						`;
					}
				} else {
					if (elW.classList.contains("word__bem--block")) {
						copyTextPanelScssSecondLine += `-${elW.textContent.toLocaleLowerCase()}`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextPanelScssSecondLine += `__${elW.textContent.toLocaleLowerCase()}`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextPanelScssSecondLine += `--${elW.textContent.toLocaleLowerCase()}`;
					}
				}
			};
			fnPanelScssSecondLine();	
			fnPanelScss();

			//Site SCSS
			const fnSiteScss = () => {
				if (elW === elFirstChild) { 
					copyTextSiteScss += `//== SECTION: ${elW.textContent.toUpperCase()}`;
				} else if (elW === elLastChild) {
					
					copyTextSiteScss += ` ${elW.textContent.toUpperCase()}
					
					.${copyTextSiteScssSecondLine}`;				
				} else {
					copyTextSiteScss += ` ${elW.textContent.toUpperCase()}`;
				}
			};
			//Site SCSS - Function to create second line of Site SCSS
			const fnSiteScssSecondLine = () => {
				if (elW === elFirstChild) { 
					copyTextSiteScssSecondLine = `${elW.textContent.toLowerCase()}`;
				} else if (elW === elLastChild) {
					if (elW.classList.contains("word__bem--block")) {
						copyTextSiteScssSecondLine += `-${elW.textContent.toLocaleLowerCase()} { }
					

						`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextSiteScssSecondLine += `__${elW.textContent.toLocaleLowerCase()} { }
					

						`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextSiteScssSecondLine += `--${elW.textContent.toLocaleLowerCase()} { }
					

						`;
					}
				} else {
					if (elW.classList.contains("word__bem--block")) {
						copyTextSiteScssSecondLine += `-${elW.textContent.toLocaleLowerCase()}`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextSiteScssSecondLine += `__${elW.textContent.toLocaleLowerCase()}`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextSiteScssSecondLine += `--${elW.textContent.toLocaleLowerCase()}`;
					}
				}
			};
			fnSiteScssSecondLine();	
			fnSiteScss();

			//Homepage CFM
			/*
			|  The following code is not aligned properly because it has
			|  to work with css white-space to the output looks right
			*/
			const fnHomepageCfm = () => {
				if (elW === elFirstChild) { 
					copyTextHomepageCfm += `<!--- PANEL: ${elW.textContent.toUpperCase()}`;
				} else if (elW === elLastChild) {
					
					copyTextHomepageCfm += ` ${elW.textContent.toUpperCase()} --->
					
#cb.renderReusableContent(position='${copyTextHomepageCfmSecondLine}`;				
				} else {
					copyTextHomepageCfm += ` ${elW.textContent.toUpperCase()}`;
				}
			};
			//Homepage CFM - Function to create second line of Homepage CFM
			const fnHomepageCfmSecondLine = () => {
				if (elW === elFirstChild) { 
					copyTextHomepageCfmSecondLine = `${elW.textContent.replace(/^\w/, c => c.toUpperCase())}`;
				} else if (elW === elLastChild) {
					if (elW.classList.contains("word__bem--block")) {
						copyTextHomepageCfmSecondLine += `-${elW.textContent.replace(/^\w/, c => c.toUpperCase())}', outerWrapper='
	<div class="${copyTextHomepageCfmThirdLine}`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextHomepageCfmSecondLine += `__${elW.textContent.replace(/^\w/, c => c.toUpperCase())}', outerWrapper='
	<div class="${copyTextHomepageCfmThirdLine}`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextHomepageCfmSecondLine += `--${elW.textContent.replace(/^\w/, c => c.toUpperCase())}', outerWrapper='
	<div class="${copyTextHomepageCfmThirdLine}`;
					}
				} else {
					if (elW.classList.contains("word__bem--block")) {
						copyTextHomepageCfmSecondLine += `-${elW.textContent.replace(/^\w/, c => c.toUpperCase())}`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextHomepageCfmSecondLine += `__${elW.textContent.replace(/^\w/, c => c.toUpperCase())}`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextHomepageCfmSecondLine += `--${elW.textContent.replace(/^\w/, c => c.toUpperCase())}`;
					}
				}
			};
			//Homepage CFM - Function to create third line of Homepage CFM
			const fnHomepageCfmThirdLine = () => {
				if (elW === elFirstChild) { 
					copyTextHomepageCfmThirdLine = `${elW.textContent.toLowerCase()}`;
				} else if (elW === elLastChild) {
					if (elW.classList.contains("word__bem--block")) {
						copyTextHomepageCfmThirdLine += `-${elW.textContent.toLowerCase()}">
		[content]
	</div>
')#


`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextHomepageCfmThirdLine += `__${elW.textContent.toLowerCase()}">
		[content]
	</div>
')#


`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextHomepageCfmThirdLine += `--${elW.textContent.toLowerCase()}">
		[content]
	</div>
')#


`;
					}
				} else {
					if (elW.classList.contains("word__bem--block")) {
						copyTextHomepageCfmThirdLine += `-${elW.textContent.toLowerCase()}`;
					} else if (elW.classList.contains("word__bem--element")) {
						copyTextHomepageCfmThirdLine += `__${elW.textContent.toLowerCase()}`;
					} else if (elW.classList.contains("word__bem--modifier")) {
						copyTextHomepageCfmThirdLine += `--${elW.textContent.toLowerCase()}`;
					}
				}
			};
			fnHomepageCfmThirdLine();	
			fnHomepageCfmSecondLine();	
			fnHomepageCfm();
			
			
		}


	}
	//Copy information from the previous code and inserting in the divs
	panelsBack.innerText = copyTextPanelBack.substr(0, copyTextPanelBack.length-1);
	panelsScss.innerText = copyTextPanelScss;
	siteScss.innerText = copyTextSiteScss;
	homepageCfm.innerText = copyTextHomepageCfm;
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