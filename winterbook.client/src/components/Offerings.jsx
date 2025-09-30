import React from 'react';

export const Offerings = ({ addBookable, offerings }) => {

    return (
        <div>
            <h3>Click an Offering to book</h3>
            <div className="offerings">
            {offerings.map((offering) => (
                <div key={offering.key}>
                    <button onClick={()=>addBookable(offering.objectType)} >
                        <h3>{offering.title} ({offering.objectType})</h3>
                        <p>Provided by: {offering.provider}</p>
                    </button>
                </div>
            ))}
            </div>
        </div>
    )
}