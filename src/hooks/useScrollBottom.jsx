import { useEffect, useState } from "react";

const UseScrollBottom = (callBack, isLoading) => {
  const [scrollBottom, setScrollBottom] = useState(false);

  useEffect(() => {
    window.scroll({ top: "0" });

    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - 56;
      const scrollY =
        document.documentElement.scrollTop +
        document.documentElement.clientHeight;
      setScrollBottom(Math.ceil(scrollY) >= windowHeight);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollBottom && !isLoading) {
      callBack();
    }
  }, [scrollBottom]);
  return scrollBottom;
};

export default UseScrollBottom;
