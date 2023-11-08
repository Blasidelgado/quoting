import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimesCircle } from 'react-icons/fa';
import { PriceListItem as PriceListItemType } from '../../../types/priceList';
import { Product } from '../../../types/product';
import axios from 'axios';
import { IPriceList } from '../../../types/priceList';

type PriceListItemProps = {
    priceList: IPriceList;
    item: PriceListItemType;
    products: Product[];
    isEditing: boolean;
    handleEdit: (itemId: string | null) => void
};

export default function PriceListItem({
    priceList,
    item,
    products,
    isEditing,
    handleEdit,
}: PriceListItemProps) {
    const [originalPriceListItem, setOriginalPriceListItem] = useState<PriceListItemType>(item);
    const [editedPriceListItem, setEditedPriceListItem] = useState<PriceListItemType>({ ...item });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPriceListItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async (priceListId: string, itemId: string, updatedPrice: number) => {
        try {
            // Find the index of the item to be updated in the prices array
            const itemIndex = priceList.prices.findIndex(item => item._id === itemId);
    
            // Create a new array with the updated item
            const updatedPrices = [
                ...priceList.prices.slice(0, itemIndex),
                { ...priceList.prices[itemIndex], price: updatedPrice },
                ...priceList.prices.slice(itemIndex + 1)
            ];
    
            // Create the updated price list object
            const updatedPriceList = {
                ...priceList,
                prices: updatedPrices
            };
    
            // Send a PUT request to update the price list in the database
            const response = await axios.put(`/api/price_lists/${priceListId}`, updatedPriceList);
            if (response.status === 200) {
                // Update the original price list item data and exit edit mode
                setOriginalPriceListItem(editedPriceListItem);
                handleEdit(null);
            } else {
                throw new Error
            }
            // Notify the parent component about the update if necessary
        } catch (error) {
            setEditedPriceListItem(originalPriceListItem);
            handleEdit(null);
            console.error('Error updating price list item:', error);
        }
    };

    const handleCancel = () => {
        setEditedPriceListItem(originalPriceListItem);
        handleEdit(null);
    };


    function findProductName(prodId: string): string | undefined {
        const prod = products.find((prod) => prod._id === prodId);
        return prod?.productName;
    }

    return (
        <li id={item._id}>
            <span>{findProductName(item.productId)}</span>
            {isEditing ? (
                <>
                    <input id={`${item._id}-price`} name="price" type="text" value={editedPriceListItem.price.toFixed(2)} onChange={handleInputChange} />
                    <FaSave 
                    className="save-button mx-3 cursor-pointer inline-block" 
                    onClick={() => handleSave(priceList._id, item._id, editedPriceListItem.price)} 
                    />
                    <FaTimesCircle className="mx-3 cursor-pointer inline-block" onClick={handleCancel} />
                </>
            ) : (
                <>
                    <span>{originalPriceListItem.price.toFixed(2)}</span>
                    <FaEdit className="edit-button mx-3 cursor-pointer" onClick={() => handleEdit(item._id)} />
                </>
            )}
        </li>
    );
}
