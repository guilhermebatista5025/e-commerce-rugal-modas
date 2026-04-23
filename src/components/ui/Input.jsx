// src/components/ui/Input.jsx
import styles from './Input.module.css';

export default function Input({
  label,
  id,
  error,
  icon,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={[styles.wrapper, className].join(' ')}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.inputWrap}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {type === 'select' ? (
          <select id={id} className={[styles.input, icon ? styles.withIcon : ''].join(' ')} {...props}>
            {props.children}
          </select>
        ) : type === 'textarea' ? (
          <textarea id={id} className={[styles.input, styles.textarea].join(' ')} {...props} />
        ) : (
          <input
            id={id}
            type={type}
            className={[styles.input, icon ? styles.withIcon : '', error ? styles.hasError : ''].join(' ')}
            {...props}
          />
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
