//  Изменение кнопки сортировки
const changeSortIcon = (sortButtonType) => {
    if(sortButtonType == BOTTOM_SORT_BUTTON) {
        SVG_WRAPPER.innerHTML = TOP_SORT_ICON;
    } 
    else if(sortButtonType == TOP_SORT_BUTTON){
        SVG_WRAPPER.innerHTML = BOTTOM_SORT_ICON;
    }
}

//  Определение типа сортировки (по возрастанию вниз, то return true)
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

//  Возврат массива, где каждый элемент content каждого input-а
const getListContentArray = (inputsList) => {
    const result = [];
    inputsList.forEach(element => { result.push(element.value) });
    return result;
}

//  Размещение отсортированного массива внутри input-ов
const addSortedArray = (inputs, sortedArray) => {
    let i = 0;
    inputs.forEach(element => { element.value = sortedArray[i++]; });
}

//  Обработка нажатия кнопки сортировки  
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

//  Удаление элемента списка
const deleteListItem = (e) => {
    let deleteButton  = e.target.parentElement;
    if(deleteButton.classList.contains('task-delete-icon')) {
        deleteButton = deleteButton.children[0]; 
    }
    const listItem = deleteButton.parentElement.parentElement.parentElement;   
    deleteButton.removeEventListener('mousedown', deleteListItem);
    UL_LIST.removeChild(listItem);
}

//  Добавление элементу списка, которого перемещаем в данный момент, класс dragging
const dragListItemStart = (e) => {
    const dragLi = e.target.parentElement.parentElement;
    dragLi.classList.add('dragging');
}

//  Удаление класса dragging у улемента перемещенного нами
const dragListItemEnd = (e) => {
    const dragLi = e.target.parentElement.parentElement;
    dragLi.classList.remove('dragging');
}

//  Возвращение ближайшего li под clientY. В случае его отсуствия return null
const getDragAfterElement = (clientY) => {
    const draggableListItems = [...UL_LIST.querySelectorAll('.list-item:not(.dragging)')];  //  Список li которые неподвижны
    return draggableListItems.reduce((closest, child) => {                                  //  Начинаем обход массива из li
        const box = child.getBoundingClientRect();                                          //  Получаем прямоугольник li элемента
        const offset = clientY - box.top - box.height / 2;                                  //  Отступ между курсором и серединой li 
        if(offset < 0 && offset > closest.offset) {                                         //  Если курсор находимся над li и li ближайший
            return { offset: offset, element: child }                                       //  То возвращаем новый ближайший элемент
        }
        else {                                                                              //  Если курсор находится на li
            return closest;                                                                 //  Возвращаем предидущий ближайший li
        }
    }, { offset: Number.NEGATIVE_INFINITY });                                               //  Стартовая макс. низкая, ближ. стал первый 
}

//  Обработка перемешения li внутри ul 
const dragOver = (e) => {
    e.preventDefault();                                                                     //  Исправление курсора
    const afterElement = getDragAfterElement(e.clientY).element;                            //  Забираем ближайший элемент
    const draggingItem = document.querySelector('.dragging');                               //  Забираем элемент который сейчас перемещаем
    
    if(afterElement == null) {                                                              //  Если ближайший пустой
        UL_LIST.appendChild(draggingItem);                                                  //  То добавляем li внутрь ul
    }
    else {                                                                                  //  В противном случае
        UL_LIST.insertBefore(draggingItem, afterElement);                                   //  Добавляем li перед ближайшим li
    }
}

//  Добавление li в список
const addListItem = (e) => {
    const listItem = document.createElement('li');                                                  //  Создание li
    listItem.classList.add('list-item');                                                            //  Добавление класса для li
    listItem.innerHTML = LIST_ITEM_CONTENT;                                                         //  Добавление контента          
    listItem.querySelector('.drag-icon-wrapper').setAttribute('draggable', true);                   //  Добавление атрибута иконке сдвига
    listItem.addEventListener('dragstart', dragListItemStart);                                      //  Инициализация обработчика начала сдвига для li
    listItem.addEventListener('dragend', dragListItemEnd);                                          //  Инициализация обработчика конца сдвига для li
    listItem.querySelector('.task-delete-icon svg').addEventListener('mousedown', deleteListItem);  //  Инициализация обработчика кнопки удаления li
    UL_LIST.appendChild(listItem);                                                                  //  Добавление li в ul
}

addListItem();                                                                                      //  Добавление первого пустого li
document.querySelector('.sort-button-wrapper').addEventListener('click', handleSortButtonClick);    //  Добавление обработчика для сортировки
document.querySelector('.add-button-wrapper button').addEventListener('mousedown', addListItem);    //  Добавление обработчика для создания li  
UL_LIST.addEventListener('dragover', dragOver);                                                     //  Добавление обработчика для перемещения внутри ul    