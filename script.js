

let globalList = [];

document.querySelectorAll('.data-structure').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.data-structure').forEach(el => {
            el.classList.remove('active');
            el.classList.add('inactive');
        });
        event.target.classList.add('active');
        event.target.classList.remove('inactive');
        if (event.target.id === 'list') {
            document.getElementById('size-selection').style.display = 'block';
        } else {
            document.getElementById('size-selection').style.display = 'none';
            document.getElementById('boxes-container').innerHTML = '';
            document.getElementById('list-display').innerHTML = '';
            document.getElementById('methods-container').style.display = 'none';
            globalList = [];
        }
    });
});

function generateBoxes() {
    const sizeInput = document.getElementById('size');
    let size = parseInt(sizeInput.value);
    const errorMessage = document.getElementById('error-message');

    if (size > 7) {
        size = 7;
        sizeInput.value = 7;
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }

    globalList = new Array(size).fill('');

    const container = document.getElementById('boxes-container');
    container.innerHTML = '';
    const boxWidth = 100 / size + '%';
    for (let i = 0; i < size; i++) {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';
        boxContainer.style.width = boxWidth;
        
        const box = document.createElement('input');
        box.className = 'box';
        box.type = 'text';
        box.placeholder = `Value ${i + 1}`;
        box.addEventListener('blur', () => checkDataType(box, i));
        
        const dataTypeDisplay = document.createElement('div');
        dataTypeDisplay.className = 'datatype';
        dataTypeDisplay.id = `datatype-${i}`;
        
        boxContainer.appendChild(box);
        boxContainer.appendChild(dataTypeDisplay);
        container.appendChild(boxContainer);
    }

    document.getElementById('list-display').innerHTML = '';
    document.getElementById('methods-container').style.display = 'none';
}

function checkDataType(box, index) {
    const value = box.value;
    let dataType = '';
    if (value.trim() !== '') {
        if (!isNaN(value)) {
            dataType = value.includes('.') ? 'Float' : 'Integer';
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            dataType = 'Boolean';
        } else {
            dataType = 'String';
        }
        globalList[index] = value; 
    } else {
        globalList[index] = ''; 
    }
    document.getElementById(`datatype-${index}`).innerText = dataType;
    displayListNotation();
}

function displayListNotation() {
    const activeStructure = document.querySelector('.data-structure.active');
    if (activeStructure && activeStructure.id === 'list') {
        const allFilled = globalList.every(value => value.trim() !== '');
        const formattedValues = globalList.map(value => {
            if (!isNaN(value)) {
                return value.includes('.') ? parseFloat(value) : parseInt(value);
            } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                return value.toLowerCase() === 'true';
            } else {
                return `"${value}"`;
            }
        });

        if (allFilled) {
            const listDisplay = document.getElementById('list-display');
            listDisplay.innerHTML = `LIST: [${formattedValues.join(', ')}]`;
            displayMethods(globalList);
        } else {
            document.getElementById('list-display').innerHTML = '';
            document.getElementById('methods-container').style.display = 'none';
        }
    }
}

function displayMethods(list) {
    if (list.length > 0) {
        const methodsContainer = document.getElementById('methods-container');
        methodsContainer.style.display = 'block';
        const methodsList = document.getElementById('methods-list');
        methodsList.innerHTML = `
            <li><span>Append:</span> <input type="text" id="append-value" placeholder="Value"><button onclick="appendToList()">Add</button></li>
            <li><span>Extend:</span> <input type="text" id="extend-value" placeholder="Enter Sequence sperated by ','"><button onclick="extendList()">Merge</button></li>
            <li class="insert-method"><span>Insert:</span> <input type="number" id="insert-index" placeholder="Index" min="0" max="${list.length-1}"><input type="text" id="insert-value" placeholder="Value"><button onclick="insertToList()">Add at</button></li>
            <li><span>Remove:</span> <input type="text" id="remove-value" placeholder="Value"><button onclick="removeFromList()">Delete</button></li>
            <li><span>Pop:</span> <span class="description">Remove the last item</span><button onclick="popFromList()">Remove</button></li>
            <li><span>Clear:</span> <span class="description">Empty the entire list</span><button onclick="clearList()">Empty</button></li>
            <li><span>Index:</span> <input type="text" id="index-value" placeholder="Value"><button onclick="indexOfList()">Find</button></li>
            <li><span>Count:</span> <input type="text" id="count-value" placeholder="Value"><button onclick="countInList()">Total</button></li>
            <li><span>Sort:</span> <span class="description">Sorts the list</span><button onclick="sortList('asc')">Ascending</button> <button onclick="sortList('desc')">Descending</button></li>
        `;
    }
}

