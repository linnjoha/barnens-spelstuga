import React from "react";
import { useState } from "react";
const Rakna = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [counting, setCounting] = useState("");
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const levels = [
    { counting: "+", level: "plus" },
    { counting: "-", level: "minus" },
  ];

  const handleLevelDecision = (count) => {
    setIsOpen(!isOpen);
    count === "-" ? startSubstraction() : startAddition();
  };

  const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
  };

  const startSubstraction = () => {
    const newX = getRandomInt(10);
    const newY = getRandomInt(newX);
    setX(newX);
    setY(newY);
    setCounting("-");
  };

  const startAddition = () => {
    const newX = getRandomInt(10);
    const newY = getRandomInt(10);
    setX(newX);
    setY(newY);
    setCounting("+");
  };

  const GameComponent = () => {
    const [userAswer, setUserAnswer] = useState(null);
    const checkUserAnswer = () => {
      if (!userAswer) return;
      if (counting == "+") {
        console.log(x, y, userAswer);
        x + y == Number(userAswer)
          ? (alert("Rättsvar"), startAddition())
          : alert("Försök igen");
      } else {
        x - y == Number(userAswer)
          ? (alert("Rättsvar"), setX(null), setY(null), startSubstraction())
          : alert("Försök igen");
      }
    };
    return (
      <>
        <section className=" w-full h-screen flex flex-col items-center gap-22">
          <h2 className="text-3xl font-bold p-12 mt-12">Räkna de två talen</h2>
          <section className="flex items-center gap-5 self-center font-bold text-black">
            <div className="rounded-2xl bg-white w-12 h-16  flex items-center justify-center shadow">
              <p className="font-bold">{x}</p>
            </div>
            <p>{counting}</p>
            <div className="rounded-2xl bg-white w-12 h-16 flex items-center justify-center shadow">
              <p className="font-bold">{y}</p>
            </div>
            <p>=</p>
            <input
              className="rounded-2xl bg-white w-12 h-16 font-bold text-center"
              onChange={(e) => setUserAnswer(e.currentTarget.value)}
              type="text"
            />
          </section>
          <footer className="flex gap-4 mr-8 self-end">
            <button
              className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 text-white"
              onClick={() => checkUserAnswer()}
            >
              Rätta
            </button>
            <button
              className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 text-white"
              onClick={
                counting == "+"
                  ? () => startAddition()
                  : () => startSubstraction()
              }
            >
              Nytt tal
            </button>
            <button
              onClick={() => [setIsOpen(!isOpen), () => setCounting(null)]}
              className="bg-white text-black px-10 py-4 rounded-full font-bold  hover:border-2 "
            >
              Byt Räknesätt
            </button>
          </footer>
        </section>
      </>
    );
  };

  const RaknaModal = () => {
    return (
      <div className="flex flex-col gap-10 bg-white text-black w-2xl rounded-2xl drop-shadow-lg min-h-52">
        <h2 className="text-3xl text-center mt-4">Jag vill räkna:</h2>
        {levels.map((level, i) => {
          return (
            <label
              onClick={() => handleLevelDecision(level.counting)}
              key={i}
              htmlFor=""
            >
              <input className="mx-2 cursor-pointer bg-white" type="radio" />
              {level.counting} {level.level}
            </label>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {isOpen ? <RaknaModal /> : <GameComponent />}
      </div>
    </>
  );
};

export default Rakna;
