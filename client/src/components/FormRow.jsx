const FormRow = ({ type, name, labelText, autoFocus }) => {
  return (
    <div>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        required
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default FormRow;
