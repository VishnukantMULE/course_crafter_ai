import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Auth/AuthContext';
import './style/ShowAllNotes.css';
import Loading from '../../../Auth/Loading';

const ShowAllNotes = ({ onEditNote }) => {
  const { userId } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://coursecrafterai.onrender.com/loadallnotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        });

        const data = await response.json();
        setNotes(data.notes || []); // Ensure that notes is an array or default to an empty array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
    // eslint-disable-next-line
  }, [userId]);

  const handleDeleteNote = (noteId) => {
    fetch('https://coursecrafterai.onrender.com/deletenote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId: noteId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newNotes = notes.filter((note) => note.note_id !== noteId);
        setNotes(newNotes);
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  const handleEditNote = (noteId) => {
    if (onEditNote) {
      onEditNote(noteId);
    }
  };

  const createMarkup = (content) => {
    return { __html: content };
  };

  return (
    <div className='my-courses-container'>
      <h2 className='course-headingr'>Created Notes</h2>
      <hr />
      <div className='card-listr'>
        {loading && <Loading />}
        {notes && notes.length === 0 && !loading && <p>No notes are present.</p>}
        <ul className={`card-listr ${loading ? 'hidden' : ''}`}>
          {notes.map((note) => (
            <li className='cardr' key={note.note_id}>
              <div className='card-contentr'>
                <p className='notetitle'>
                  <strong>Notes Title:</strong> {note.note_title}
                </p>
                <p>
                  <strong>Content:</strong>{' '}
                  <span dangerouslySetInnerHTML={createMarkup(note.content)} />
                </p>
              </div>
              <p>
                <strong>Creation Time:</strong> {note.creation_time}
              </p>
              <p>
                <strong>Last Access Time:</strong> {note.last_access_time}
              </p>
              <div className='note-actions'>
                <button onClick={() => handleDeleteNote(note.note_id)}>
                  Delete
                </button>
                <button onClick={() => handleEditNote(note.note_id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowAllNotes;
