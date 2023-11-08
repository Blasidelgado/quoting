import React, { useState } from 'react';
import { IPriceList as PriceListType } from '../../../types/priceList';
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
    };

    return (
        <section className='bg-white p-6 rounded-lg shadow-md mb-6'>
            {selectedList ? (
                <>
                    <h2 className='text-2xl font-bold mb-4'>{selectedList.priceListName}</h2>
                    <button className="text-red-500 hover:underline mb-4" onClick={() => onDelete(selectedList._id)}>
                        Eliminar lista
                    </button>
                    <ul>
                        <li className='font-semibold mb-2'>
                            <span className='mr-4'>Producto</span>
                            <span>Precio</span>
                        </li>
                        {selectedList.prices.map((item) => (
                            <PriceListItem
                                key={item._id}
                                priceList={selectedList}
                                item={item}
                                products={products}
                                isEditing={activeId === item._id}
                                handleEdit={handleEdit}
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
