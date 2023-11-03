import React, { useState } from "react";
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Product } from "../../../types/product";
import axios from "axios";

type ClientListItemProps = {
    id: string | number;
    product: Product;
    handleUpdate: (updatedClient: Product) => void;
    handleDelete: (clientID: string) => void;
};


export default function ProductListItem({ id, product, handleUpdate, handleDelete }: ClientListItemProps) {
    const [originalProduct, setOriginalClient] = useState<Product>(product);
    const [editedProduct, setEditedClient] = useState<Product>(product);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = () => {}
    const handleSave = () => {}
    const handleCancel = () => {}
    const handleDeletion = (product: Product) => {}

    if (isEditing) {
        return (
            <li id={(id).toString()}>
                <input
                    id="editClientName"
                    name="clientName" 
                    type="text" 
                    value={editedProduct.productName}
                    onChange={handleInputChange}
                />
                <input
                    id="editCUIT"
                    name="CUIT" 
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
            <span className="client-name mx-3">{originalProduct.productName}</span>
            <span className="client-CUIT mx-3">{originalProduct.stock}</span>
            <span className="mx-3 cursor-pointer inline-block">
                <FaEdit 
                    className="edit-button mx-3 cursor-pointer"
                    onClick={() => {
                        setIsEditing(true);
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
