import React, { useEffect, useState } from "react";

export default function SelectedProductsList({ concepts, products, onRemove }) {
  const [currentConcepts, setCurrentConcepts] = useState(concepts);

  useEffect(() => {
    setCurrentConcepts(concepts);
  }, [concepts]);

  function getProductName(productId) {
    const product = products.find((product) => product._id === productId);
    return product ? product.productName : "";
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Conceptos:</h2>
      <ul>
        {currentConcepts &&
          currentConcepts.map((concept) => {
            return (
              <li key={concept.product} className="flex flex-col md:flex-row md:flex-wrap items-center my-4">
                  <span className="mr-2 font-medium">{getProductName(concept.product)}</span>
                  <span className="text-gray-600">Cantidad: {concept.quantity}</span>
                <button
                  type="button"
                  onClick={() => onRemove(concept.product)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
