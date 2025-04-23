import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search articles by title..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}