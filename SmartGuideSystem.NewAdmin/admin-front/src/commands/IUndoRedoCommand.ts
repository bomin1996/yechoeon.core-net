export interface IUndoRedoCommand {
  name: string;
  canExecute: (state?: any) => boolean;
  execute: (state?: any) => void;
  redo: () => void;
  undo: (state?: any) => void;
}
