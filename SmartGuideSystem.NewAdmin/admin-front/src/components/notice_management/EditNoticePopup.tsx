import { useContext, useState } from "react";
import { ISGNotice } from "@shares/ISGNoticeInfo";
import withModal from "../ui/modal/withModal";
import ColorButton from "../ui/button/ColorButton";
// import { string } from "yup";
import DraftEditor from "../draftEditor/DraftEditor";

import title_logo from "@/assets/admin-text-logo.svg";
import DialogContext from "@/contexts/DialogContext";
import PreviewWindow from "../ui/windows/PreviewWindow";
import LabelFormik from "../ui/LabelFormik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSelectDepartmentPopup } from "../modals/SelectFindDepartmentModal";
import axios from "axios";
import { ImageMenuButton } from "../ui/button";
import 미리보기아이콘 from "@/assets/buttons/menus/미리보기.svg";
import 저장아이콘 from "@/assets/buttons/menus/저장.svg";
import 취소아이콘 from "@/assets/buttons/menus/취소.svg";
import { Button } from "@/shad-components/ui/button";

interface InputData extends ISGNotice {}
// const dummy: InputData = {
//   idx: 0,
//   title: "",
//   deptName: "",
//   contents: "",
//   postDate: "",
//   deptCode: "",
//   views: 0,
//   noticeType: "",
// };

interface Props {
  noticeInfo: ISGNotice;
  onCancel: () => void;
  onOk: (notice: ISGNotice) => void;
}

// const dummyUrl = "/serverimages/c04203aa-c3d1-4f6c-95ba-e2d91a4b3727.png";

