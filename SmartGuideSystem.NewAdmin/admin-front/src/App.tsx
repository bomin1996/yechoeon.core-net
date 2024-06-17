import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import AuthContext, { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import axios from "axios";
import { AccountApi } from "./server/accountApi";
import { ISGLoginUser } from "../../../shares/ISGLoginUser";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            return route.requireAuth ? (
              <Route
                key={index}
                path={route.path}
                element={
                  <RequireAuth authPath="/Account/Login">
                    {route.element}
                  </RequireAuth>
                }
              />
            ) : (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
          <Route
            path="*"
            element={
              <RequireAuth authPath="/Account/Login">
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

function RequireAuth({
  authPath,
  children,
}: {
  authPath: string;
  children: JSX.Element;
}) {
  const authCtx = useContext(AuthContext);
  //console.log("authCtx?.user:", authCtx?.user);
  //const location = useLocation();
  const [progressing, setProgressing] = useState(false);
  const requestUser = async () => {
    const res = await AccountApi.getCurrentUser();
    if (res?.status === 200) {
      authCtx?.setLoginUser(res.data as ISGLoginUser, false);
    }
    setProgressing(false);
  };

  let loginUser = authCtx?.user;

  if (loginUser) {
    return children;
  } else {
    if (progressing || window.sessionStorage.getItem("currentUser")) {
      requestUser();
      //return <>....Loading</>;
      return (
        <div className="w-full h-full bg-[#464344] px-4 py-4 text-white text-lg">
          사용자정보 새로고침...
        </div>
      );
    } else {
      return <Navigate to={authPath} replace />;
    }
  }

  // if (authCtx?.user === undefined) {
  // }

  // if (loginUser === undefined) {
  //   return <Navigate to={authPath} replace />;
  // } else {
  //   //alert(document.cookie);

  // }
  //return children;
}

// axios.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     return response;
//   },
//   function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     console.log("axios.interceptors.response:", error);
//     const { response } = error;
//     console.log("axios.interceptors.response2:", response);

//     if (401 === response.status) {
//       window.location.replace("/Account/Login");
//     }
//     if (404 === response.status) {
//       window.location.replace("/Account/Login");
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error::", error);
    // window.localStorage.removeItem("currentUser");
    window.sessionStorage.removeItem("currentUser");

    if (error.response.status === 401) {
      window.location.replace("/Account/Login");
    } else if (error.response.status === 404) {
      // console.log("redirect ====> Account/Login");
      window.location.replace("/Account/Login");
    }

    // if (error.response.status === 401) {
    //   window.location.replace("/Account/Login");
    // }
  }
);
