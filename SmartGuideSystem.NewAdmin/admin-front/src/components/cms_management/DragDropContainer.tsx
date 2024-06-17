import { observer } from "mobx-react";
import React, { PropsWithChildren,  useState } from "react";
interface Props extends PropsWithChildren {
  dragPlaceHolderText?: string;
  dragFormat: string;
  onDrop?: (dragEvent?: React.DragEvent<HTMLDivElement>) => void;
}
export default observer(function DragDropContainer({
  children,
  dragPlaceHolderText,
  dragFormat,
  onDrop,
}: Props) {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      draggable={false}
      onDragEnter={(ev) => {
        ev.stopPropagation();
        if (
          ev.dataTransfer.types &&
          ev.dataTransfer.types.includes(dragFormat)
        ) {
          setDragging(true);
        }
      }}
      // onDragStartCapture={(ev) => setDragging(true)}
      // onDragEndCapture={(ev) => setDragging(false)}
      className="w-full h-full "
    >
      {dragging ? (
        // <div className="w-full h-full bg-slate-200 p-3 ">
        //   <div className="w-full h-full border-4 border-black/70 border-dashed flex">
        //     <span className="text-3xl font-bold m-auto">
        //       {dragPlaceHolderText}
        //     </span>
        //   </div>
        // </div>

        <DragPlaceHolder
          onClick={() => setDragging(false)}
          placeholder={dragPlaceHolderText ?? ""}
        />
      ) : (
        // <div
        //   className="w-full h-full"
        //   onDragEnter={() => console.log("Enter!!!! in children")}
        //   onDragLeave={(ev) => {
        //     console.log("Leave in children");
        //     ev.stopPropagation();
        //   }}
        // >
        //   {children}
        // </div>
        children
      )}

      <div
        draggable={false}
        onClick={() => {
          if (dragging) {
            setDragging(false);
          }
        }}
        onDrop={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          setDragging(false);
          //alert("Drop to DragDropContaine222r");
          onDrop?.(ev);
        }}
        onDragEnter={(ev) => {
          ev.stopPropagation();
          setDragging(true);
          //console.log("Enter in parent2");
        }}
        onDragLeave={(ev) => {
          ev.stopPropagation();
          setDragging(false);
          //console.log("Leave in parent2");
        }}
        onDragOver={(ev) => {
          if (
            ev.dataTransfer.types &&
            ev.dataTransfer.types.includes(dragFormat)
          ) {
            console.log(
              "file.onDragOver",
              ev.dataTransfer.types,
              ev.dataTransfer.files
            );
            ev.preventDefault();
          }
          //console.log("dragover:", ev.dataTransfer.types);
        }}
        className={`absolute  z-10 top-0 left-0 w-full h-full ${
          dragging ? "" : "pointer-events-none"
        } `}
      />
    </div>
  );

 
});

interface DragPlaceHolderProps {
  placeholder: string;
  onClick: () => void;
}
function DragPlaceHolder({ placeholder, onClick }: DragPlaceHolderProps) {
  return (
    <div
      onClick={onClick}
      draggable={false}
      className="w-full h-full bg-slate-200 p-3 "
    >
      <div className="w-full h-full border-4 border-black/70 border-dashed flex">
        <span className="text-xl font-bold m-auto ">{placeholder}</span>
      </div>
    </div>
  );
}
