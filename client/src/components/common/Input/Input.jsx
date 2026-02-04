import styles from './Input.module.css';

export default function Input({
  onChange,
  className = '',
  value,
  noDefaultClass = false,
  type,
  ...props
}) {
  const classes = noDefaultClass
    ? className
    : `${styles.defaultInput} ${className}`;

  if (type === 'file') {
    return (
      <input type={type} className={classes} onChange={onChange} {...props} />
    );
  }
  return (
    <input value={value} className={classes} onChange={onChange} {...props} />
  );
}
