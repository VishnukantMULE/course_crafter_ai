import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useAuth } from '../../../Auth/AuthContext';
import CustomAlert from '../../../../services/CustomAlert';

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
  };
export default function EditNote({ noteId, onCancel }) {
//   const { userId } = useAuth();
  const [noteData, setNoteData] = useState({
    note_title: '',
    content: '',
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBackButtonClick = () => {
    onCancel();
  };

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetch(`https://coursecrafterai.onrender.com/loadnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteId: noteId }),
        });

        if (response.ok) {
          const data = await response.json();
          setNoteData({
            note_title: data.note.note_title,
            content: data.note.content,
          });
        } else {
          console.error('Error fetching note data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    };

    // Call the fetchNoteData function
    fetchNoteData();
  }, [noteId]);


  const saveContent = () => {
    const updatedData = {
      noteId: noteId, 
      note_title: noteData.note_title,
      content: noteData.content,
    };
  
    fetch('https://coursecrafterai.onrender.com/updatenote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage('Successfully saved to backend.');
        setAlertVisible(true);
      })
      .catch((error) => {
        console.error('Error saving edited note:', error);
        setAlertMessage('Error saving to backend.');
        setAlertVisible(true);
      });
  };
  

  const handleEditorChange = (content) => {
    setNoteData((prevData) => ({
      ...prevData,
      content,
    }));
  };

  return (
    <>
      {/* Render your UI components for editing the note */}
      <div>
        <h2>Edit Note</h2>
        <label>Note Title:</label>
        <input
          type="text"
          value={noteData.note_title}
          onChange={(e) =>
            setNoteData((prevData) => ({
              ...prevData,
              note_title: e.target.value,
            }))
          }
        />
        <div className="editor">
          <ReactQuill value={noteData.content} onChange={handleEditorChange} modules={modules} />
        </div>
        <button onClick={saveContent}>Save</button>
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      {alertVisible && <CustomAlert message={alertMessage} onClose={() => setAlertVisible(false)} />}
    </>
  );
}
