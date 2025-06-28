const SelectInput = ({
  id,
  wrapperClassName,
  placeholder,
  options = [],
  stateKey,
  defaultValue,
  ...inputProps
}) => {
  const valueToCompareInitially =  inputProps.value ?? defaultValue
  const selectedIndex = valueToCompareInitially
    ? options.findIndex((option) => option.value === valueToCompareInitially)
    : -1;
  const keyString = (value) => value.replace(" ", "_");
  return (
    <div className={`form__group select_input ${wrapperClassName}`}>
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
            key={`key-${keyString(option.value)}`}
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
