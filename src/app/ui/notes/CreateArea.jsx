import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [expand, setExpand] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "title") {
      // limit the title to 20 characters
      if (value.length <= 20) {
        setNote((prevNote) => ({
          ...prevNote,
          title: value,
        }));
      }
    } else {
      // For content field, 100 limit
      if (value.length <= 100) {
        setNote((prevNote) => ({
          ...prevNote,
          [name]: value,
        }));
      }
    }
  }

  function submitNote(event) {
    (note.title?.trim() || note.content?.trim()) && props.onAdd(note);

    setNote({
      title: "",
      content: "",
    });
    setExpand(false);
    event.preventDefault();
  }
  function handleExpand() {
    setExpand(true);
  }

  return (
    <div className='pt-20'>
      <form className='relative w-sm md:w-lg my-[30px_auto_20px_auto] px-4 pt-4 pb-2 rounded-xl border-2 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200 bg-white'>
        {expand ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key='textArea'
          >
            <div className='absolute right-0 flex pt-2 pr-3 pointer-events-none'>
              <span
                className={`text-sm ${
                  note.title.length >= 20
                    ? "text-red-500 animate-shake"
                    : "text-gray-500"
                }`}
              >
                {note.title.length}/20
              </span>
            </div>
            <input
              autoFocus
              name='title'
              onChange={handleChange}
              value={note.title}
              placeholder='Title'
              className='w-full border-none outline-none text-xl font-inherit resize-none'
            />
          </motion.div>
        ) : null}

        <textarea
          name='content'
          onChange={handleChange}
          onClick={handleExpand}
          value={note.content}
          placeholder='Take a note...'
          rows={expand ? "3" : "1"}
          className='w-full border-none  outline-none text-xl font-inherit resize-none'
        />
        {expand && (
          <motion.button
            className='absolute flex justify-center items-center right-[18px] bottom-[-18px] bg-buttons text-[#f1f0e8] rounded-full w-9 h-9 shadow-[0_1px_3px_rgba(0,0,0,0.3)] cursor-pointer outline-none'
            onClick={submitNote}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key='button'
          >
            <PencilSquareIcon className='w-5 h-5' />
          </motion.button>
        )}
      </form>
    </div>
  );
}
