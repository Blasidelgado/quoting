import { all } from 'cypress/types/bluebird';
import React from 'react';

export default function SelectPriceList({allLists, selectedId, handleSelectedList }) {

    console.log(allLists);

    return (
        <select defaultValue={selectedId} onChange={(e) => handleSelectedList(e.target.value)}>
            <option value='' hidden>Selecciona una lista</option>
            {allLists.map(list => {
                return <option key={list._id} value={list._id}>{list.priceListName}</option>
            })}
        </select>
    )
};