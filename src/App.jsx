import "./App.css";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <div className="">
        <header className="p-10 flex flex-col items-center">
          <h1 className="font-bold text-4xl text-white">
            Välkommen till spelstugan
          </h1>
          <h2 className="pt-6 text-xl">Vad vill du hitta på idag?</h2>
        </header>
        <Navigation />
      </div>
    </>
  );
}

export default App;
