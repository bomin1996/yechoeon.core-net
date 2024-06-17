import React, { useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import SeatAreaContext from "@/contexts/SeatAreaContext";
import { MemberSeatViewModel } from "@/viewmodels/organization_chart/MemberSeatViewModel";
import MemberSeatView from "./MemberSeatView";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function DropContainer() {
  return <div>DropContainer</div>;
}

interface Props {
  droppableId: string;
  items: Array<MemberSeatViewModel>;
  onAddClick?: () => void;
}

// interface PropsSingle {
//   droppableId: string;
//   item: MemberSeatViewModel;
// }

const HorizontalDropContainer: React.FC<Props> = ({ droppableId, items }) => {
  const seatAreaContext = useContext(SeatAreaContext);
  const placeholder = seatAreaContext?.placeHolderInfo;
  return (
    <Droppable
      droppableId={droppableId}
      direction="horizontal"
      type="GroupSeat"
      isCombineEnabled={true}
    >
      {(provided, snapshot) => (
        <div
          onMouseDown={(ev) => {
            ev.stopPropagation();
          }}
          className={`${
            snapshot.isDraggingOver ? " " : ""
          } relative select-none flex flex-row gap-3`}
          ref={provided.innerRef}
        >
          {items.map((memberVm, index) => (
            <Draggable
              key={memberVm.member.sid}
              index={index}
              draggableId={memberVm.member.sid}
            >
              {(provided2, snapshot) => (
                <div
                  className={` ${
                    snapshot.isDragging ? "shadow-lg shadow-black/70 " : ""
                  }`}
                  ref={provided2.innerRef}
                  {...provided2.dragHandleProps}
                  {...provided2.draggableProps}
                >
                  <MemberSeatView
                    viewModel={memberVm}
                    className="w-[105px] h-[50px] font-black"
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          {snapshot.isDraggingOver && (
            <div
              style={{
                top: placeholder?.clientY,
                left: placeholder?.clientX,
                height: placeholder?.clientHeight,
                width: placeholder?.clientWidth,
              }}
              className="absolute m-2 p-4 bg-red-300 text-[#222529] flex-shrink-0 h-[68px] w-[140px] text-sm outline-dashed outline-black"
            >
              <p>
                {placeholder?.clientX} - {placeholder?.clientY}
              </p>
              <p>
                {placeholder?.clientWidth} - {placeholder?.clientHeight}
              </p>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

const VerticalDropContainer: React.FC<Props> = ({
  droppableId,
  items,
  onAddClick,
}) => {
  const seatAreaContext = useContext(SeatAreaContext);
  const placeholder = seatAreaContext?.placeHolderInfo;
  return (
    <Droppable
      droppableId={droppableId}
      direction="vertical"
      type="GroupSeat"
      isCombineEnabled={true}
    >
      {(provided, snapshot) => (
        <div
          onMouseDown={(ev) => {
            ev.stopPropagation();
          }}
          className={`${
            snapshot.isDraggingOver ? " " : ""
          } relative  select-none flex flex-col gap-[0px] p-0 min-w-[88px] min-h-[58px]  `}
          ref={provided.innerRef}
        >
          {items.map((memberVm, index) => (
            <Draggable
              key={memberVm.member.sid}
              index={index}
              draggableId={memberVm.member.sid}
            >
              {(provided2, snapshot) => (
                <div
                  className={`m-[4px]  ${
                    snapshot.isDragging ? "shadow-lg shadow-black/70 " : ""
                  }`}
                  ref={provided2.innerRef}
                  {...provided2.dragHandleProps}
                  {...provided2.draggableProps}
                >
                  <MemberSeatView
                    viewModel={memberVm}
                    className="w-[80px] h-[50px]"
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          {snapshot.isDraggingOver && (
            <div
              style={{
                top: (placeholder?.dstIndex ?? 0) * 62,
                left: 4,
                // height: placeholder?.clientHeight,
                // width: placeholder?.clientWidth,
                height: 50,
                width: 80,
              }}
              className="absolute p-4 m-[4px] bg-red-300 text-[4px] text-[#222529] flex-shrink-0 h-[68px] w-[140px] text-sm outline-dashed outline-black"
            >
              {/* <p>
                {placeholder?.clientX} - {placeholder?.clientY}
              </p>
              <p>
                {placeholder?.clientWidth} - {placeholder?.clientHeight}
              </p> */}
            </div>
          )}
          {!snapshot.draggingFromThisWith && (
            <AddSeatHolder
              // onClick={() => {
              //   seatAreaContext?.addMemberFromGroupSeat(droppableId);
              // }}
              onClick={onAddClick!}
            />
          )}
        </div>
      )}
    </Droppable>
  );
};

const SingleDropContainer: React.FC<Props> = ({
  droppableId,
  items,
  onAddClick,
}) => {
  const isDraggableBoss = items.length > 0;

  return (
    <Droppable
      droppableId={droppableId}
      direction="vertical"
      type="GroupSeat"
      isDropDisabled={isDraggableBoss}
      isCombineEnabled={true}
    >
      {(provided, snapshot) => (
        <div
          onMouseDown={(ev) => {
            ev.stopPropagation();
          }}
          className={`ml-auto mr-auto relative h-[50px] w-[80px]  bg-blue-400 ${
            snapshot.isDraggingOver ? "" : ""
          }  ${
            isDraggableBoss ? "" : "outline-dashed outline-black/50"
          } select-none`}
          ref={provided.innerRef}
        >
          {items.length > 0 && (
            <Draggable
              key={items[0].member.sid}
              index={0}
              draggableId={items[0].member.sid}
            >
              {(provided2, snapshot) => (
                <div
                  className={`${snapshot.isDragging ? "w-[80px]" : "w-[80px]"}`}
                  ref={provided2.innerRef}
                  {...provided2.dragHandleProps}
                  {...provided2.draggableProps}
                >
                  <MemberSeatView
                    viewModel={items[0]}
                    className={`${
                      snapshot.isDragging ? "w-[80px] bg-red-600" : "w-[80px]"
                    } h-[50px]`}
                  />
                </div>
              )}
            </Draggable>
          )}

          {provided.placeholder}
          {snapshot.isDraggingOver && (
            <div
              style={{
                top: 0,
                left: 0,
                height: 50,
                width: 80,
              }}
              className="absolute m-0 p-0 bg-red-300 text-[#222529] flex-shrink-0 text-sm outline-dashed outline-black"
            >
              {/* <p>
                {placeholder?.clientX} - {placeholder?.clientY}
              </p>
              <p>
                {placeholder?.clientWidth} - {placeholder?.clientHeight}
              </p> */}
            </div>
          )}
          {!snapshot.draggingFromThisWith && !isDraggableBoss && (
            <AddSeatHolder onClick={onAddClick!} />
          )}
        </div>
      )}
    </Droppable>
  );
};

export { HorizontalDropContainer, VerticalDropContainer, SingleDropContainer };

function AddSeatHolder({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="p-4 m-[3px] flex cursor-pointer hover:bg-white/30 bg-white/50 rounded-md text-[#464344] shadow flex-shrink-0 h-[50px] w-[80px] text-sm font-bold "
    >
      <PlusIcon className="m-auto fill-[#464344] stroke-[#464344] h-5 w-5" />
      추가
    </div>
  );
}
