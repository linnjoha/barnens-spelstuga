/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { words } from "../constants/words";
import { redirect } from "react-router";

const Skriva = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [level, setLevel] = useState(null);
  const [chosenWords, setChosenWords] = useState([...words]);
  const levels = ["2-4 bokstäver", "4-6 bokstäver", "6 + bokstäver"];

  const handleLevelDecision = (i) => {
    console.log(level);
    setLevel(i);
    const chosenLevelWords = words.filter((word) => word.level == i);
    setChosenWords(chosenLevelWords);
    setIsOpen(false);
  };

  const LevelAlternativs = ({ i, level }) => {
    return (
      <>
        {" "}
        <label className="p-2" htmlFor="">
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

  const levelsComponents = levels.map((level, i) => (
    <LevelAlternativs key={i} level={level} i={i} />
  ));
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };
  const GameComponent = () => {
    const [randomWord, setRandomWord] = useState(null);
    const [userAnswer, setUserAnswer] = useState([]);
    const [shuffledLetters, setShuffledLetters] = useState([]);

    useEffect(() => {
      const word = chosenWords[Math.floor(Math.random() * chosenWords.length)];
      setRandomWord(word);
      setUserAnswer(Array(word.word.length).fill("_"));
      const shuffled = shuffleArray(word.word.split(""));
      setShuffledLetters(shuffled);
    }, [chosenWords]);

    if (!randomWord) return <p>Laddar...</p>;

    const wordArr = randomWord.word.split("");

    const handleDragStart = (e, letter) => {
      e.dataTransfer.setData("letter", letter);
    };

    const handleDrop = (e, i) => {
      e.preventDefault();
      const letter = e.dataTransfer.getData("letter");

      // Kopiera arrayen och uppdatera rätt position
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
      if (isCorretct) {
        alert("heja");
        location.reload();
      } else alert("prova en gång till");
    };
    return (
      <>
        <div className="flex gap-2">
          {shuffledLetters.map((letter, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white w-12 h-16 text-black flex items-center justify-center shadow cursor-pointer"
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
                letter === "_" ? "border-gray-400" : "bg-green-300 border-black"
              }`}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={allowDrop}
              onClick={() => handleRemoveLetter(i)}
            >
              <p className="text-3xl font-bold">{letter}</p>
            </div>
          ))}
        </div>
        <button
          onClick={checkWord}
          className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 mt-6"
        >
          Rätta ordet
        </button>
        <button className="bg-amber-400 px-10 py-4 rounded-full font-bold hover:text-white hover:border-2 mt-6">
          Nytt ord
        </button>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {isOpen ? (
          <div className="flex flex-col bg-white text-black w-2xl pb-4">
            <h2 className="py-4 text-3xl text-center">Välj svårighetsgrad</h2>
            {levelsComponents}
          </div>
        ) : (
          ""
        )}
        {!isOpen ? <GameComponent /> : ""}
      </div>
    </>
  );
};

export default Skriva;
