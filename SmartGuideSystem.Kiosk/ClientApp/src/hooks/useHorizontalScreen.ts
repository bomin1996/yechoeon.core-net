import { useMediaQuery } from "react-responsive";

export default function useHorizontalScreen() {
  const isHorizontal = useMediaQuery({
    // query: "(min-width:1920px)",
    query: "(min-width:1280px)",
  });

  return isHorizontal;
    //return false;
}
