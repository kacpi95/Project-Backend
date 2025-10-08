import styles from './Input.module.css';

export default function Input({
  onChange,
  className = '',
  value,
  noDefaultClass = false,
  ...props
}) {
  return (
    <input
      value={value}
      className={
        noDefaultClass ? className : `${styles.defaultInput} ${className}`
      }
      onChange={onChange}
      {...props}
    />
  );
}
