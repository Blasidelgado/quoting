import PriceListForm from '@/components/PriceList/PriceListForm';
import { GetServerSideProps } from 'next';
import React, {useState, useEffect} from 'react';

export default function PriceLists({ prevPriceLists, products }) {

  console.log(prevPriceLists);

    const [priceLists, setPriceLists] = useState(prevPriceLists);

    function findProductName(prodId) {
      const prod = products.find(prod => {
        return prod._id === prodId;
      })
      return prod.productName
    }

    return (
        <>
            <h1 className='text-3xl text-center'>Listas de precios</h1>
            <PriceListForm products={products} />
            <ul className="my-10">
              {priceLists.map(list => (
                  <div key={list._id} className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{list.priceListName}</h2>
                      <ul>
                          {list.prices.map(prod => (
                              <li key={prod._id} className="flex justify-between items-center py-2 border-b">
                                  <span className="text-lg">{findProductName(prod.productId)}</span>
                                  <span className="text-lg">${prod.price.toFixed(2)}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
            </ul>

        </>
    )
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const listsResponse = await fetch('http://localhost:3000/api/price_lists');
    const {priceLists} = await listsResponse.json();

    const productsResponse = await fetch('http://localhost:3000/api/products');
    const products = await productsResponse.json();

    return {
      props: {
        products,
        prevPriceLists: priceLists
    },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { products: [] },
    };
  }
};
