interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

// campo de formulario con label y error
function FormField({ label, name, type = 'text', value, onChange, error }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default FormField
