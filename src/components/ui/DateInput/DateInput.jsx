const TextInput = ({
  id,
  wrapperClassName,
  placeholder,
  type,
  ...inputProps
}) => {
  return (
    <div className={`form__group date_input ${wrapperClassName}`}>
      <input
        type={type}
        id={id}
        className="form__field"
        placeholder={placeholder}
        {...inputProps}
      />
      <label for={id} className="form__label">
        {placeholder}
      </label>
    </div>
  );
};
export default TextInput;
