import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ISGLoginUser } from "@shares/ISGLoginUser";
import { useNavigate } from "react-router-dom";
import { AccountApi } from "@/server/accountApi";
import { useIdleCheckerFireEvent } from "@/hooks/useIdleChecker";

export interface IUserContextData {
  user?: ISGLoginUser;
  logout: () => void;
  login: (loginId: string, password: string) => void;
  setLoginUser: (user: ISGLoginUser, goHome: boolean) => void;
}

const AuthContext = createContext<IUserContextData | null>(null);

export default AuthContext;

interface Props extends PropsWithChildren {}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<ISGLoginUser>();

  // document.addEventListener("visibilitychange", () => {
  //   if (document.visibilityState === "visible") {
  //     console.log("visibilitychange");
  //   } else {
  //     console.log(document.visibilityState);
  //   }
  // });

  const handleLogout = async () => {
    setUser(undefined);
    window.sessionStorage.removeItem("currentUser");
    await AccountApi.logout();
    //window.location.replace("/Account/Login");
    navigate("/Account/Login");
  };
  const navigate = useNavigate();
  // const blockUICtx = useContext(BlockUIContext);
  const handleLogin = () => {
    console.log("AuthProvider handleLogin:", user);
  };

  // useEffect(() => {
  //   if (user === undefined) {
  //     AccountApi.getCurrentUser().then((res) => {
  //       if (res?.status === 200) {
  //         console.log("current user:", res.data);
  //         setUser(res.data as ISGLoginUser);
  //       }
  //     });
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: handleLogout,
        login: handleLogin,
        setLoginUser: (user, goHome) => {
          if (user as ISGLoginUser) {
            setUser(user as ISGLoginUser);
            if (goHome) {
              navigate("/");
            }
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}
