import React, { useState } from 'react';
import SelectedProductsList from './SelectedProductsList';
import { CreatingPhase } from '@/pages/quoting';
import QuotingSelect from './QuotingSelect';


export default function QuotingFinalPhase({ products, onSubmit, onChange }) {
  const [concepts, setConcepts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState(products);


  function handleConceptSelect(concept) {
    setConcepts([
      ...concepts, 
      concept
    ]);
    setAvailableProducts(availableProducts.filter(product => product._id !== concept.product))
  }

  function handleConceptRemove(productId) {
    const removedProduct = products.find(product => product._id === productId)
    setConcepts(concepts.filter(concept => concept.product !== productId));
    setAvailableProducts([...availableProducts, removedProduct])
  }

  function handleSubmit() {
    if (concepts.length) {
      onSubmit(concepts);
      onChange(CreatingPhase.notCreating);
    } else {
      setAvailableProducts(products);
      setConcepts([]);
    }
  }

  return (
    <div className="max-w-lg mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-medium mb-4">Select Products and Quantities</h2>
      <QuotingSelect products={products} availableProducts={availableProducts} onAdd={handleConceptSelect} />
      <SelectedProductsList concepts={concepts} products={products} onRemove={handleConceptRemove}/>
      <div className='flex justify-around'>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          Submit Concepts
        </button>
        <button onClick={() => onChange(CreatingPhase["firstPhase"])} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4">
          Go back
        </button>
      </div>
    </div>
  );
}
