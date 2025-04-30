"use client";
import { useState } from "react";
import CreateArea from "../ui/notes/CreateArea";
import Note from "../ui/notes/Note";
import EditNoteModal from "../ui/notes/EditNote";
import Navbar from "../ui/Navbar";
import Image from "next/image";
import Footer from "../ui/footer";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNote(id) {
    const noteToEdit = notes[id];
    setEditingNote({ ...noteToEdit, id });
  }

  function saveEditedNote(editedNote) {
    setNotes((prevNotes) => {
      return prevNotes.map((note, index) => {
        if (index === editingNote.id) {
          return {
            title: editedNote.title,
            content: editedNote.content,
          };
        }
        return note;
      });
    });
    setEditingNote(null);
  }
  function closeModal() {
    setEditingNote(null);
  }
  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center h-screen p-4 pt-20 rounded-2xl'>
        <div className='relative inline-block font-caveat'>
          <Image
            src='/images/profilepic.png'
            alt='profile picture'
            width={75} // 30% of original size
            height={64.2}
            className='block transition-all duration-300 ease-out'
            style={{
              position: "fixed",
              top: "20px", // Below your navbar
              left: "20px",
              zIndex: 100,
              marginTop: 0,
            }}
          />
        </div>
        <CreateArea onAdd={addNote} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:max-w-5xl mt-4'>
          {notes.map((noteItem, index) => {
            return (
              <div key={index} className='h-auto'>
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                  onEdit={editNote}
                />
              </div>
            );
          })}
        </div>

        {editingNote && (
          <EditNoteModal
            note={editingNote}
            onClose={closeModal}
            onSave={saveEditedNote}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
