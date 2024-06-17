import AuthContext from "@/contexts/AuthContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { AccountApi } from "@/server/accountApi";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FakeLogin() {
  const authContext = useContext(AuthContext);
  const blockUICtx = useContext(BlockUIContext);
  const navigate = useNavigate();
  const handleFakeUser = async () => {
    blockUICtx?.setBlock(true);
    const res = await AccountApi.getCurrentUser();
    if (res) {
      if (res.status === 200) {
        window.sessionStorage.setItem(
          "currentUser",
          JSON.stringify(res.data.currentUser)
        );
        window.sessionStorage.setItem("expired", res.data.expired);
        authContext?.setLoginUser(res.data.currentUser, true);
        navigate("/cms_noleftmenu");
      } else {
      }
    }
    blockUICtx?.setBlock(false);
  };
  useEffect(() => {
    //navigate("/cms_noleftmenu")
    if (window.sessionStorage.getItem("currentUser")) {
      navigate("/cms_noleftmenu");
    } else {
      handleFakeUser();
    }
  }, []);
  return <div className="w-full h-full bg-[#464344]"></div>;
}
