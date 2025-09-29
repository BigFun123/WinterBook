import React, { useEffect } from "react";
import EditBookable from "./EditBookable";
import Bookable from "./Bookable";

/**
 * Bookables component
 * Displays a list of bookable items.
 */
const Bookables = () => {
    const [items, setItems] = React.useState([]);
    const [editable, setEditable] = React.useState(null);

    useEffect(() => {
        // Fetch bookable items from the API 
        console.log("Fetching bookables...");
        fetchBookables();
    }, []);

    const addBookable = async (type) => {
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
                const result = await fetch(`https://localhost:7139/api/bookables/${type}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(data)
                    });

            } catch (error) {
                console.error(error);
            }

        }
        await addBookable();
        fetchBookables();
    }

    const fetchBookables = async () => {

        const jwt = localStorage.getItem("token");

        try {
            const result = await fetch("https://localhost:7139/api/bookables",
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
                setItems(data);
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
                const result = await fetch(`https://localhost:7139/api/bookables/${id}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "DELETE",
                        body: JSON.stringify(data)
                    });

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
                const result = await fetch(`https://localhost:7139/api/bookables/${id}`,
                    {
                        headers: {
                            ///Authorization: `Bearer ${jwt}`
                            "Content-Type": "application/json",
                        },
                        method: "PUT",
                        body: JSON.stringify(data)
                    });

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
            <h2>My Bookings</h2>
            <ul className="container">
                {items.length === 0 ? (
                    <li>No bookables available.</li>
                ) : (
                        items.map((item) => (
                            <li key={item.id} className="container">
                                <Bookable bookable={item} onSelect={onSelect} onDelete={onDelete}></Bookable>
                            </li>
                    ))
                )}
            </ul>
            <button onClick={() => addBookable("accommodation")} className="button">Book Room</button>
            <button onClick={() => addBookable("car")} className="button">Book Car</button>
        </div>
    );
};

export default Bookables;