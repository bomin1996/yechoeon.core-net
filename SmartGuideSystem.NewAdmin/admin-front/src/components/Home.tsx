import a from "@/assets/background/yc.jpg";
import e from "@/assets/background/e.webp";
import yc1 from "@/assets/background/yc1.jpg";
import yc2 from "@/assets/background/yc2.jpg";
import yc3 from "@/assets/background/yc3.jpg";
import { admin_version } from "@/const";

export default function Home() {
  const images = [a, e, yc1, yc2, yc3];
  const imageIndex = getRandomInt(images.length);
  return (
    <div className="p-1 flex flex-col w-full h-full bg-slate-100">
      <img
        className="object-cover w-full h-full "
        src={images[imageIndex]}
        alt=""
      />

      {/* <a
        className="absolute right-4 top-4 text-xl bg-blue-600 text-white px-6 py-3 rounded-lg"
        href="/serverimages/manual/admin_manual.pdf"
        download={true}>
        관리자 매뉴얼 다운로드 (PDF)
      </a> */}

      <span className="absolute right-4 bottom-4 bg-slate-100/50 rounded-md px-4 py-1 font-bold min-w-[100px] text-center">
        v{admin_version}
      </span>
    </div>
  );
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
