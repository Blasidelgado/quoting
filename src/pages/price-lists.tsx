import React, { useEffect, useState } from "react";
import {
IPriceList as PriceListType,
} from "../../types/priceList";
import PriceListForm from "@/components/PriceList/PriceListForm";
import SelectPriceList from "@/components/PriceList/SelectPriceList";
import PriceList from "@/components/PriceList/PriceList";
import axios from "axios";
import { Product } from "../../types/product";


export default function PriceLists() {
    const [priceLists, setPriceLists] = useState<PriceListType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedListId, setSelectedListId] = useState("");

    useEffect(() => {
        async function fetchPriceLists() {
            const priceListsResponse = await axios.get('/api/price_lists');
            const prevPriceLists = priceListsResponse.data;

            setPriceLists(prevPriceLists)
        }

        async function fetchProducts() {
            const productsResponse = await axios.get('/api/inventory');
            const prevProducts = productsResponse.data;

            setProducts(prevProducts)
        }

        fetchPriceLists();
        fetchProducts();
    },[])

    const handleUpdatePrice = (
        priceListId: string,
        itemId: string,
        updatedPrice: number
    ) => {
        const updatedLists = priceLists.map((list) => {
            if (list._id === priceListId) {
                const updatedPrices = list.prices.map((item) =>
                    item._id === itemId ? { ...item, price: updatedPrice } : item
                );
                return { ...list, prices: updatedPrices };
            }
            return list;
        });
        setPriceLists(updatedLists);
    };

    const handleDeleteList = async (priceListId: string) => {
        try {
            await axios.delete(
                `/api/price_lists/${priceListId}`
            );
            const updatedLists = priceLists.filter(
                (list) => list._id !== priceListId
            );
            setPriceLists(updatedLists);
            setSelectedListId("");
        } catch (error) {
            console.error("Error deleting price list:", error);
        }
    };

    const getSelectedList = priceLists.find(
        (list) => list._id === selectedListId
    );

    return (
        <>
            <h1 className="text-3xl text-center">Listas de precios</h1>
            {isCreating ? (
                <PriceListForm
                    priceLists={priceLists}
                    updatePriceLists={setPriceLists}
                    products={products}
                    editHandler={setIsCreating}
                />
            ) : (
                <>
                    <button type="button" onClick={() => setIsCreating(true)}>
                        Crear nueva lista
                    </button>
                    <SelectPriceList
                        allLists={priceLists}
                        selectedId={selectedListId}
                        handleSelectedList={(listId) => {
                            setSelectedListId(listId);
                        }}
                    />
                    {getSelectedList && (
                        <PriceList
                            selectedList={getSelectedList}
                            products={products}
                            handleUpdatePrice={handleUpdatePrice}
                            onDelete={handleDeleteList}
                        />
                    )}
                </>
            )}
        </>
    );
}
