import React, { SetStateAction, useState, ChangeEvent } from "react";
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Product } from "../../../types/product";
import axios from "axios";

type ProductListItemProps = {
    id: string;
    product: Product;
    isEditing: boolean;
    changeEdited: React.Dispatch<SetStateAction<string | null>>;
    handleUpdate: (updatedProduct: Product) => void;
    handleDelete: (productID: string) => void;
};

export default function ProductListItem({ id, product, isEditing, changeEdited, handleUpdate, handleDelete }: ProductListItemProps) {
    const [originalProduct, setOriginalProduct] = useState<Product>(product);
    const [editedProduct, setEditedProduct] = useState<Product>({ ...product });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSave = async () => {
        try {
            await axios.put(`/api/inventory/${id}`, editedProduct);

            setOriginalProduct(editedProduct);
            changeEdited(null);

            handleUpdate(editedProduct);
        } catch (error) {
            console.error('Could not update', error)
        }
    }
    const handleCancel = () => {
        setEditedProduct(originalProduct);
        changeEdited(null);
    }
    const handleDeletion = async (product: Product) => {
        const confirm = window.confirm(`Estas seguro que queres borrar el producto ${product.productName}?`)
        if (confirm) {
            try {
                await axios.delete(`/api/inventory/${id}`);

            // Notify the parent component about the deletion
            handleDelete(id);

            } catch (error) {
                console.error('Error deleting product:', error);
            }
            handleDelete(id);
        }
    }
    return (
        <li className="border-b py-2 flex items-center justify-between">
            {isEditing ? (
                <div className="flex items-center space-x-2">
                    <input
                        className="border p-1"
                        id="editProductName"
                        name="productName"
                        type="text"
                        value={editedProduct.productName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="border p-1"
                        id="editStock"
                        name="stock"
                        type="text"
                        value={editedProduct.stock}
                        onChange={handleInputChange}
                    />
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">{originalProduct.productName}</span>
                    <span className="text-gray-600">{originalProduct.stock} kg.</span>
                </div>
            )}
            <div className="flex items-center space-x-2">
                {isEditing ? (
                    <>
                        <FaSave className="text-green-600 cursor-pointer" onClick={handleSave} />
                        <FaTimesCircle className="text-red-600 cursor-pointer" onClick={handleCancel} />
                    </>
                ) : (
                    <>
                        <FaEdit className="text-blue-600 cursor-pointer" onClick={() => changeEdited(id)} />
                        <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleDeletion(product)} />
                    </>
                )}
            </div>
        </li>
    );
};
