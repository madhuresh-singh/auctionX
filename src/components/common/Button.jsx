function Button({ children, onClick, disabled = false, type = 'button', variant = 'primary' }) {
  return (
    <button
      className={`button button-${variant}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button