import React, { useState, useEffect } from "react";
import { Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import Leftheader from "./Leftheader";
import Midheader from "./Midheader";
import Rightheader from "./Rightheader";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    setLastScrollTop(position);
  };

  return (
    <div
      className={`flex items-center justify-between bg-transparent text-xl font-semibold overflow-hidde fixed top-0 w-full ${scrollPosition > 120 ? 'border-b-[1px] border-zinc-400' : ''}`}
      style={{
        backdropFilter:
          scrollPosition > 120
            ? `blur(${Math.min(scrollPosition, 20)}px) brightness(${Math.min(
                scrollPosition,
                90
              )}%) sepia(${Math.min(scrollPosition, 50)}%)`
            : "none",
        backgroundColor: "transparent",
        zIndex: 1000,
      }}
    >
      <Leftheader />
      <Rightheader  />
      <div>
        <Midheader />
      </div>
    </div>
  );
};

export default Header;
