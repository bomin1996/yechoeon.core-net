import { PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import cssStyle from "@/index.css";
import withModal from "../modal/withModal";

interface Props extends PropsWithChildren {
  onClose: () => void;
  title?: string;
}
export default function PreviewWindow({ children, onClose, title }: Props) {
  const externalWindow = useRef(
    window.open("", "", "width=600,height=400,left=200,top=200")
  );

  const containerEl = document.createElement("div");

  useEffect(() => {
    if (externalWindow.current) {
      const currentWindow = externalWindow.current;

      return () => currentWindow.close();
    }
  }, []);
  if (externalWindow.current) {
    externalWindow.current.document.title = title ?? "";
    externalWindow.current.document.body.appendChild(containerEl);
    // copyStyles(document, externalWindow.current.document);

    externalWindow.current.addEventListener("beforeunload", () => {
      onClose();
    });

    return ReactDOM.createPortal(children, containerEl);
  } else {
    return null;
  }
}
