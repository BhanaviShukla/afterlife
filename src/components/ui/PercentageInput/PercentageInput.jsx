"use client";
import { ErrorMessage } from "@/components";
import { useDebouncedCallback } from "@/utils/hooks";
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";

const PercentageInput = ({
  value = 50,
  onChange,
  label = "Allocation",
  minValue = 10,
  error = false,
  errorMessage = undefined,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const debouncedOnChange = useDebouncedCallback(onChange, 1000);
  const containerRef = useRef(null);

  // Generate options from 10% to 100%
  const options = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1) * 10,
    label: `${(i + 1) * 10}%`,
  }));

  const handleInputChange = (inputValue) => {
    const numericValue = parseInt(inputValue.replace("%", ""), 10);
    if (
      !isNaN(numericValue) &&
      numericValue >= minValue &&
      numericValue <= 100
    ) {
      setSelectedValue(numericValue);
      onChange(numericValue);
    }
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedValue(selectedOption.value);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newValue =
      e.deltaY < 0
        ? Math.min(selectedValue + 10, 100)
        : Math.max(selectedValue - 10, minValue);

    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (value !== selectedValue && selectedValue)
      debouncedOnChange(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        element.removeEventListener("wheel", handleWheel);
      };
    }
  }, [selectedValue]);

  return (
    <div className="form__group flex flex-col w-[150px]">
      {label && (
        <label className="caption text-n300 leading-none transition-all duration-300">
          {label}
        </label>
      )}
      <div
        ref={containerRef}
        className={`relative flex items-center border-b ${
          error ? "border-status-d300" : "border-n300"
        } hover:${
          error ? "border-status-d100" : "border-n300"
        } transition-colors duration-300`}
      >
        <Select
          options={options}
          value={{ value: selectedValue, label: `${selectedValue}%` }}
          onChange={handleChange}
          onInputChange={handleInputChange}
          menuPlacement="auto"
          isClearable={false}
          isSearchable={true}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "14px",
              border: "none",
              boxShadow: "none",
              fontSize: "14px",
              padding: 0,
              backgroundColor: "transparent",
            }),
            valueContainer: (base) => ({
              ...base,
              padding: "0 4px",
            }),
            singleValue: (base) => ({
              ...base,
              color: "var(--colour-n400)",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: "0px 4px",
            }),
            indicatorSeparator: () => null,
            menu: (base) => ({
              ...base,
              zIndex: 10,
              backgroundColor: "var(--colour-white)",
            }),
            option: (base, state) => ({
              ...base,
              color: state.isSelected
                ? "var(--colour-g400)"
                : "var(--colour-n500)",
              backgroundColor: state.isSelected
                ? "var(--colour-g0)"
                : "transparent",
              "&:hover": {
                backgroundColor: "var(--colour-n100)",
              },
            }),
          }}
        />
        <div className="absolute top-full py-1">
          {error && errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default PercentageInput;
