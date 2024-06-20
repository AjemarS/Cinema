import React, { useState } from "react";
import "./SearchInput.css";
import { IRoom } from "../../../types";

interface SearchRoomInputProps {
  data: IRoom[];
}

const SearchRoomInput: React.FC<SearchRoomInputProps> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IRoom[]>(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    filterData(value);
  };

  const filterData = (query: string) => {
    const filtered = data.filter((item) => item.roomId.includes(query));
    setFilteredData(filtered);
  };
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search it"
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <ul className="search__list">
          {filteredData.map((item, index) => (
            <li key={index} className="search__item">
              {item.roomId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchRoomInput;
