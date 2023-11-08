import React, {useState} from 'react';
import { Product } from '../../../types/product';
import ProductRow from './ProductRow';

type ProductTableProps = {
    products: Product[];
    onEdit: (updatedProduct: Product) => void;
    onDelete: (productId: string) => void;
};


const ProductsTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleEdit = (productId: string) => {
        setActiveId(productId);
    };

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className='text-left'>Product</th>
                    <th className='text-left'>Stock</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <ProductRow
                        key={product._id}
                        id={product._id}
                        isEditing={activeId === product._id}
                        changeEdited={handleEdit}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
