import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useContext } from "react";

// import backImage from "src/assets/frame/back@2x.png";
// import closeBtnImage from "src/assets/button/닫기@2x.webp";
import closeBtnImage from "src/assets/button/modal_close.svg";

import DialogContext from "src/contexts/DialogContext";

interface ModalFrameLayout extends PropsWithChildren {
  className?: string;
}

export default function ModalFrameLayout({
  children,
  className,
}: ModalFrameLayout) {
  const dialogCtx = useContext(DialogContext);

  return (
    <div className="flex w-screen h-screen">
      <AnimatePresence>
        <motion.div
          className="flex w-full h-full"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex w-screen h-screen scale-100 transition-all">
            {/* <img
              height={415}
              src={backImage}
              alt=""
              className="absolute h-[415px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            /> */}
            <div
              onMouseUp={(ev) => ev.stopPropagation()}
              className={`m-auto flexflex-col justify-start  items-center relative  text-[#363636]  px-[0px]  ${className} `}
            >
              <div>
                {children}
                <img
                  className="absolute hover:opacity-70 active:scale-95 left-[50%] translate-x-[-50%] bottom-0 translate-y-[50%] h-[74px] "
                  src={closeBtnImage}
                  onClick={() => {
                    dialogCtx?.popDialog();
                  }}
                  width={74}
                  height={74}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
