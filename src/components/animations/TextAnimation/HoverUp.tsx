import React from "react";

type propType = {
  text: string;
};

const HoverUp = ({ text }: propType) => {
  return (
    <div className="group relative flex cursor-pointer overflow-hidden uppercase leading-6">
      <div className="inline-block transition duration-500 ease-out group-hover:-translate-y-[120%]">
        {text}
      </div>
      <div className="absolute left-0 translate-y-[120%] rotate-12 transition duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-0">
        {text}
      </div>
    </div>
  );
};

export default HoverUp;
