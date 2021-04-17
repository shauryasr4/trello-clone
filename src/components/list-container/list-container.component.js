import React, { useContext } from 'react';
import List from "../list/list.component";
import './list-container.style.css';
import ListContext from "../../util/storage/context";


const ListsContainer = (props) => {
    const lists = useContext(ListContext).contextState || [];

    return (
        <div onDrop={()=>console.log('was dropped')} className="tc-lists-container">
            {lists.map(list => <List key={list.id} list={list} />)}
        </div>
    )
}

export default ListsContainer;