const EditNoticePopup: React.FC<Props> = ({ noticeInfo, onOk, onCancel }) => {
  const dialogCtx = useContext(DialogContext);
  const [currentHtmlString, setCurrentHtmlString] = useState("");

  const [imageItems, setImageItems] = useState(noticeInfo.imageFiles ?? []);
  const [selectedImageItemIndex, setSelectedImageItemIndex] = useState(-1);

  const hendleGetCurrentHtml = (htmlstring: string) => {
    setCurrentHtmlString(htmlstring);
    console.log(htmlstring);
  };

  // const requestSaveImage = async (ev: FormEvent) => {
  //   ev.preventDefault();
  //   try {
  //     console.log("request uploadimages /api/images");
  //     const data = new FormData(ev.target as HTMLFormElement);
  //     const res = await fetch("/api/Images", {
  //       method: "POST",
  //       body: data,
  //     });
  //     console.log("res:", res);
  //     const json = await res.json();
  //     console.log("json:", json);
  //     setChangeUrl("/serverimages/" + json.path);
  //   } catch (ex) {
  //     console.log("exception:", ex);
  //   }
  // };

  // const handleSubmit = (ev: FormEvent) => {
  //   requestSaveImage(ev);
  // };

  // const ref = useRef<HTMLDivElement>(null);

  const formik = useFormik<InputData>({
    initialValues: { ...noticeInfo },
    validationSchema: Yup.object({
      title: Yup.string().min(4).required("필수항목!"),
      deptName: Yup.string().min(2).required("필수항목!"),
    }),
    onSubmit: (v) => {
      v.contents = currentHtmlString;
      v.imageFiles = imageItems;
      onOk(v);
    },
  });

  return (
    <div className="h-screen w-screen pt-16 text-[#221e1f] ">
      <div className="absolute left-0 top-0 w-full h-16 bg-[#464344]">
        <span className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-2xl font-bold text-white">
          공지사항편집
        </span>
        <img
          className="absolute left-5 h-3 top-[50%] translate-y-[-50%]"
          src={title_logo}
          alt=""
        />

        <div className="absolute right-0 top-[50%] translate-y-[-50%] flex divide-x space-x-2 ">
          <ImageMenuButton
            imageSrc={미리보기아이콘}
            title="미리보기"
            onClick={() => {
              dialogCtx?.pushDialog(
                <PreviewWindow onClose={() => {}}>
                  <div
                    className="w-full h-full bg-red-500"
                    dangerouslySetInnerHTML={{ __html: currentHtmlString }}
                  ></div>
                </PreviewWindow>
              );
            }}
          />
          <ImageMenuButton
            title={"취소"}
            imageSrc={취소아이콘}
            onClick={onCancel}
          />
          <ImageMenuButton
            title={"저장"}
            colorType="yellow"
            imageSrc={저장아이콘}
            onClick={() => formik.handleSubmit()}
          />
        </div>
      </div>

      <form
        // className="flex flex-col w-full h-full bg-white p-6 space-y-4 "
        className="w-full h-full bg-white grid grid-cols-[110px_1fr] items-center p-5 "
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "120px 1fr",
        // }}
        onSubmit={(ev) => {
          ev.preventDefault();
          //formik.handleSubmit(ev);
        }}
      >
        <LabelFormik
          className="font-medium"
          name="title"
          title="제목"
          errors={formik.errors.title}
        />
        <input
          name="title"
          type="text"
          placeholder="제목 입력"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full px-3 py-2 focus:shadow border-b border-[#efefef] bg-transparent outline-none  focus:border-green-500/50 focus:border-b-2 disabled:bg-black/5 read-only:bg-black/5"
        />
        <LabelFormik
          className="font-medium"
          name="deptName"
          title="관련부서"
          errors={formik.errors.deptName}
        />
        <div className="flex ">
          <input
            name="deptName"
            type="text"
            placeholder="관련부서 입력"
            readOnly={true}
            value={formik.values.deptName}
            className="flex-1 px-3 py-2 focus:shadow border-b border-[#efefef] bg-transparent outline-none  focus:border-green-500/50 focus:border-b-2 disabled:opacity-75 read-only:bg-black/5"
          />
          <ColorButton
            colorStyle="add"
            title="관련부서"
            className="w-[107px] "
            onClick={() => {
              showSelectDepartmentPopup(dialogCtx!, (department) => {
                formik.values.deptName = department.name;
                formik.values.deptCode = department.deptCode;
                formik.validateField("deptName");
              });
            }}
          />
        </div>

        <span className="font-medium text-lg">첨부</span>
        <div className="flex  space-x-1">
          <input
            name="photo"
            type="file"
            title="파일을 추가"
            accept=".jpg,.png,.webp"
            onChange={async (ev) => {
              if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
                const formData = new FormData();
                formData.append("File", ev.currentTarget.files[0]);
                const res = await axios.post("/api/images/temp", formData);
                const imagePath = "/serverimages/" + res.data.path;
                setImageItems((p) => [...p, imagePath]);
              }
            }}
            // value={formik.values.photo}
            className="py-2"
          />
          {/* <ColorButton colorStyle="add" title="Add" onClick={() => {}} /> */}
          <Button
            variant={"ghost"}
            className="text-red-500"
            onClick={() => {
              setImageItems((p) => {
                p.splice(selectedImageItemIndex, 1);
                return [...p];
              });
            }}
          >
            삭제
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setImageItems((p) => {
                const target = p[selectedImageItemIndex];
                p.splice(selectedImageItemIndex, 1);
                return [target, ...p];
              });
            }}
          >
            앞으로
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setImageItems((p) => {
                const target = p[selectedImageItemIndex];
                p.splice(selectedImageItemIndex, 1);
                return [...p, target];
              });
            }}
          >
            뒤로
          </Button>

          {/* <ColorButton
            colorStyle="modify"
            title="Remove"
            onClick={() => {
              setImageItems((p) => {
                p.splice(selectedImageItemIndex, 1);
                return [...p];
              });
            }}
          /> */}
          {/* <ColorButton
            colorStyle="confirm"
            title="앞으로 이동"
            onClick={() => {
              setImageItems((p) => {
                const target = p[selectedImageItemIndex];
                p.splice(selectedImageItemIndex, 1);
                return [target, ...p];
              });
            }}
          /> */}
          {/* <ColorButton
            colorStyle="confirm"
            title="뒤로 이동"
            onClick={() => {
              setImageItems((p) => {
                const target = p[selectedImageItemIndex];
                p.splice(selectedImageItemIndex, 1);
                return [...p, target];
              });
            }}
          /> */}
        </div>
        <div className=" col-start-2 flex flex-row items-center p-2">
          {imageItems.map((it, index) => (
            <ImageItem
              onClick={() => setSelectedImageItemIndex(index)}
              key={index}
              imageUrl={it}
              isSelected={index === selectedImageItemIndex}
            />
          ))}
        </div>

        <div className="pt-7 h-full col-span-2 scroll-bar">
          <DraftEditor
            htmlContents={currentHtmlString}
            OnCurrentContentsCallback={hendleGetCurrentHtml}
          />
        </div>
      </form>
    </div>
  );
};

export default withModal(EditNoticePopup);

interface ImageItemProps {
  imageUrl: string;
  isSelected?: boolean;
  onClick: () => void;
}
function ImageItem({ onClick, imageUrl, isSelected = false }: ImageItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
      relative
      ${
        isSelected ? "bg-red-400" : "bg-slate-300"
      } p-2 rounded-md m-2 flex flex-col hover:bg-slate-400`}
    >
      <img src={imageUrl} className="h-[120px]" />
      {/* <div className="flex">
        <XMarkIcon className="h-6 w-6 stroke-rose-700" onClick={() => {}} />
      </div> */}
    </div>
  );
}
