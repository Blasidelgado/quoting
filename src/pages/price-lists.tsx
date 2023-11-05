import PriceListForm from '@/components/PriceList/PriceListForm';
import SelectPriceList from '@/components/PriceList/SelectPriceList';
import { GetServerSideProps } from 'next';
import React, {useState, useEffect} from 'react';
/** 
 * 1- Dos escenarios iniciales posibles al renderizar la pagina /price-lists.
 * - Mostraremos un boton (muy visible) que diga "Crear nueva lista de precios"
 * - Mostraremos un select que tendra:
 * - Opcion preseleccionada: "Selecciona una lista de precios"
 * - Mostraremos una tabla que relacione productos y precios. vacia hasta que se seleccione una lista
 * - Al presionar el boton, debe desaparecer TODO el contenido y solo quedar el formulario de nuevo producto
 * - El formulario contará con dos botones: CREAR - CANCELAR
 * - Presionar CREAR creará el nuevo producto y volverá la pagina a su estado inicial
 * - Presionar CERRAR solo volverá la pagina a su estado inicial
 * - Al seleccionar una lista, se populará la tabla PRODUCTOS - PRECIOS con informacion
 * - Cada producto podrá ser editar SU PRECIO, pero no podrá ser eliminado.
*/

export default function PriceLists({prevPriceLists, products }) {

  const [priceLists, setPriceLists] = useState(prevPriceLists);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');

  useEffect(() => {
    async function fetchUpdatedLists() {
        const response = await fetch('api/price_lists');
        const data = await response.json();
        const newLists = data.priceLists;

        setPriceLists(newLists);
    } 

    if (!isCreating) {
        fetchUpdatedLists();
    }
  }, [isCreating]);

    function findProductName(prodId) {
      const prod = products.find(prod => {
        return prod._id === prodId;
      })
      return prod.productName
    }

    const selectedList = (function() {
      const selectedList = priceLists.find(list => list._id === selectedListId);

      return selectedList;
    })();

    console.log(selectedList);

    return (
        <>
            <h1 className='text-3xl text-center'>Listas de precios</h1>
            { isCreating ? 
              (
                <PriceListForm priceLists={priceLists} updatePriceLists={setPriceLists} products={products} editHandler={setIsCreating}/>
              ) : (
                <>
                  <button type='button' onClick={() => setIsCreating(true)}>Crear nueva lista</button>
                  <SelectPriceList allLists={priceLists} selectedId={selectedListId} handleSelectedList={setSelectedListId}/>
                    <section className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{selectedList ? selectedList.priceListName : 'Selecciona una lista' }</h2>
                        <ul>
                          <li>
                            <span>Producto: </span>
                            <span>Precio: </span>
                          </li>
                          {selectedList && (selectedList.prices).map(list => {
                            return (
                              <li key={list._id}>
                                <span>{findProductName(list.productId)}</span>
                                <span>{list.price}</span>
                              </li>
                            )
                          }
                          )}
                        </ul>
                    </section>
                </>
              )
            }
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
