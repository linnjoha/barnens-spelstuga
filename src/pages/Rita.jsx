import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
const Rita = () => {
  const [bgColor, setBgColor] = useState("");
  const [bigBg, setBigBg] = useState("#ffffff");
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
      <div className="flex flex-col">
        {colorArr.map((color) => (
          <div key={color.number}>
            <p>{color.number}</p>
            <div
              className={`h-10 w-10 rounded-full border-black cursor-pointer`}
              style={{ backgroundColor: `${color.hex}` }}
              onClick={() => setBgColor(color)}
            ></div>
          </div>
        ))}
      </div>
    );
  };
  const GameComponent = () => {
    const checkUserAnswer = () => {
      if (x + y == bgColor.number) alert("rätt"), startAddition();
      else alert("försök igen");
    };
    return (
      <div className="self-middle flex flex-col gap-10">
        <div
          style={{ backgroundColor: `${bigBg}` }}
          className="h-20 w-20 border-2 border-black cursor-pointer"
          onClick={() => setBigBg(bgColor.hex)}
        ></div>
        <section className="flex  text-black items-center">
          <div className="rounded-2xl bg-white w-12 h-16  flex items-center justify-center shadow">
            <p className="font-bold">{x}</p>
          </div>
          <p>+</p>
          <div className="rounded-2xl bg-white w-12 h-16 flex items-center justify-center shadow">
            <p className="font-bold">{y}</p>
          </div>
        </section>
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
          <p>vald färg:</p>
          <div
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: `${bgColor.hex}` }}
          ></div>
          <ColorPalett />
        </div>
        <GameComponent />
      </div>
    </>
  );
};

export default Rita;
