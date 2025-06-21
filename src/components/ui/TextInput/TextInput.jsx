const TextInput = ({
  id,
  wrapperClassName,
  placeholder,
  type,
  stateKey,
  ...inputProps
}) => {
  return (
    <div className={["form__group text_input", wrapperClassName].join(" ")}>
      <input
        key={stateKey}
        type={type}
        id={id}
        name={id}
        className="form__field"
        placeholder={placeholder}
        {...inputProps}
      />
      <label htmlFor={id} className="form__label">
        {placeholder}
      </label>
    </div>
  );
};
export default TextInput;
