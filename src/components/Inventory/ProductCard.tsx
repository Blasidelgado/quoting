import React, {ChangeEvent, useEffect, useState} from 'react';
import { Product } from '../../../types/product';
import { FaEdit, FaSave, FaTimesCircle, FaTrash } from 'react-icons/fa';
import axios from 'axios';

type ProductCardProps = {
    product: Product;
    onEdit: (productId) => void;
    onDelete: (productId) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({product, onEdit, onDelete }) => {
    
    const [originalProduct, setOriginalProduct] = useState<Product>(product);
    const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setOriginalProduct(product);
    }, [product]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/inventory/${product?._id}`, editedProduct);
            setOriginalProduct(editedProduct);
            onEdit(editedProduct);
            setIsEditing(false);
        } catch (error) {
            console.error('Could not update', error);
        }
    };

    const handleCancel = () => {
        setEditedProduct(originalProduct);
        setIsEditing(false);
    };

    const handleDeletion = async () => {
        const confirm = window.confirm(`Are you sure you want to delete the product: ${originalProduct.productName}?`);
        if (confirm) {
            try {
                await axios.delete(`/api/inventory/${product?._id}`);
                onDelete(product?._id);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    
    if (!product) {
        return null;
    }
    
    if (isEditing) {
        return (
            <div className="border p-4 rounded shadow">
                <input className="text-xl font-bold mb-2 border p-1 block" id="editProductName" name="productName" type="text" value={editedProduct.productName} onChange={handleInputChange} />
                <input className="border p-1 mb-2 block" id="editStock" name="stock" type="text" value={editedProduct.stock} onChange={handleInputChange} />
                <div className="flex space-x-2">
                    <FaSave className="text-green-600 cursor-pointer text-4xl" onClick={handleSave} />
                    <FaTimesCircle className="text-red-600 cursor-pointer text-4xl" onClick={handleCancel} />
                </div>
            </div>
        )
    }
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{originalProduct.productName}</h3>
            <p className="text-gray-700 mb-4">Stock: {originalProduct.stock} kg.</p>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center space-x-2">
                    <FaEdit className="text-green-600 cursor-pointer text-4xl" onClick={() => setIsEditing(true)} />
                    <FaTrash className="text-red-600 cursor-pointer text-4xl" onClick={handleDeletion} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
