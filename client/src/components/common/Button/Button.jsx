import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.defaultButton} ${className}`}
    >
      {children}
    </button>
  );
}
