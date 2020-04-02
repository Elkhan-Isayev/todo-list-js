const TOP_SORT_ICON         = 
`
<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg" id="polygon-top">
    <rect x="5" y="15" width="2.5" height="12.5" transform="rotate(-180 5 15)"/>
    <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)"/>
    <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)"/>
    <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)"/>
    <path d="M3.75 6.55671e-07L6.99759 4.6875L0.502404 4.6875L3.75 6.55671e-07Z"/>
</svg>
`;
const BOTTOM_SORT_ICON      = 
`
<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg%22%3E" id="polygon-bottom">
    <rect x="2.5" width="2.5" height="12.5"/>
    <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)"/>
    <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)"/>
    <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)"/>
    <path d="M3.75 15L0.502405 10.3125L6.9976 10.3125L3.75 15Z"/>
</svg> 
`;
const LIST_ITEM_CONTENT     = 
`
<div class="list-item-content-wrapper">
    <div class="drag-icon-wrapper">
        <span class="drag-icon">&#8759;</span>
    </div>
    <div class="task-input-wrapper">
        <input type="text" class="task-input">
    </div>
    <div class="task-delete-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4" fill="none" class="circle"/>
            <path d="M6 6L14 14" stroke="#C4C4C4"/>
            <path d="M6 14L14 6" stroke="#C4C4C4"/>
        </svg>
    </div>
</div>
`;

const BOTTOM_SORT_BUTTON    = 'typeBottom';
const TOP_SORT_BUTTON       = 'typeTop';

const SVG_WRAPPER           = document.querySelector('.sort-button-wrapper');
const UL_LIST               = document.querySelector('ul');