const SelectInput = ({
  id,
  wrapperClassName,
  placeholder,
  options = [],
  stateKey,
  ...inputProps
}) => {
  const selectedIndex = inputProps.value
    ? options.findIndex((option) => option.value === inputProps.value)
    : -1;
  return (
    <div className={`form__group ${wrapperClassName}`}>
      <select
        key={stateKey || id}
        id={id}
        name={id}
        className="form__field"
        placeholder={placeholder}
        {...inputProps}
      >
        <option value={""}>{""}</option>
        {options.map((option, index) => (
          <option
            key={`key-${option.value.join("_")}`}
            value={option.value}
            selected={index === selectedIndex}
          >
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className="form__label">
        {placeholder}
      </label>
    </div>
  );
};
export default SelectInput;
