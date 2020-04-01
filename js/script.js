const changeSortIcon = (sortButtonType) => {
    if(sortButtonType == BOTTOM_SORT_BUTTON) {
        SVG_WRAPPER.innerHTML = TOP_SORT_ICON;
    } 
    else if(sortButtonType == TOP_SORT_BUTTON){
        SVG_WRAPPER.innerHTML = BOTTOM_SORT_ICON;
    }
}

const getButtonType = () => {
    const svg = document.querySelector('svg');
    if(svg.id == 'polygon-bottom') {
        changeSortIcon(BOTTOM_SORT_BUTTON);
        return true;
    }
    else {
        changeSortIcon(TOP_SORT_BUTTON);
        return false; 
    }
}

const handleSortButtonClick = (e) => {
    const isBottomSort = getButtonType();
    if(isBottomSort == true) {
        // Отсортировать по алфавиту реверсом
        
    }
    else {
        // Отсортировать по алфавиту обычным способом
    }
}
document.querySelector('.sort-button-wrapper').addEventListener('click', handleSortButtonClick);

const addListItem = (e) => {

}
document.querySelector('.add-button-wrapper button').addEventListener('click', addListItem);

