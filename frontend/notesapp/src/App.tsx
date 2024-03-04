import { useState } from "react";
import NotesApp from "./components/NotesApp";

function App() {
  let [loggedIn, setLogIn] = useState<boolean>(false);
  return (
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-fit flex items-center justify-center flex-col`}>
      {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-56"></div> */}
      {loggedIn ? <NotesApp setLogIn={setLogIn}/> : <div className="h-screen flex items-center justify-center"> <button className="hover:bg-white hover:text-black hover:border-black border-solid bg-black py-4 px-16 rounded-md text-white text-xl border-white border" onClick={() => setLogIn(true)}>Login With Google</button></div>}
    </div>
  );
}

export default App;

// ?