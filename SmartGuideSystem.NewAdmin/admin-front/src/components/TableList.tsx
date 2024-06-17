import { ReactNode } from "react";

interface Props {
  columnNames: Array<string>;
  columnTitles: Array<string>;
  rowItems: Array<any>;
  className?: string;
  selectedRowIndex: number;
  onSelectRow?: (rowIndex: number) => void;
  onDoubleClickRow?: (rowIndex: number) => void;
  columnsForRow?: (rowIndex: number) => ReactNode;
  renderForColumn?: (
    columnData: any,
    columnIndex: number,
    colName?: string
  ) => any;
}
//bg-[#231f20]
export default function TableList({
  columnNames,
  columnTitles,
  rowItems,
  className,
  selectedRowIndex,
  onSelectRow,
  onDoubleClickRow,
  columnsForRow,
  renderForColumn,
}: Props) {
  return (
    <div className={`${className} `}>
      <table className={`table-auto font-bold text-sm w-full text-white  `}>
        <thead className="h-12 border-b border-white/50 mb-8 sticky top-0 bg-[#231f20]  shadow-sm">
          <tr>
            {columnTitles.map((name, index) => (
              <th
                key={index}
                className="text-left pl-4 font-bold tracking-wider min-w-[100px] "
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          onSelect={(e) => {}}
          className="mt-[25px]  border-t before:h-[5px] before:block overflow-y-scroll"
        >
          {rowItems.map((item, index) => (
            <tr
              onClick={() => {
                if (onSelectRow) {
                  onSelectRow(index);
                }
              }}
              onDoubleClick={() => {
                if (onDoubleClickRow) {
                  onDoubleClickRow(index);
                }
              }}
              key={index}
              className={`font-normal h-10 active:bg-[#474042] transition-colors duration-300 hover:active:bg-[#019099]/50 border-b border-slate-50/20 ${
                index === selectedRowIndex
                  ? "bg-sky-900 hover:bg-[#019099]/50"
                  : " hover:bg-[#474042]"
              }`}
            >
              {!columnsForRow &&
                columnNames.map((name, index) => (
                  <td
                    className="text-left pl-4 font-normal text-white/90"
                    key={index}
                  >
                    {renderForColumn
                      ? renderForColumn(item[name], index, name)
                      : item[name]}
                    {/* {item[name]} */}
                  </td>
                ))}
              {columnsForRow && columnsForRow(index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
