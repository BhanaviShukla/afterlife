"use client";
import Select, { components } from "react-select";
import IconPencil from "../Icons/Controls/edit-pencil.svg";

const SelectLabel = ({ children, ...props }) => {
  const { onEdit } = props?.selectProps || {};
  return (
    <components.Control {...props}>
      <span
        style={{ display: "inline-flex" }}
        onMouseDown={onEdit}
        role="button"
        tabIndex={1}
      >
        <IconPencil />
      </span>
      {children}
    </components.Control>
  );
};

const EditableSelectInput = ({
  id,
  wrapperClassName,
  options = [],
  stateKey,
  onEdit,
  isSearchable = false,
  onChange,
  ...inputProps
}) => {
  console.log("EDITABLE SELECT");
  const selectedIndex = inputProps.value
    ? options.findIndex((option) => option.value === inputProps.value)
    : -1;

  const handleChange = (selectedOption) => {
    onChange(id, selectedOption.value);
  };
  return (
    <div className={`form__group ${wrapperClassName}`}>
      <Select
        id={id}
        name={id}
        options={options}
        unstyled
        className="form__field"
        classNamePrefix="form__field_select"
        isSearchable={isSearchable}
        {...(typeof onEdit !== "undefined" && {
          components: { Control: SelectLabel },
        })}
        onEdit={onEdit}
        {...inputProps}
        {...(onChange && {
          onChange: handleChange,
          value: selectedIndex ? options[selectedIndex] : undefined,
        })}
      />
    </div>
  );
};
export default EditableSelectInput;
