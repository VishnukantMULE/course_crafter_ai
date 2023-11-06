import React, { useState } from 'react';
import ShowAllNotes from './Notes/ShowAllNotes';
import CreateNote from './Notes/CreateNote';
import './style/Notes.css'; // Import the external CSS file

export default function Notes() {
  const [showCreateNote, setShowCreateNote] = useState(false);

  const handleCreateNoteClick = () => {
    setShowCreateNote(true);
  };

  const handleCancelButtonClick = () => {
    setShowCreateNote(false);
  };

  return (
    <div className="notes-containerr">
      <div className='my-courses-container '>

      <h2 className="course-headingr">Create New Notes</h2>
      <hr />
        <div className="btnposition">
      <hr />
      {!showCreateNote && (
        <button className="create-note-button" onClick={handleCreateNoteClick}>
          Create Note
        </button>
      )}
      </div>

      </div>
      {showCreateNote && <CreateNote onCancel={handleCancelButtonClick} />}

      {!showCreateNote && <ShowAllNotes />}
    </div>
  );
}
