import styles from "./badgeStyles.module.css";
const Badge = ({ label, backgroundColor }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: `var(${backgroundColor})` }}
    >
      <span className="caption">{label}</span>
    </div>
  );
};

export default Badge;
