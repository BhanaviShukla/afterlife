const Selector = ({
  id,
  isSelected,
  onToggleSelect,
  width = 16,
  height = 16,
}) => {
  return (
    <label htmlFor={id} className={`selector`} style={{ width, height }}>
      <input
        type={"checkbox"}
        id={id}
        name={id}
        className="selector__input"
        checked={isSelected}
        onChange={onToggleSelect}
      />
      {""}
      <span style={{ width, height }} className="selector__checkmark" />
    </label>
  );
};
export default Selector;
