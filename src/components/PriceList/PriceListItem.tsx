import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimesCircle } from 'react-icons/fa';
import { PriceListItem as PriceListItemType } from '../../../types/priceList';
import { Product } from '../../../types/product';
import axios from 'axios';
import { IPriceList } from '../../../types/priceList';

type PriceListItemProps = {
    priceList: IPriceList;
    item: any;
    products: Product[];
    isEditing: boolean;
    handleEdit: (itemId: string | null) => void;
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
                throw new Error();
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
        <tr id={item._id}>
            <td>
                <span className="text-gray-800">{findProductName(item.productId)}</span>
            </td>
            <td>
                {isEditing ? (
                    <input 
                    id={`${item._id}-price`}
                    className="border p-1" 
                    name="price" 
                    type="text" 
                    value={editedPriceListItem.price} 
                    onChange={handleInputChange} 
                    />
                ) : (
                    <span className="text-gray-600">$ {originalPriceListItem.price}</span>
                )}
            </td>
            <td className="flex justify-evenly items-center space-x-2">
                {isEditing ? (
                    <>
                        <FaSave 
                        className="text-green-600 cursor-pointer text-4xl" 
                        onClick={() => handleSave(priceList._id, item._id, editedPriceListItem.price)}
                        />
                        <FaTimesCircle 
                        className="text-red-600 cursor-pointer text-4xl" 
                        onClick={handleCancel} 
                        />
                    </>
                ) : (
                    <>
                        <FaEdit className="text-blue-600 cursor-pointer text-4xl" 
                                onClick={() => handleEdit(item._id)}
                        />
                    </>
                )}
            </td>
        </tr>
    );
}
