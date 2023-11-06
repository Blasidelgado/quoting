// components/PriceList.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { IPriceList as PriceListType, PriceListItem as PriceListItemType} from '../../../types/priceList';
import { Product } from '../../../types/product';
import PriceListItem from './PriceListItem';

type PriceListProps = {
    selectedList: PriceListType | null;
    products: Product[];
    handleUpdatePrice: (priceListId: string, itemId: string, updatedPrice: number) => void;
    onDelete: (listId: string) => void;
};

export default function PriceList({ selectedList, products, handleUpdatePrice, onDelete }: PriceListProps) {
    const [activeId, setActiveId] = useState(null);

    const handleEdit = (itemId) => {
        setActiveId(itemId);
    }

    return (
        <section className='mb-6'>
            {selectedList ? (
                <>
                    <h2 className='text-2xl font-bold mb-2'>{selectedList.priceListName}</h2>
                    <button className="ml-4 text-red-500" onClick={() => onDelete(selectedList._id)}>
                        Delete
                    </button>
                    <ul>
                        <li>
                            <span>Producto: </span>
                            <span>Precio: </span>
                        </li>
                        {selectedList.prices.map((item) => (
                            <PriceListItem
                                key={item._id}
                                priceList={selectedList}
                                itemId={item._id}
                                item={item}
                                products={products}
                                isEditing={activeId === item._id}
                                handleEdit={handleEdit}
                                handleUpdatePrice={handleUpdatePrice}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <p>Selecciona una lista de precios</p>
            )}
        </section>
    );
}
