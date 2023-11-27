import React, { useState } from 'react';
import ShowAllNotes from './Notes/ShowAllNotes';
import EditNote from './Notes/EditNote'; // Import the EditNote component
import './style/Notes.css'; // Import the external CSS file
import CreateNote from './Notes/CreateNote';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Notes() {
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const handleCreateNoteClick = () => {
    setShowCreateNote(true);
    setEditNoteId(null);
  };

  const handleEditNoteClick = (noteId) => {
    setEditNoteId(noteId);
    setShowCreateNote(false);
  };

  const handleCancelButtonClick = () => {
    setShowCreateNote(false);
    setEditNoteId(null);
  };

  return (
    <div className="notes-containerr">
      {!showCreateNote && !editNoteId && (
        <div className='my-courses-container '>
          <h2 className="course-headingr">Create New Notes</h2>
          <hr />
          <div className="btnposition">
            <hr />
            <button className="create-note-button" onClick={handleCreateNoteClick}>
            <IoIosAddCircleOutline /> &nbsp;
              Create Note
            </button>
          </div>
        </div>
      )}

      {showCreateNote && <CreateNote onCancel={handleCancelButtonClick} />}
      {editNoteId && <EditNote noteId={editNoteId} onCancel={handleCancelButtonClick} />}
      {!showCreateNote && !editNoteId && <ShowAllNotes onEditNote={handleEditNoteClick} />}
    </div>
  );
}