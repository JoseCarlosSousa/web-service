export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
