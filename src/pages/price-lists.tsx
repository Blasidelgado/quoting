import React, { useState } from "react";
import {
    IPriceList,
    IPriceList as PriceListType,
} from "../../types/priceList";
import PriceListForm from "@/components/PriceList/PriceListForm";
import SelectPriceList from "@/components/PriceList/SelectPriceList";
import PriceList from "@/components/PriceList/PriceList";
import axios from "axios";
import { Product } from "../../types/product";

interface PriceListsProps {
    products: Product[];
    prevPriceLists: IPriceList[];
}

export default function PriceLists({ prevPriceLists, products } : PriceListsProps) {
    const [priceLists, setPriceLists] = useState<PriceListType[]>(prevPriceLists);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedListId, setSelectedListId] = useState("");

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

export const getServerSideProps = async () => {

    const BASE_URL = process.env.NODE_ENV === "production" ? process.env.VERCEL_URL : 'http://localhost:3000';

    try {
        const listsResponse = await fetch(`${BASE_URL}/api/price_lists`);
        const priceLists = await listsResponse.json();

        const productsResponse = await fetch(`${BASE_URL}/api/inventory`);
        const products = await productsResponse.json();

        return {
            props: {
                products,
                prevPriceLists: priceLists,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                products: [],
                prevPriceLists: [],
            },
        };
    }
};
