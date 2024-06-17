import { PropsWithChildren } from "react";
import SearchInput3 from "./ui/input/SearchInput3";

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  searchText?: string;
  placeholder?: string;
  visibleSearch?: boolean;
  onChangedSearchText?: (searchText: string) => void;
}

export default function TopTitlePanel({
  title,
  className,
  children,
  searchText,
  placeholder,
  visibleSearch = true,
  onChangedSearchText,
}: Props) {
  return (
    <div className={`${className} bg-[#454344]`}>
      <span className="absolute top-5 left-5 text-2xl font-bold ">{title}</span>
      {visibleSearch && (
        <SearchInput3
          className="absolute bottom-3 left-5 w-[320px]"
          placeholder={placeholder}
          inputText={searchText ?? ""}
          onChange={(text) => {
            onChangedSearchText?.(text);
          }}
        />
      )}
      {children}
    </div>
  );
}
