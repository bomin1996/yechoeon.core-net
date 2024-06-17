import { observer } from "mobx-react";
import  {  useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";
import { IPlaceHolderInfo, SeatAreaProvider } from "@/contexts/SeatAreaContext";
import { IGroupSeatViewModel } from "@/viewmodels/organization_chart/IGroupSeatViewModel";
import { SeatAreaViewModel } from "@/viewmodels/organization_chart/SeatAreaViewModel";
import { TopBossTwoColumnsGroupSeatViewModel } from "@/viewmodels/organization_chart/TopBossTwoColumnsGroupSeatViewModel";
import TopBossTwoColumnsGroupSeatView from "./seats/TopBossTwoColumnsGroupSeatView";

interface Props {
  className?: string;
  viewModel: SeatAreaViewModel;
  width?: number;
  height?: number;
  onAddMember: (group: IGroupSeatViewModel, lineIndex: number) => void;
}

export default observer(function SeatAreaView({
  className,
  viewModel,
  onAddMember,
  width = 1900,
  height = 800,
}: Props) {
  const [placeHolderInfo, setPlaceHolderInfo] = useState<IPlaceHolderInfo>();
  const handleGroupSeatMouseDown = (
    clientX: number,
    clientY: number,
    item: IGroupSeatViewModel
  ) => {
    viewModel.setSelectedGroup(item);
  };

  // const handleMouseMove = (ev: MouseEvent) => {
  //   if (viewModel.selectedGroupSeatViewModel) {
  //     viewModel.mouseMove(ev.clientX, ev.clientY);
  //   }
  // };
  // const handleMouseUp = (ev: MouseEvent) => {
  //   if (viewModel.selectedGroupSeatViewModel) {
  //     console.log("handleMouseUp ");
  //     viewModel.mouseUp(ev.clientX, ev.clientY);
  //     ev.stopPropagation();
  //   }
  // };

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const handleDragStart: OnDragStartResponder = (start, provided) => {
    // getClientSize
    // save ClientSize Position
    const draggedDOM = getDraggedDom(start.draggableId);
    if (!draggedDOM) {
      return;
    }
    // const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = start.source.index;

    if (draggedDOM.parentNode !== null) {
      const pn = draggedDOM.parentNode;

      let node = pn.firstElementChild;

      let total = 0;
      while (node !== null && node !== draggedDOM) {
        const htmlElement = node as HTMLElement;
        const totalStyle = htmlElement.style || window.getComputedStyle(node);
        total += node.clientHeight + parseFloat(totalStyle.marginBottom);
        node = node.nextElementSibling;
      }

      // const clientY =
      //   parseFloat(
      //     window.getComputedStyle(draggedDOM.parentElement!).paddingTop
      //   ) + total;

      setPlaceHolderInfo({
        clientX: 0,
        clientY: 0,
        clientWidth: 0,
        clientHeight: 0,
        dstIndex: sourceIndex,
      });
    }
  };
  const handleDragUpdate: OnDragUpdateResponder = (start, provided) => {
    if (start.type === "SeatAreaGroups") {
      return;
    }

    //start.destination?.index
    if (!start.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(start.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = start.destination.index;
    const sourceIndex = start.source.index;
    if (draggedDOM.parentNode === null) {
      return;
    }

    // const pstyle = window.getComputedStyle(draggedDOM.parentElement!);

    const childrenArray: Array<HTMLElement> = [];
    for (let i = 0; i < draggedDOM.parentNode.children.length; i++) {
      const c = draggedDOM.parentNode.children.item(i) as HTMLElement;
      childrenArray.push(c);
    }
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);
    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];
    if (draggedDOM.parentElement === null) {
      return;
    }

    //const direction = pstyle.flexDirection;
    const dstViewGroupVm = viewModel.findGroupSeat(
      start.destination.droppableId
    );
    if (dstViewGroupVm === null) {
      return;
    }

    let direction = "none";

    switch (dstViewGroupVm.groupSeatType) {
      case "Horizontal":
      case "Horizontal_LeftDirection":
      case "LeftBoss_TowRows":
      case "RightBos_TwoRows":
      case "TwoRows":
        direction = "row";
        break;
      case "Vertical":
      case "TwoColumns":
      case "TopBoss_TwoColumns":
        direction = "column";
        break;
    }

    if (direction === "row") {
      const clientX =
        parseFloat(
          window.getComputedStyle(draggedDOM.parentElement).paddingLeft
        ) +
        updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginRight = parseFloat(style.marginRight);
          const marginLeft = parseFloat(style.marginLeft);
          return total + curr.offsetWidth + marginRight + marginLeft;
        }, 0);

      const clientY = parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingTop
      );

      setPlaceHolderInfo({
        clientX: clientX,
        clientY: clientY,
        clientWidth: clientWidth,
        clientHeight: clientHeight,
        srcIndex: sourceIndex,
        dstIndex: destinationIndex,
      });
    } else if (direction === "column") {
      const clientY =
        parseFloat(
          window.getComputedStyle(draggedDOM.parentElement).paddingTop
        ) +
        updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          const marginTop = parseFloat(style.marginTop);
          return total + curr.offsetHeight + marginBottom + marginTop;
        }, 0);

      const clientX = parseFloat(
        window.getComputedStyle(draggedDOM.parentElement).paddingLeft
      );

      setPlaceHolderInfo({
        clientX: clientX,
        clientY: clientY,
        clientWidth: clientWidth,
        clientHeight: clientHeight,
        srcIndex: sourceIndex,
        dstIndex: destinationIndex,
      });
    }
  };
  const onDragEnd: OnDragEndResponder = (result) => {
    viewModel.onDragEnd(result);
    setPlaceHolderInfo(undefined);
  };

  // const handleAddMemberFromGroupseat = (group:DraggableGroupSeatViewModel, lineIndex:number) => {
  //   const group = viewModel.findGroupSeat(groupId);
  //   if (group) {
  //     onAddMember(group);
  //   }
  // };

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={`bg-[#161415]  relative ${className}`}
    >
      <span className="absolute left-0 bottom-0 text-3xl text-white font-bold">
        {" "}
        그룹: {viewModel.groupSeats.length} - 사용자:{" "}
        {viewModel.totalUserCount()}
      </span>
      <SeatAreaProvider
        addMemberFromGroupSeat={onAddMember}
        onMouseDown={handleGroupSeatMouseDown}
        placeHolderInfo={placeHolderInfo}
      >
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
        >
          <Droppable
            droppableId="SeatAreaViewId"
            direction="horizontal"
            type="SeatAreaGroups"
            isCombineEnabled={false}
          >
            {(provided, snapshot) => (
              <div
                onMouseDown={(ev) => {
                  ev.stopPropagation();
                }}
                className={`${
                  snapshot.isDraggingOver ? " " : ""
                } relative select-none flex flex-row gap-4 p-8`}
                ref={provided.innerRef}
              >
                {viewModel.groupSeats.map((gs, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={`Area_${index}`}
                  >
                    {(provided2, snapshot) => (
                      <div
                        className={`w-[200px] ${
                          snapshot.isDragging
                            ? "shadow-lg shadow-black/70 "
                            : ""
                        }`}
                        ref={provided2.innerRef}
                        {...provided2.dragHandleProps}
                        {...provided2.draggableProps}
                      >
                        <TopBossTwoColumnsGroupSeatView
                          droppableId={`${index}`}
                          key={index}
                          className={`${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                          viewModel={gs as TopBossTwoColumnsGroupSeatViewModel}
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
      </SeatAreaProvider>
    </div>
  );
});
