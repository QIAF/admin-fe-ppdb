export const Input = (props) => {
  const {
    type,
    className,
    name,
    placeholder,
    value,
    onChange,
    defaultChecked,
    maxLength,
    isRequired,
    accept,
  } = props;
  return (
    <input
      type={type}
      className={className}
      name={name}
      value={value}
      maxLength={maxLength}
      accept={accept}
      required={isRequired}
      onChange={onChange}
      defaultChecked={defaultChecked && defaultChecked}
    />
  );
};
