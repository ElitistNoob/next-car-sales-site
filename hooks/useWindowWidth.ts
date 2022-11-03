import { useState, useEffect } from "react";

// Not used anywhere

type WindowWidth = {
  width: number | undefined,
};

const useWindowWidth = (): WindowWidth => {
  const [winWidth, setWinWidth] = useState<WindowWidth>({
    width: undefined
  });

  useEffect(() => {
    const handleResize = (): void =>
      setWinWidth({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return winWidth;
};

export default useWindowWidth;
