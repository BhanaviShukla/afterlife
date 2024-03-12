const SelectInput = ({
  id,
  wrapperClassName,
  placeholder,
  options = [],
  ...inputProps
}) => {
  return (
    <div className={`form__group ${wrapperClassName}`}>
      <select
        id={id}
        name={id}
        className="form__field"
        placeholder={placeholder}
        {...inputProps}
      >
        <option value={""}>{""}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
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
