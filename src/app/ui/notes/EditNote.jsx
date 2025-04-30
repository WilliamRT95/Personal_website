import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
function EditNoteModal({ note, onClose, onSave }) {
  const [editedNote, setEditedNote] = useState({
    title: "",
    content: "",
  });
  const modalRef = useRef(null);

  useEffect(() => {
    if (note) {
      setEditedNote({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(editedNote);
  }

  function handleOutsideClick(event) {
    // Check if the click was on the outer div (background)
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className='absolute inset-0 bg-nav/30 flex items-center justify-center z-50 '
      onClick={handleOutsideClick}
    >
      <motion.div
        ref={modalRef}
        className='bg-white rounded-xl p-6 w-sm md:w-full max-w-md border-2 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        key='modal'
      >
        <h2 className='text-xl font-bold mb-4 text-black'>Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='title'
            placeholder='Title'
            value={editedNote.title}
            onChange={handleChange}
            className='w-full border-b-2 border-gray-200 text-black uppercase p-2 mb-4 outline-none'
          />
          <textarea
            name='content'
            placeholder='Take a note...'
            value={editedNote.content}
            onChange={handleChange}
            rows='4'
            className='w-full border-b-2 border-gray-200 text-black p-2 mb-4 outline-none resize-none capitalize'
          />
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-200 rounded-md cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-buttons text-white rounded-md cursor-pointer'
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditNoteModal;
