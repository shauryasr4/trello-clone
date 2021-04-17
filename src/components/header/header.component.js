import React, { useContext } from 'react';
import './header.style.css';

import StorageManager from '../../util/storage/storage-manager';
import BasicUtils from '../../util/basic-utils.js';

import ListContext from "../../util/storage/context";

const Header = (props) => {
    const contextSync = useContext(ListContext).contextSync;

    const handleAddList = function () {
        const title = prompt("Please enter the list name", "Sample Title");
        if (!title)
            return;
        const listObject = {
            id: BasicUtils.generateId(),
            title: title,
            cards: [],
        }
        const existingList = StorageManager.getItem('listsData');
        existingList.push(listObject);
        StorageManager.setItem('listsData', existingList);
        if (typeof contextSync === 'function')
            contextSync();
    }
    
    return (
        <div className="tc-header">
            TRELLO CLONE
            <button onClick={handleAddList} className="tc-header__add-list-btn">
                ADD LIST
            </button>
        </div>
    )
}

export default Header;
