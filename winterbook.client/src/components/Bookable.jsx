import React from 'react';

const Bookable = ({ bookable, onSelect, onDelete }) => {

  return (
    <div className="bookable">
          <button onClick={() => onSelect && onSelect(bookable)} className="bookablecard">
              <div>{bookable.title}</div>
              <div>{bookable.objectType}</div>
              <div>{bookable.provider}</div>
              <div>{bookable.date}</div>
          </button>
          <button onClick={() => onDelete && onDelete(bookable)}>X</button>
    </div>
  );
}

export default Bookable;