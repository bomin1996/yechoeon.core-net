import { useContext } from "react";
import title_logo from "@/assets/admin-text-logo.svg";
import logo_sg from "@/assets/logo-sg.svg";
import ColorButton from "./ui/button/ColorButton";
import AuthContext from "@/contexts/AuthContext";

import { useFormik } from "formik";
import * as Yup from "yup";
import BlockUIContext from "@/contexts/BlockUIContext";
import { AccountApi } from "@/server/accountApi";
import toast from "react-hot-toast";
import { SITE_LOGO_IMAGE } from "@/const";

interface LoginDataProps {
  userId: string;
  password: string;
}

export default function Login() {
  const authContext = useContext(AuthContext);
  const blockUICtx = useContext(BlockUIContext);

  const formik = useFormik<LoginDataProps>({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("유저아이디를 입력하세요."),
      password: Yup.string().required("패스워드를 입력하세요."),
    }),
    onSubmit: async (values) => {

      blockUICtx?.setBlock(true);
      const res = await AccountApi.login(values.userId, values.password);
      if (res) {
        if (res.status === 200) {
          window.sessionStorage.setItem(
            "currentUser",
            JSON.stringify(res.data.currentUser)
          );
          window.sessionStorage.setItem("expired", res.data.expired);
          authContext?.setLoginUser(res.data.currentUser, true);
        } else {
          toast(JSON.stringify(res.data.error));
        }
      }
      blockUICtx?.setBlock(false);
    },
  });

  return (
    <div className="flex h-screen w-screen bg-[#231f20]">
      <div className="absolute xl:w-[480px] w-full h-full bg-[#e8e6da]">
        <img
          className="absolute w-[366px] left-[50%] translate-x-[-50%] top-[38px]"
          src={SITE_LOGO_IMAGE}
          alt=""
        />
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
        className="h-full m-auto z-50 w-80  flex flex-col justify-center gap-3 "
      >
        <div className="mb-4 flex items-center">
          <img className="h-20 " src={logo_sg} alt="" />
          <div className="flex flex-col ml-1 gap-2">
            <img className="h-5 col-span-1" src={title_logo} alt="" />
            <p className="text-sm font-bold text-white">관리자 콘솔 로그인</p>
          </div>
        </div>
        <label className="text-white/90 font-bold text-sm" htmlFor="userId">
          {" "}
          아이디 {formik.errors.userId}
        </label>
        <input
          name="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
          className="h-8 rounded-md px-2 text-sm font-semibold"
          placeholder="아이디"
          type="text"
        />
        <label className="text-white/90 font-bold text-sm" htmlFor="userId">
          {" "}
          비밀번호 {formik.errors.password}
        </label>
        <input
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="h-8 rounded-md px-2 text-sm font-semibold"
          placeholder="패스워드"
          type="password"
        />
        <ColorButton
          className="h-8 mt-[30px] font-bold"
          colorStyle="open"
          title="로그인"
          disable={!formik.isValid}
          onClick={() => {
            formik.handleSubmit();
          }}
        />
      </form>
    </div>
  );
}
