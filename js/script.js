const changeSortIcon = (sortButtonType) => {
    if(sortButtonType == BOTTOM_SORT_BUTTON) {
        SVG_WRAPPER.innerHTML = TOP_SORT_ICON;
    } 
    else if(sortButtonType == TOP_SORT_BUTTON){
        SVG_WRAPPER.innerHTML = BOTTOM_SORT_ICON;
    }
}

const getButtonType = () => {
    const svg = document.querySelector('.sort-button-wrapper svg');
    if(svg.id == 'polygon-bottom') {
        changeSortIcon(BOTTOM_SORT_BUTTON);
        return true;
    }
    else {
        changeSortIcon(TOP_SORT_BUTTON);
        return false; 
    }
}

const getListContentArray = (inputsList) => {
    const result = [];
    inputsList.forEach(element => { result.push(element.value) });
    return result;
}

const addSortedArray = (inputs, sortedArray) => {
    let i = 0;
    inputs.forEach(element => { element.value = sortedArray[i++]; });
}

const handleSortButtonClick = (e) => {
    const inputs        = document.querySelectorAll('.task-input-wrapper input');
    const isBottomSort  = getButtonType();
    const contentArray  = (getListContentArray(inputs)).sort();
    if(isBottomSort == true) {
        addSortedArray(inputs, contentArray.reverse());
    }
    else {
        addSortedArray(inputs, contentArray);
    }
}

const deleteListItem = (e) => {
    let deleteButton  = e.target.parentElement;
    if(deleteButton.classList.contains('task-delete-icon')) {
        deleteButton = deleteButton.children[0]; 
    }
    const listItem = deleteButton.parentElement.parentElement.parentElement;   
    deleteButton.removeEventListener('mousedown', deleteListItem);
    UL_LIST.removeChild(listItem);
}


const dragListItemStart = (e) => {
    const dragLi = e.target.parentElement.parentElement;
    dragLi.classList.add('dragging');
}

const dragListItemEnd = (e) => {
    const dragLi = e.target.parentElement.parentElement;
    dragLi.classList.remove('dragging');
}

const getDragAfterElement = (clientY) => {
    const draggableListItems = [...UL_LIST.querySelectorAll('li:not(.dragging)')];  // Список li которые неподвижны
    return draggableListItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect();                                  // Получаем прямоугольник li элемента
        const offset = clientY - box.top - box.height / 2;                                // Отступ между курсором и серединой li 
        if(offset < 0 && offset > closest.offset) {                                 // Если курсор находимся над li
            return { offset: offset, element: child }                               // То возвращаем новый ближайший элемент
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY });
}

const dragOver = (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(e.clientY).element;
    const draggingItem = document.querySelector('.dragging');
    
    if(afterElement == null) {
        UL_LIST.appendChild(draggingItem);
    }
    else {
        UL_LIST.insertBefore(draggingItem, afterElement);
    }
}

const addListItem = (e) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerHTML = LIST_ITEM_CONTENT;
    listItem.querySelector('.drag-icon-wrapper').setAttribute('draggable', true);
    listItem.addEventListener('dragstart', dragListItemStart);
    listItem.addEventListener('dragend', dragListItemEnd);
    listItem.querySelector('.task-delete-icon svg').addEventListener('mousedown', deleteListItem);
    UL_LIST.appendChild(listItem);  
}

addListItem();

document.querySelector('.sort-button-wrapper').addEventListener('click', handleSortButtonClick);
document.querySelector('.add-button-wrapper button').addEventListener('mousedown', addListItem);

UL_LIST.addEventListener('dragover', dragOver);