// 




function appendToList() {
    const value = document.getElementById('append-value').value;
    if (value.trim() !== '' && globalList.length < 10) {
        globalList.push(value);
        updateListDisplay();
    } else if (globalList.length >= 10) {
        alert('Max length of the list is 10');
    }
}

function extendList() {
    const value = document.getElementById('extend-value').value;
    const sequence = value.split(',').map(item => item.trim()).slice(0, 3);
    if (sequence.length > 0 && globalList.length + sequence.length <= 10) {
        globalList.push(...sequence);
        updateListDisplay();
    } else if (globalList.length + sequence.length > 10) {
        alert('Max length of the list is 10');
    }
}

function insertToList() {
    const index = parseInt(document.getElementById('insert-index').value);
    const value = document.getElementById('insert-value').value;
    if (!isNaN(index) && index >= 0 && index <= globalList.length && value.trim() !== '' && globalList.length < 10) {
        globalList.splice(index, 0, value);
        updateListDisplay();
    } else if (globalList.length >= 10) {
        alert('Max length of the list is 10');
    }
}

function removeFromList() {
    const value = document.getElementById('remove-value').value;
    const index = globalList.indexOf(value);
    if (index !== -1) {
        globalList.splice(index, 1);
        updateListDisplay();
    }
}

function popFromList() {
    globalList.pop();
    updateListDisplay();
}

function clearList() {
    globalList = [];
    updateListDisplay();
}

function indexOfList() {
    const value = document.getElementById('index-value').value;
    const index = globalList.indexOf(value);
    alert(`Index of ${value}: ${index}`);
}

function countInList() {
    const value = document.getElementById('count-value').value;
    const count = globalList.filter(item => item === value).length;
    alert(`Count of ${value}: ${count}`);
}

function sortList(order) {
    if (order === 'asc') {
        globalList.sort();
    } else if (order === 'desc') {
        globalList.sort().reverse();
    }
    updateListDisplay();
}

function updateListDisplay() {
    const listDisplay = document.getElementById('list-display');
    const formattedValues = globalList.map(value => {
        if (!isNaN(value)) {
            return value.includes('.') ? parseFloat(value) : parseInt(value);
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            return value.toLowerCase() === 'true';
        } else {
            return `"${value}"`;
        }
    });

    listDisplay.innerHTML = `LIST: [${formattedValues.join(', ')}]`;

    const container = document.getElementById('boxes-container');
    container.innerHTML = '';
    const boxWidth = 100 / globalList.length + '%';
    globalList.forEach((value, index) => {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';
        boxContainer.style.width = boxWidth;
        
        const box = document.createElement('input');
        box.className = 'box';
        box.type = 'text';
        box.value = value;
        box.placeholder = `Value ${index + 1}`;
        box.addEventListener('blur', () => checkDataType(box, index));
        
        const dataTypeDisplay = document.createElement('div');
        dataTypeDisplay.className = 'datatype';
        dataTypeDisplay.id = `datatype-${index}`;
        
        boxContainer.appendChild(box);
        boxContainer.appendChild(dataTypeDisplay);
        container.appendChild(boxContainer);
    });

    
    globalList.forEach((value, index) => checkDataType({ value: value }, index));

    displayMethods(globalList);
}



