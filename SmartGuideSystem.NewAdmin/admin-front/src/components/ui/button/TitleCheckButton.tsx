export default function TitleCheckButton({
  isSelected,
  title,
  className,
  onClick,
}: {
  isSelected: boolean;
  title: string;
  className?: string;
  onClick: () => void;
}) {
  const checkText = isSelected ? "✔" : "⬜";

  return (
    <div
      onClick={onClick}
      className={`flex px-2 py-1 rounded-sm cursor-pointer hover:bg-black/5 ${
        isSelected ? "font-bold border-sky-500 border-2 bg-black/20 " : ""
      }  ${className}`}
    >
      <span className="m-auto ">
        {checkText}
        {title}
      </span>
    </div>
  );
}
