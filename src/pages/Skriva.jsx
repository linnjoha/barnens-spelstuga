/* eslint-disable no-unused-vars */
import { useState } from "react";
import { words } from "../constants/words";

const Skriva = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [level, setLevel] = useState(null);
  const [chosenWords, setChosenWords] = useState([...words]);
  const levels = ["2-4 bokstäver", "4-6 bokstäver", "6 + bokstäver"];

  const [randomWord, setRandomWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);

  const handleLevelDecision = (i) => {
    setLevel(i);

    const chosenLevelWords = words.filter((word) => word.level == i);
    setChosenWords(chosenLevelWords);
    startGame();
    setIsOpen(false);
  };

  const LevelAlternativs = ({ i, level }) => {
    return (
      <>
        {" "}
        <label htmlFor="">
          <input
            onClick={() => handleLevelDecision(i)}
            className="mx-2 cursor-pointer bg-white"
            type="radio"
          />
          {level}
        </label>
      </>
    );
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    const word = chosenWords[Math.floor(Math.random() * chosenWords.length)];
    setRandomWord(word);
    setUserAnswer(Array(word.word.length).fill("_"));
    const shuffled = shuffleArray(word.word.split(""));
    setShuffledLetters(shuffled);
  };

  const GameComponent = () => {
    if (!randomWord) return <p>Laddar...</p>;

    const handleDragStart = (e, letter) => {
      e.dataTransfer.setData("letter", letter);
    };

    const handleDrop = (e, i) => {
      e.preventDefault();
      const letter = e.dataTransfer.getData("letter");

      const updatedAnswer = [...userAnswer];
      if (updatedAnswer[i] === "_") {
        updatedAnswer[i] = letter;
        setUserAnswer(updatedAnswer);
      }
    };

    const allowDrop = (e) => e.preventDefault();
    const handleRemoveLetter = (i) => {
      const updatedAnswer = [...userAnswer];
      updatedAnswer[i] = "_";
      setUserAnswer(updatedAnswer);
    };

    const checkWord = () => {
      const isCorretct = userAnswer.join("") === randomWord.word;
      console.log(randomWord);
      if (isCorretct) {
        alert("heja");
        startGame();
      } else alert("prova en gång till");
    };
    return (
      <>
        <div className="w-full h-screen flex flex-col items-center">
          <h2 className="text-3xl font-bold p-10">
            Flytta bokstäverna för att skriva ordet
          </h2>
          <img
            src={randomWord.img_url}
            className={` h-48 w-48 object-contain`}
          />
          <div className="flex gap-2 p-4">
            {shuffledLetters.map((letter, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white w-12 h-16 text-black flex items-center justify-center shadow cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, letter)}
              >
                <p className="font-bold">{letter}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-5">
            {userAnswer.map((letter, i) => (
              <div
                key={i}
                className={`rounded-2xl w-12 h-16 flex items-center justify-center border-2 ${
                  letter === "_"
                    ? "border-gray-400"
                    : "bg-gray-300 border-black"
                }`}
                onDrop={(e) => handleDrop(e, i)}
                onDragOver={allowDrop}
                onClick={() => handleRemoveLetter(i)}
              >
                <p className="text-3xl font-bold">{letter}</p>
              </div>
            ))}
          </div>
          <footer className="w-full flex gap-6 self-end justify-end mt-10 pr-4">
            <button
              onClick={checkWord}
              className="bg-amber-400 px-10 py-4  rounded-full font-bold hover:border-2 border-white "
            >
              Rätta ordet
            </button>
            <button
              onClick={startGame}
              className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 "
            >
              Nytt ord
            </button>
            <button
              onClick={() => {
                setChosenWords(null), setLevel(null), setIsOpen(!isOpen);
              }}
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:text-gray-700 hover:border-1"
            >
              Byt svårighetsgrad
            </button>
          </footer>
        </div>
      </>
    );
  };
  const levelsComponents = levels.map((level, i) => (
    <LevelAlternativs key={i} level={level} i={i} />
  ));

  const LevelsModal = () => {
    return (
      <div className="flex flex-col gap-10 bg-white text-black w-2xl rounded-2xl drop-shadow-lg min-h-72">
        <h2 className="text-3xl text-center mt-4">Välj svårighetsgrad</h2>
        {levelsComponents}
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {isOpen ? <LevelsModal /> : ""}
        {!isOpen ? <GameComponent /> : ""}
      </div>
    </>
  );
};

export default Skriva;
