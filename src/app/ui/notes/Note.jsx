import React from "react";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  function handleEdit() {
    props.onEdit(props.id);
  }

  return (
    <motion.div
      className='relative flex flex-col bg-white rounded-lg p-2.5 w-60 m-4 float-left border-2 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200'
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key={props.id}
    >
      <div className='flex-grow'>
        <h1 className='text-[1.1em] mb-1.5 text-black uppercase whitespace-pre-wrap break-words'>
          {props.title}
        </h1>
        <p className='text-black text-[1.1em] whitespace-pre-wrap break-words capitalize'>
          {props.content}
        </p>
      </div>
      <div className='flex justify-end space-x-2 mt-2'>
        <button
          onClick={handleEdit}
          className='p-1 text-gray-400 cursor-pointer'
        >
          <PencilIcon className='w-5 h-5 hover:text-nav transition' />
        </button>
        <button
          onClick={handleClick}
          className='p-1 text-gray-400 cursor-pointer'
        >
          <TrashIcon className='w-5 h-5 hover:text-[#E57373] transition' />
        </button>
      </div>
    </motion.div>
  );
}
