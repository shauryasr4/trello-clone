import React, { useContext } from 'react';
import Card from '../card/card.component.js';
import './list.style.css';

import StorageManager from '../../util/storage/storage-manager';
import BasicUtils from '../../util/basic-utils.js';
import ListContext from "../../util/storage/context";

const List = ({ list }) => {
    const contextSync = useContext(ListContext).contextSync;

    const constructCardObject = function ({ title, desc }) {
        return {
            id: `${list.id}-${BasicUtils.generateId()}`,
            title: title,
            description: desc,
        }
    }

    const getInput = function () {
        const title = prompt("Please enter the list name", "Sample Card Title");
        const desc = prompt("Please enter the card description", "Sample Card Desc");
        if (!title || !desc)
            return
        return { title, desc }
    }

    const handleAddCard = function () {
        const input = getInput();
        if (!input)
            return;
        const existingList = StorageManager.getItem('listsData');
        const currentListIndex = existingList.findIndex(lst => lst.id === list.id);
        existingList[currentListIndex].cards.push(constructCardObject(input))
        StorageManager.setItem('listsData', existingList);
        if (typeof contextSync === 'function')
            contextSync();
    }

    const handleDelete = function () {
        if (!window.confirm('Are you sure you want to delete the list and its cards?'))
            return;
        const existingList = StorageManager.getItem('listsData');
        const currentListIndex = existingList.findIndex(lst => lst.id === list.id);
        existingList.splice(currentListIndex, 1)
        StorageManager.setItem('listsData', existingList);
        if (typeof contextSync === 'function')
            contextSync();
    }

    const handleCardDrop = function (e) {
        const cardId = e.dataTransfer.getData("text");
        const existingList = StorageManager.getItem('listsData');
        const oldListId = cardId.split('-')[0];
        //REMOVE FROM OLD LIST
        const oldListIndex = existingList.findIndex(lst => lst.id === oldListId);
        const oldCardIndex = existingList[oldListIndex].cards.findIndex(card => card.id === cardId)
        const droppedCard = existingList[oldListIndex].cards.splice(oldCardIndex, 1)[0]
        //ADD TO NEW LIST
        const newListIndex = existingList.findIndex(lst => lst.id === list.id);
        existingList[newListIndex].cards.push({ ...droppedCard, id: `${list.id}-${droppedCard.id.split('-')[1]}` })
        //SET
        StorageManager.setItem('listsData', existingList);
        if (typeof contextSync === 'function')
            contextSync();
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <div className="tc-list"
            onDrop={handleCardDrop}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
        >
            <div className="tc-list__title">
                <span className="tc-list__title__text"> {list.title} </span>
                <span className="tc-list__title__delete" onClick={handleDelete} />
            </div>
            <div className="tc-list__cards-container">
                {
                    list.cards.map(cardObject => {
                        return (
                            <Card key={cardObject.id} id={cardObject.id} cardDetails={cardObject} />
                        )
                    })
                }
            </div>
            <button onClick={handleAddCard} className="tc-list__add-card-btn">
                ADD CARD
            </button>
        </div>
    )
}

export default List;