import React, {useEffect, useState} from "react";
import axios from "axios";
import QuotingForm from "@/components/Quoting/QuotingForm";
import { FaSpinner } from 'react-icons/fa'; // Importing the FaSpinner component from Font Awesome icons
import QuotingList from "@/components/Quoting/QuotingList";

export default function Quoting() {

    const [quotings, setQuotings] = useState([]);
    const [clients, setClients] = useState([]);
    const [priceLists, setPriceLists] = useState([]);
    const [products, setProducts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchQuotings() {
            const quotingsResponse = await axios.get("http://localhost:3000/api/quotings");
            const prevQuotings = quotingsResponse.data;

            if (prevQuotings.success) {

                setQuotings(prevQuotings.quotings);
            } else {
                setQuotings([]);
            }
        }

        async function fetchClients() {
            const clientsResponse = await axios.get("http://localhost:3000/api/clients");
            const prevClients = clientsResponse.data;

            setClients(prevClients)
        }

        async function fetchPriceLists() {
            const priceListsResponse = await axios.get("http://localhost:3000/api/price_lists");
            const prevPriceLists = priceListsResponse.data;

            setPriceLists(prevPriceLists)
        }

        async function fetchProducts() {
            const productsResponse = await axios.get("http://localhost:3000/api/inventory");
            const prevProducts = productsResponse.data;

            setProducts(prevProducts)
        }

        setTimeout(() => setIsLoading(false), 700)

        fetchQuotings();
        fetchClients();
        fetchPriceLists();
        fetchProducts();
    },[])

    function addQuoting(nextQuoting) {
        setQuotings(prevQuotings => ({
            ...prevQuotings, // Spread the previous state
            ...nextQuoting // Spread the new quoting object
        }));
    }

    if(isLoading) {
        return (
            <div className="loading-overlay">
                <FaSpinner
                    size={150} // You can adjust the size of the spinner
                    color={"#123abc"} // You can specify the color of the spinner
                />
            </div>        
        )
    } else {
        return (
            <>
                <h1 className="my-8">Quoting</h1>
                {isCreating? (
                    <QuotingForm clients={clients} onSubmit={addQuoting}/>
                ) : (
                <>
                <div>
                    <button type="button" onClick={() => setIsCreating(true)}>New Quoting</button>
                </div>
                <QuotingList quotings={quotings} products={products} />
                </>
                )}
            </>
        );
    }
}
