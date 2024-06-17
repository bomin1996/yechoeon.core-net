import { makeObservable, observable, runInAction } from "mobx";
import { IUndoRedoCommand } from "./IUndoRedoCommand";

const MAX_UNDO_SIZE = 50;

export class UndoRedoStack {
  undoStack: Array<IUndoRedoCommand> = [];
  redoStack: Array<IUndoRedoCommand> = [];

  constructor() {
    makeObservable(this, {
      undoStack: observable,
      redoStack: observable,
    });
  }

  private removeOverflowCommandIfNeeds() {
    if (this.undoStack.length > MAX_UNDO_SIZE) {
      this.undoStack.splice(0, 1);
    }
  }

  addCommand(command: IUndoRedoCommand) {
    runInAction(() => {
      this.undoStack.push(command);
      this.removeOverflowCommandIfNeeds();
    });
  }
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }
  execute(command: IUndoRedoCommand) {
    if (command.canExecute()) {
      runInAction(() => {
        command.execute();
        this.undoStack.push(command);
        this.removeOverflowCommandIfNeeds();
      });
    }
  }
  undo() {
    if (this.canUndo()) {
      runInAction(() => {
        const command = this.undoStack.pop();
        command!.undo();
        this.redoStack.push(command!);
      });
    }
  }
  redo() {
    if (this.canRedo()) {
      runInAction(() => {
        const command = this.redoStack.pop();
        command!.redo();
        this.undoStack.push(command!);
      });
    }
  }
}
