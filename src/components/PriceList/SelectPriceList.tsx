import React from 'react';

export default function SelectPriceList({ allLists, selectedId, handleSelectedList }) {
    return (
        <select
            defaultValue={selectedId}
            onChange={(e) => handleSelectedList(e.target.value)}
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        >
            <option value='' hidden>Selecciona una lista</option>
            {allLists && allLists.map(list => {
                return <option key={list._id} value={list._id}>{list.priceListName}</option>
            })}
        </select>
    );
}
