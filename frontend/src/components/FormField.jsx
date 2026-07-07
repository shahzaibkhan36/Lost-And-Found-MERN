export default function FormField({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
  required = false,
  as = "input",
  rows = 3,
  name,
}) {
  const Comp = as === "textarea" ? "textarea" : "input";
  return (
    <div className="text-left">
      {label && (
        <label className="block text-white font-medium mb-2">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
            {icon}
          </span>
        )}
        <Comp
          name={name}
          type={as === "input" ? type : undefined}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={as === "textarea" ? rows : undefined}
          className={`glass-input ${icon ? "pl-11" : ""} ${suffix ? "pr-11" : ""}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
