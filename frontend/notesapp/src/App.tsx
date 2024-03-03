import { useState } from "react";
import NotesApp from "./components/NotesApp";

function App() {
  let [loggedIn, setLogIn] = useState<boolean>(false);
  return (
    // {loggedIn ?  <NotesApp /> : <div className="bg-gradient-to-r from-purple-500 to-pink-500 pl-36 pt-16 h-screen"></div>}
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-screen flex items-center justify-center`}>
      
      {loggedIn ? <NotesApp setLogIn={setLogIn}/> : <button className="hover:bg-white hover:text-black hover:border-black border-solid bg-black py-4 px-16 rounded-md text-white text-xl border-white border" onClick={() => setLogIn(true)}>Login With Google</button>}
    </div>
  );
}

export default App;