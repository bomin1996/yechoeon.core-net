import { observer } from "mobx-react";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";
// import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import { ISGUser } from "../../../../../shares/ISGUser";

// const _items = ["A", "B", "C", "D", "E", "F"];

interface Props {
  className?: string;
  //srcItems: Array<BaseSeatingPlaceViewModel>;
  viewModel: SeatingChartViewModel;
}

interface Pos {
  x: number;
  y: number;
}

export default observer(function ExchangeNodePosition({
  className,
  viewModel,
}: Props) {
  const handleDragStart: OnDragStartResponder = (start, provided) => {};
  const handleDragUpdate: OnDragUpdateResponder = (start, provided) => {};
  const onDragEnd: OnDragEndResponder = (result) => {
    if (result.source && result.destination) {
      // if (srcMemberArray != dstMemberArray) {
      //     const srcMember = srcMemberArray[result.source.index];
      //     console.log("srcMemeber:", srcMember);
      //     srcMemberArray.splice(result.source.index, 1);
      //     dstMemberArray.splice(result.destination.index, 0, srcMember);
      //   } else {
      //     const srcMember = srcMemberArray[result.source.index];
      //     const dstMember = dstMemberArray[result.destination.index];
      //     srcMemberArray.splice(result.source.index, 1);
      //     dstMemberArray.splice(result.destination.index, 0, srcMember);
      //   }

      const srcIdx = result.source.index;
      const dstIdx = result.destination.index;

      //   const srcVm = items[srcIdx];
      //   const dstVm = items[dstIdx];

      // console.log("src:", srcIdx, "dst:", dstIdx);

      //   srcVm.swapPosition(dstVm);

      //   const posArr = items.map((m) => {
      //     const p: Pos = {
      //       x: m.posX,
      //       y: m.posY,
      //     };
      //     return p;
      //   });
      //   const vms = [...items];
      //   runInAction(() => {
      //     const srcItem = vms[srcIdx];
      //     vms.splice(srcIdx, 1);
      //     vms.splice(dstIdx, 0, srcItem);
      //     for (let i = srcIdx; i <= dstIdx; i++) {
      //       vms[i].posX = posArr[i].x;
      //       vms[i].posY = posArr[i].y;
      //     }
      //   });

      setItems((prev) => {
        const arr = [...prev];

        const posArr = items.map((m) => {
          const p: Pos = {
            x: m.posX,
            y: m.posY,
          };
          return p;
        });

        const srcItem = arr[srcIdx];
        // const dstItem = arr[dstIdx];
        arr.splice(srcIdx, 1);
        arr.splice(dstIdx, 0, srcItem);

        for (
          let i = Math.min(srcIdx, dstIdx);
          i <= Math.max(dstIdx, srcIdx);
          i++
        ) {
          //   arr[i].posX = posArr[i].x;
          //   arr[i].posY = posArr[i].y;
          arr[i].movePosition(posArr[i].x, posArr[i].y);
        }

        return arr;
      });
    }
  };

  // const srcItems = viewModel.placeItems
  //   .filter((m) => m.isSelected && m.seatingType === "Member")
  //   .sort((a, b) => a.posY - b.posY);

  const srcItems = viewModel.selectedItems
    .filter((m) => m.isSelected && m.seatingType === "Member")
    .sort((a, b) => a.posY - b.posY);

  const [items, setItems] = useState(srcItems);

  return (
    <div className={`${className}`}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
      >
        <Droppable
          droppableId="SeatPosMember"
          direction="vertical"
          type="SeatPosGroups"
          isCombineEnabled={false}
        >
          {(provided, snapshot) => (
            <div
              onMouseDown={(ev) => {
                ev.stopPropagation();
              }}
              className={`${
                snapshot.isDraggingOver ? " " : ""
              } relative select-none grid grid-cols-1 gap-4 p-8`}
              ref={provided.innerRef}
            >
              {items.map((gs, index) => (
                <Draggable
                  key={index}
                  index={index}
                  draggableId={`Area_${index}`}
                >
                  {(provided2, snapshot) => (
                    <div
                      className={`p-2 text-lg text-white ${
                        snapshot.isDragging ? "border-sky-500 border-2" : ""
                      }`}
                      ref={provided2.innerRef}
                      {...provided2.dragHandleProps}
                      {...provided2.draggableProps}
                    >
                      {/* <span
                        key={index}
                        className={`p-4 border-red-500  ${
                          snapshot.isDragging ? "shadow-lg border-2" : ""
                        }`}
                      >
                        {(gs as MemberSeatingPlaceViewModel).member.name}
                      </span> */}

                      <DragNode
                        member={(gs as MemberSeatingPlaceViewModel).member}
                        className={`p-4 border-red-500 w-[120px] ${
                          snapshot.isDragging ? "shadow-lg border-2" : ""
                        }`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

function DragNode({
  member,
  className = " h-[100px] w-[100px] ",
}: {
  member: ISGUser;
  className?: string;
}) {
  return (
    <div
      className={`bg-white text-[#222529] rounded-md flex flex-col items-center justify-center text-[12px] font-black ${className}`}
    >
      <span className="text-[14px]">{member.name}</span>
      <span className="text-[10px]">{member.teamPosition}</span>
    </div>
  );
}
