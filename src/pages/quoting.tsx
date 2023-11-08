import React, {useEffect, useState} from "react";
import axios from "axios";
import QuotingForm from "@/components/Quoting/QuotingFirstPhase";
import { FaSpinner } from 'react-icons/fa';
import QuotingList from "@/components/Quoting/QuotingList";
import QuotingFinalPhase from "@/components/Quoting/QuotingFinalPhase";

export enum CreatingPhase {
    "notCreating",
    "firstPhase",
    "secondPhase",
    "confirmPhase"
}


export default function Quoting() {

    const [quotings, setQuotings] = useState([]);
    const [newQuoting, setNewQuoting] = useState({});
    const [clients, setClients] = useState([]);
    const [priceLists, setPriceLists] = useState([]);
    const [products, setProducts] = useState([]);
    const [isCreating, setIsCreating] = useState(CreatingPhase["notCreating"]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittable, setIsSubmittable] = useState(false);

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

    function updateQuoting(nextQuoting) {
        setNewQuoting(prevQuoting => ({
            ...prevQuoting, // Spread the previous state
            ...nextQuoting // Spread the new quoting object
        }));
    }

    async function handleSubmit(nextConcepts) {
        const finalQuoting = {
            ...newQuoting,
            concepts: nextConcepts
        }
        console.log(finalQuoting);
        try {
            const response = await axios.post("http://localhost:3000/api/quotings", finalQuoting);
            const nextQuoting = response.data.quoting;
            setQuotings([
                ...quotings,
                nextQuoting
            ])
        } catch (error) {
            console.error('Could not create quoting', error)
        }
    }

    const handleStatus = () => {
        switch(isCreating) {
            case 0:
                return (
                    <>
                    <div className="my-5">
                    <button type="button" onClick={() => setIsCreating(CreatingPhase["firstPhase"])}>New Quoting</button>
                    </div>
                    <QuotingList quotings={quotings} products={products} priceLists={priceLists} clients={clients} />
                    </>
                );
            case 1:
                return <QuotingForm clients={clients} priceLists={priceLists} onSubmit={updateQuoting} onChange={setIsCreating}/>;
            case 2:
                return <QuotingFinalPhase products={products} onSubmit={handleSubmit} onChange={setIsCreating} />;
            default:
                return null;
        }
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
                {handleStatus()}
                {isSubmittable ? 
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
                Submit Quotation
                </button>
                : null} 
            </>
        );
    }
}
