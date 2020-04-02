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
    // // in future add drag 
    UL_LIST.removeChild(listItem);
}

const addListItem = (e) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerHTML = LIST_ITEM_CONTENT;
    UL_LIST.appendChild(listItem);  
    document.querySelector('.list-item:last-child .task-delete-icon svg').addEventListener('mousedown', deleteListItem);
}

addListItem();

document.querySelector('.sort-button-wrapper').addEventListener('click', handleSortButtonClick);
document.querySelector('.add-button-wrapper button').addEventListener('mousedown', addListItem);

