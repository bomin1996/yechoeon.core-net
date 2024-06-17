export default function LabelFormik({
  name,
  title,
  errors,
  className,
}: {
  name: string;
  title: string;
  errors: string | undefined;
  className?: string;
}) {
  return (
    <label
      htmlFor={name}
      className={`${errors ? "text-red-600" : ""} ${className}`}
    >
      {errors ? `${title} : ${errors}` : title}
    </label>
  );
}

export function LabelFormik2({
  name,
  title,
  errors,
  className,
}: {
  name: string;
  title: string;
  errors: string | undefined;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline space-x-3  ${className}`}>
      <span>{title}</span>
      {errors && <span className="text-red-500 text-sm">({errors})</span>}
    </div>
  );
}
