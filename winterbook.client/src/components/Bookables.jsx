import React, { useCallback, useEffect, useState } from "react";
import EditBookable from "./EditBookable";
import Bookable from "./Bookable";
import { Offerings } from "./Offerings";

const port = import.meta.env.VITE_API_PORT;
const host = import.meta.env.VITE_API_HOST;
const apiUrl = `${host}:${port}/api/bookables`;
const apiUrlOfferings = `${host}:${port}/api/offerings`;

/**
 * Bookables component
 * Displays a list of bookable items.
 */
const Bookables = () => {
    const [bookables, setBookables] = useState([]);
    const [offerings, setOfferings] = useState([]);
    const [editable, setEditable] = useState(null);

    useEffect(() => {
        // Fetch bookable items from the API 
        console.log("Fetching bookables...");
        fetchOfferings();
        fetchBookables();
    }, []);

    const doAddBookable = useCallback((type) => {
        addBookable(type);
    }, []);

    const addBookable = useCallback(async (type) => {
        // Logic to add a new bookable item
        const addBookable = async () => {

            // const jwt = localStorage.getItem("token");
            const data = {
                "Title": "Booking " + Math.ceil(Math.random() * 1024),
                "Provider": "WinterBook",
                "Customer": "Me",
                "Type": type
            }

            try {
                const result = await fetch(`${apiUrl}/${type}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(data)
                    });
                console.log(result);

            } catch (error) {
                console.error(error);
            }

        }
        await addBookable();
        fetchBookables();    
    }, [])

    const fetchOfferings = async () => {
        //const jwt = localStorage.getItem("token");
        try {
            const result = await fetch(`${apiUrlOfferings}`,
                {
                    // headers: { Authorization: `Bearer ${jwt}` },
                    method: "GET",
                    accept: "application/json"
                });

            if (result.ok) {
                const data = await result.json();
                console.log("Offerings:", data);
                // add unique keys
                data.forEach((data, index) => data.key = index);
                setOfferings(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const fetchBookables = async () => {

        //const jwt = localStorage.getItem("token");

        try {
            const result = await fetch(`${apiUrl}`,
                {
                    // headers: { Authorization: `Bearer ${jwt}` },
                    method: "GET",
                    accept: "application/json"
                });

            if (result.ok) {
                const data = await result.json();
                console.log(data);
                // add unique keys
                data.forEach((data, index) => data.key = index);
                setBookables(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const onDelete = async (data) => {
        if (!data) return;

        const deleteBookable = async () => {

            // const jwt = localStorage.getItem("token");
            const id = data.id;

            try {
                const result = await fetch(`${apiUrl}/${id}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "DELETE",
                        body: JSON.stringify(data)
                    });
                console.log(result);

            } catch (error) {
                console.error(error);
            }

        }
        await deleteBookable();
        fetchBookables();
    }

    const onSelect = (item) => {
        console.log("Selected item:", item);
        setEditable(item);
    }

    const handleSave = async (data) => {
        if (!data) return;

        const saveBookable = async () => {

            // const jwt = localStorage.getItem("token");
            const id = data.id;

            try {
                const result = await fetch(`${apiUrl}/${id}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "PUT",
                        body: JSON.stringify(data)
                    });
                console.log(result);

                setEditable(null);

            } catch (error) {
                console.error(error);
            }

        }
        await saveBookable();
        fetchBookables();
    }

    if (editable) return (
        <EditBookable bookable={editable} onSave={handleSave} onCancel={() => setEditable(null)} />
    );

    return (
        <div className="bookables">
            <Offerings addBookable={doAddBookable} offerings={offerings} />
            <h2>My Bookings (Click to edit)</h2>
            <ul className="container">
                {bookables.length === 0 ? (
                    <li>No bookables available.</li>
                ) : (
                        bookables.map((item) => (
                            <li key={item.id} className="container">
                                <Bookable bookable={item} onSelect={onSelect} onDelete={onDelete}></Bookable>
                            </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Bookables;