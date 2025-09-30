import React, { useState } from 'react';
import './EditBookable.css';

const EditBookable = ({ bookable, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: bookable?.title || '',
        provider: bookable?.provider || '',
        date: bookable?.date ? new Date(bookable.date).toISOString().split("T")[0] : ""
    });

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave({ ...bookable, ...formData });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (

        <form onSubmit={handleSubmit} className="edit-bookable-form">
            <div className="container">
                <div className="hcontainer">                
                    <label htmlFor="name" className="label">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    </div>                
                <div className="hcontainer">
                    <label htmlFor="description" className="label">Provider</label>
                    <textarea
                        id="provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleChange}
                        className="input"
                        disabled
                    />
                </div>                
                <div className="hcontainer">
                    <label htmlFor="objectType" className="label">Type</label>
                    <input
                        id="objectType"
                        name="objectType"
                        type="text"
                        value={bookable?.objectType || ''}
                        className="input"
                        disabled
                    />
                </div>
                <div className="hcontainer">
                    <label htmlFor="date" className="label">Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData?.date || ''}
                        onChange={handleChange}
                        className="input"                        
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </form>

    );
};

export default EditBookable;