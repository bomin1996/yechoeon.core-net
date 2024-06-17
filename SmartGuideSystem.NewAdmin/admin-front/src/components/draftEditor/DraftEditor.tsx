import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import axios from "axios";

interface Props {
  htmlContents?: string;
  OnCurrentContentsCallback: (htmlstring: string) => void;
}

const DraftEditor: React.FC<Props> = ({
  htmlContents,
  OnCurrentContentsCallback,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [, setHtmlString] = useState(htmlContents ?? "");

  const updateTextDescription = async (state: EditorState) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    OnCurrentContentsCallback(html);
  };

  // if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     //document.getElementById("divOutput").src = event.target.result;

  //     if (event.target?.result) {
  //       //setLocalImage(String(event.target.result));
  //       onChangeBackgroundImage(String(event.target.result));
  //     }
  //   };
  //   reader.readAsDataURL(ev.currentTarget.files[0]);
  // }

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("File", file);
        const res = await axios.post("/api/images/temp", formData);
        const imagePath =
          "http://" + window.location.host + "/serverimages/" + res.data.path;

        resolve({ data: { link: imagePath } });
      };

      reader.readAsDataURL(file);
    });
  };

  // const uploadCallback = (file: Blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = (event) => {
  //       if (event.target?.result) {
  //         const dataUrl = String(event.target.result);
  //         resolve({ data: { link: dataUrl } });
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const uploadCallback = () => {
  //   console.log("이미지 업로드");
  // };

  // toolbar 설정
  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    // image: {
    //   urlEnabled: true,
    //   uploadEnabled: false,
    //   alignmentEnabled: true,
    //   uploadCallback: uploadCallback,
    //   previewImage: true,
    //   inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    //   alt: { present: false, mandatory: false },
    //   defaultSize: {
    //     height: "auto",
    //     width: "auto",
    //   },
    // },
    image: {
      urlEnabled: false,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: uploadCallback,
      previewImage: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: "auto",
        width: "auto",
      },
    },
    options: [
      "blockType",
      "fontSize",
      "fontFamily",
      "inline",
      // "list",
      "textAlign",
      "colorPicker",
      // "link",
      // "image",
    ],
  };

  return (
    <div>
      <Editor
        editorClassName="editor" // Editor 적용 클래스
        toolbarClassName="toolbar" // Toolbar 적용 클래스
        placeholder="게시글을 작성해주세요"
        editorState={editorState}
        onEditorStateChange={updateTextDescription}
        toolbar={toolbar}
        localization={{ locale: "ko" }}
        editorStyle={{
          height: "600px",
          width: "100%",
          background: "white",
          border: "2px solid lightgray",
          padding: "16px",
        }}
      />
    </div>
  );
};

export default DraftEditor;
