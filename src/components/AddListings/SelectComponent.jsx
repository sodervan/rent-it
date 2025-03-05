import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";

const SelectComponent = ({
  options,
  value,
  onChange,
  label,
  disabled = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Find selected option label
  const selectedOptionLabel =
    options.find((option) => String(option.value) === String(value))?.label ||
    placeholder;

  return (
    <div ref={selectRef} className="relative w-full" aria-label={label}>
      {/* Select Trigger */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.preventDefault();
          !disabled && setIsOpen(!isOpen);
        }}
        className={`
          w-full flex items-center justify-between 
          border rounded-lg px-4 py-2.5 text-left
          ${
            disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white hover:border-primaryPurple"
          }
          ${isOpen ? "border-primaryPurple ring-2 ring-primaryPurple/20" : "border-gray-300"}
          transition-all duration-200 ease-in-out
        `}
        disabled={disabled}
      >
        <span
          className={`
          ${
            selectedOptionLabel === placeholder
              ? "text-gray-500"
              : "text-gray-800"
          }
        `}
        >
          {selectedOptionLabel}
        </span>
        <IconChevronDown
          size={20}
          className={`
            text-gray-500 transform transition-transform duration-200
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        />
      </motion.button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white
              border border-gray-200 rounded-lg shadow-lg
              max-h-60 overflow-y-auto"
          >
            {options.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ backgroundColor: "#f5f5f5" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    flex items-center justify-between 
                    px-4 py-2.5 cursor-pointer 
                    ${
                      String(value) === String(option.value)
                        ? "bg-primaryPurple/10 text-primaryPurple"
                        : "hover:bg-gray-50"
                    }
                    transition-colors duration-150
                  `}
                >
                  <span>{option.label}</span>
                  {String(value) === String(option.value) && (
                    <IconCheck size={20} className="text-primaryPurple" />
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectComponent;
