import React, { useState, ChangeEvent } from 'react';
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Product } from '../../../types/product';
import axios from 'axios';

type ProductRowProps = {
    id: string;
    product: Product;
    isEditing: boolean;
    changeEdited: (productId: string) => void;
    onEdit: (updatedProduct: Product) => void;
    onDelete: (productID: string) => void;
};

const ProductRow: React.FC<ProductRowProps> = ({ id, product, isEditing, changeEdited, onEdit, onDelete }) => {
    const [originalProduct, setOriginalProduct] = useState<Product>(product);
    const [editedProduct, setEditedProduct] = useState<Product>({ ...product });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/inventory/${id}`, editedProduct);
            setOriginalProduct(editedProduct);
            changeEdited(null);
            onEdit(editedProduct);
        } catch (error) {
            console.error('Could not update', error);
        }
    };

    const handleCancel = () => {
        setEditedProduct(originalProduct);
        changeEdited(null);
    };

    const handleDeletion = async () => {
        const confirm = window.confirm(`Are you sure you want to delete the product: ${originalProduct.productName}?`);
        if (confirm) {
            try {
                await axios.delete(`/api/inventory/${id}`);
                onDelete(id);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input className="border p-1" id="editProductName" name="productName" type="text" value={editedProduct.productName} onChange={handleInputChange} />
                ) : (
                    <span className="text-gray-800">{originalProduct.productName}</span>
                )}
            </td>
            <td>
                {isEditing ? (
                    <input className="border p-1" id="editStock" name="stock" type="text" value={editedProduct.stock} onChange={handleInputChange} />
                ) : (
                    <span className="text-gray-600">{originalProduct.stock} kg.</span>
                )}
            </td>
            <td className="flex justify-evenly items-center space-x-2">
                {isEditing ? (
                    <>
                        <FaSave className="text-green-600 cursor-pointer text-4xl" onClick={handleSave} />
                        <FaTimesCircle className="text-red-600 cursor-pointer text-4xl" onClick={handleCancel} />
                    </>
                ) : (
                    <>
                        <FaEdit className="text-blue-600 cursor-pointer text-4xl" onClick={() => changeEdited(id)} />
                        <FaTrash className="text-red-600 cursor-pointer text-4xl" onClick={handleDeletion} />
                    </>
                )}
            </td>
        </tr>
    );
};

export default ProductRow;
