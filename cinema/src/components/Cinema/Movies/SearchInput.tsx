import React, { useState } from "react";
import "./SearchInput.css";
import { IRoom } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchInputProps {
  data: IRoom[];
}

const SearchInput: React.FC<SearchInputProps> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IRoom[]>(data);

  const navigate = useNavigate();
  const location = useLocation();

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
        className={query ? "search__input open" : "search__input"}
        type="text"
        placeholder="Search it"
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <ul className="search__list">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="search__item"
              onClick={() => navigate(location.pathname + `?room=${item.roomId}`)}
            >
              {item.roomId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchInput;
