import React from 'react';

export const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 font-bold mb-2 ${className}`}
    >
      {children}
    </label>
  );
};