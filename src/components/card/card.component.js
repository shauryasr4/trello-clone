import React, { useContext } from 'react';
import './card.style.css';

import StorageManager from '../../util/storage/storage-manager';
import ListContext from "../../util/storage/context";

const Card = ({ cardDetails }) => {
    const contextSync = useContext(ListContext).contextSync;

    const handleDelete = function () {
        if (!window.confirm('Are you sure you want to delete this card?'))
            return;
        const existingList = StorageManager.getItem('listsData');
        const listId = cardDetails.id.split('-')[0];
        const currentListIndex = existingList.findIndex(lst => lst.id === listId);
        const cardIndex = existingList[currentListIndex].cards.findIndex(card => card.id === cardDetails.id)
        existingList[currentListIndex].cards.splice(cardIndex, 1)
        StorageManager.setItem('listsData', existingList);
        if (typeof contextSync === 'function')
            contextSync();
    }

    const handleDragStart = function (e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', cardDetails.id);
    }

    return (
        <div id={cardDetails.id} className="tc-card" draggable={true}
            onDragStart={handleDragStart}>
            <div className="tc-card__title">
                <span className="tc-card__title__text"> {cardDetails.title} </span>
                <span className="tc-card__title__delete" onClick={handleDelete} />
            </div>
            <div className="tc-card__description">
                {cardDetails.description}
            </div>
        </div>
    )
}

export default Card;
