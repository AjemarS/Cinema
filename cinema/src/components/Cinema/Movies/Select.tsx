import React, { useState } from "react";
import "./Select.css";
import { IMovie } from "../../../types";

interface SelectProps {
  selectOption: (e: string) => void;
  options: IMovie[];
}

const Select: React.FC<SelectProps> = ({ options, selectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose a movie");

  const handleOptionClick = (option: IMovie) => {
    selectOption(option._id);
    setSelectedOption(option.title);
    setIsOpen(false);
  };

  return (
    <div
      className={`select ${isOpen ? "open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option._id} onClick={() => handleOptionClick(option)}>
              <div className="options-list__item">
                <img
                  className="options-list__item__img"
                  src={option.image}
                  alt={option.title}
                  height={40}
                />
                <div className="options-list__item__title">{option.title}</div>
                <div className="options-list__item__year">{option.year}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
