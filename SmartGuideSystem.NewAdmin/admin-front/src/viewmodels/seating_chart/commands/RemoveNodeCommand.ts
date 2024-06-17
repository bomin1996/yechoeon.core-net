import { IUndoRedoCommand } from "@/commands/IUndoRedoCommand";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { runInAction } from "mobx";
import { SeatingChartViewModel } from "../SeatingChartViewModel";

export class RemoveNodeCommand implements IUndoRedoCommand {
  name: string = "RemoveNodeCommand";
  nodes: Array<BaseSeatingPlaceViewModel>;
  chartVM: SeatingChartViewModel;

  constructor(
    chartVM: SeatingChartViewModel,
    items: Array<BaseSeatingPlaceViewModel>
  ) {
    this.chartVM = chartVM;
    this.nodes = [...items];
  }

  canExecute(state?: any) {
    return true;
  }
  execute(state?: any) {
    this.redo();
  }
  redo() {
    runInAction(() => {
      this.nodes.forEach((node, index) => {
        this.chartVM.removeItem(node);
      });
    });
  }
  undo(state?: any) {
    runInAction(() => {
      this.nodes.forEach((node, index) => {
        this.chartVM.addItem(node);
      });
    });
  }
}
