import React from 'react';

const PageListDropdown = ({ pages, handleChange }) => {
  if (!Array.isArray(pages)) {
    return "Not an array"; 
  }
  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>Select a page</option>
      {pages.map((page) => (
        <option key={page.id} value={page.id}>{page.name}</option>
      ))}
    </select>
  );
};

export default PageListDropdown;
