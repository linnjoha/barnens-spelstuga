import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
const Rita = () => {
  const [bgColor, setBgColor] = useState("");
  const [bigBg, setBigBg] = useState({ hex: "#ffffff" });
  const colorArr = [...colors];
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
  };
  const startAddition = () => {
    const newX = getRandomInt(10);
    const newY = getRandomInt(10);
    setX(newX);
    setY(newY);
  };
  useEffect(() => {
    startAddition();
  }, []);

  const ColorPalett = () => {
    return (
      <div className="flex flex-col px-20 gap-6">
        {colorArr.map((color) => (
          <div className="flex gap-4 items-center font-bold" key={color.number}>
            <div
              className={`h-10 w-10 rounded-full border-black cursor-pointer`}
              style={{ backgroundColor: `${color.hex}` }}
              onClick={() => setBgColor(color)}
            ></div>
            <p>{color.number}</p>
          </div>
        ))}
      </div>
    );
  };
  const GameComponent = () => {
    const checkUserAnswer = () => {
      if (x + y == bigBg.number) alert("rätt"), startAddition();
      else alert("försök igen");
    };
    return (
      <div className="flex flex-col items-center gap-6 px-20">
        <div
          style={{ backgroundColor: `${bigBg.hex}` }}
          className="flex justify-center items-center h-20 w-20 border-2 border-black cursor-pointer text-black font-bold"
          onClick={() => setBigBg(bgColor)}
        >
          {x}+{y}
        </div>
        <section className="flex  text-black items-center"></section>
        <button
          className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 text-white"
          onClick={() => checkUserAnswer()}
        >
          Rätta
        </button>
      </div>
    );
  };
  return (
    <>
      <h2 className="text-3xl font-bold p-10 text-center">Räkna och rita</h2>
      <div className="flex items-center justify-center">
        <div className="flex flex-row self-start ">
          <ColorPalett />
          <p className="text-center">vald färg:</p>
          <div
            className="h-5 w-5 rounded-full mx-4"
            style={{ backgroundColor: `${bgColor.hex}` }}
          ></div>
        </div>
        <GameComponent />
      </div>
    </>
  );
};

export default Rita;
