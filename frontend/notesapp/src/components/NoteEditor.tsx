import React, { useState } from "react";

interface Note {
  text: string;
  color: string;
  id: number;
}

interface NoteEditorProps {
  onNoteAdd: (newNote: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onNoteAdd }) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleNoteAdd = () => {
    const newNote: Note = {
      text: text,
      color: 'white',
      id: Date.now(),
    };
    onNoteAdd(newNote);
    setText("");
  };

  // const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setColor(event.target.value);
  // };

  return (
    <div className="my-4">
      <textarea
        placeholder="Enter your note here..."
        rows={5}
        className="w-96 py-2 pl-2 rounded-md"
        value={text}
        onChange={handleTextChange}
      />
      <br/>
      <button className="hover:bg-white hover:text-black hover:border-black border-solid bg-black py-2 px-8 rounded-md text-white ml-36 my-4 border-white border" onClick={handleNoteAdd}>
        Add
      </button>
      {/* <div className="" onChange={handleColorChange}>
        <input
          type="radio"
          className="h-6 w-6 p-3"
          name="color-pick"
          value=""
        />
        {/* <label htmlFor="color1" style={{ backgroundColor: "#F06292" }}></label> */}

        {/* <input
          type="radio"
          name="color-pick"
          className="h-6 w-6 p-3 my-4"
          value="#BA68C8"
          id="color2"
        /> */}
        {/* <label htmlFor="color2" style={{ backgroundColor: "#BA68C8" }}></label> */}

        {/* <input
          type="radio"
          name="color-pick"
          className="h-6 w-6 p-3 my-4"
          value="#FFD54F"
          id="color3"
        /> */}
        {/* <label htmlFor="color3" style={{ backgroundColor: "#FFD54F" }}></label> */}

        {/* <input
          type="radio"
          name="color-pick"
          className="h-6 w-6 p-3 my-4"
          value="#4FC3F7"
          id="color4"
        /> */}
        {/* <label htmlFor="color4" className='bg-amber-300'></label> */}

        {/* <input type="radio" name="color-pick" className="h-6 w-6" id="color5" />
        <br /> */}
      {/* </div> */}
    </div>
  );
};

export default NoteEditor;
