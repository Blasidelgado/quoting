import React, { SetStateAction, useState } from "react";
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Product } from "../../../types/product";
import axios from "axios";

type ClientListItemProps = {
    id: string;
    product: Product;
    isEditing: boolean;
    changeEdited: React.Dispatch<SetStateAction<null>>;
    handleUpdate: (updatedClient: Product) => void;
    handleDelete: (clientID: string) => void;
};


export default function ProductListItem({ id, product, isEditing, changeEdited, handleUpdate, handleDelete }: ClientListItemProps) {
    const [originalProduct, setOriginalProduct] = useState<Product>(product);
    const [editedProduct, setEditedProduct] = useState<Product>(product);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/inventory/${id}`, editedProduct);

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
    if (isEditing) {
        return (
            <li id={(id).toString()}>
                <input
                    id="editProductName"
                    name="productName" 
                    type="text" 
                    value={editedProduct.productName}
                    onChange={handleInputChange}
                />
                <input
                    id="editStock"
                    name="stock" 
                    type="text" 
                    value={editedProduct.stock}
                    onChange={handleInputChange}
                />
                <FaSave
                    className="save-button mx-3 cursor-pointer inline-block"
                    onClick={handleSave}
                />
                <FaTimesCircle
                    className="mx-3 cursor-pointer inline-block"
                    onClick={handleCancel}
                />
            </li>
        );
    }

    return (
        <li id={id.toString()}>
            <span className="product-name mx-3">{originalProduct.productName}</span>
            <span className="product-stock mx-3">{originalProduct.stock}</span>
            <span className="mx-3 cursor-pointer inline-block">
                <FaEdit 
                    className="edit-button mx-3 cursor-pointer"
                    onClick={() => {
                        changeEdited(id);
                    }}
                />
            </span>
            <span className="mx-3 cursor-pointer inline-block">
                <FaTrash 
                    className="delete-button mx-3 cursor-pointer"
                    onClick={() => {
                        handleDeletion(product)
                    }}
                />
            </span>
        </li>
    );
};
