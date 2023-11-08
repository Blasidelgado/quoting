import React, {useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";

export default function QuotingSelect({ products, availableProducts, onAdd }) {

  const [isError, setIsError] = useState(false);
  
  // Start productId and stock Refs
  const productRef = useRef(null);
  const quantityRef = useRef(null);

  function handleAdd(e) {
    e.preventDefault();

    // Get productId and stock from fields Ref
    const selectedProduct = productRef.current.value;
    const quantity = parseInt(quantityRef.current.value);

    if (selectedProduct && quantity > 0 && quantity < getProductStock(selectedProduct)) {
      onAdd({ product: selectedProduct, quantity: quantity });
      // Clean fields after succesful registration
      productRef.current.value = "";
      quantityRef.current.value = "";
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  function getProductStock(productId) {
    const product = products.find((product) => product._id === productId);
    return product?.stock;
  }

  return (
    <form className="mb-4 grid grid-cols-3 gap-4" onSubmit={handleAdd}>
      <div className="col-span-2">
        <select
          ref={productRef}
          className="w-full p-2 border rounded"
        >
          <option value="" hidden disabled>
            Select a product
          </option>
          {availableProducts.map((product) => {
            return (
              <option key={product._id} value={product._id}>
                {product.productName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-span-1">
        <input
          ref={quantityRef}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>
      {isError? <ErrorMessage message={'Not enough stock for this product'} /> : null}
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
