import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useAuth } from '../../../Auth/AuthContext';
import Modal from 'react-modal';
import './style/CreateNotes.css';
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
export default function CreateNote({ onCancel }) {
  const { userId } = useAuth();
  const [value, setValue] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [noteTitle, setNoteTitle] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBackButtonClick = () => {
    onCancel();
  };

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (noteTitle) {
      setModalIsOpen(false);
    } else {
      setAlertMessage('Note title cannot be empty.');
      setAlertVisible(true);
    }
  };

  const saveContent = () => {
    localStorage.setItem('content', value);
  };

  const loadContent = () => {
    const savedContent = localStorage.getItem('content');
    if (savedContent) setValue(savedContent);
  };

  const exportPDF = () => {
    html2canvas(document.querySelector(".ql-editor")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [210, 297]);
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");
    });
  };

  const handleEditorChange = (content, delta, source, editor) => {
    setValue(content);
  };

  const saveToBackend = () => {
    const deltaContent = JSON.stringify(value);

    fetch('https://coursecrafterai.onrender.com/notes/savenotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, note_title: noteTitle, content: deltaContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Saved to backend:', data);
        setAlertMessage('Successfully saved to backend.');
        setAlertVisible(true);
      })
      .catch((error) => {
        console.error('Error saving to backend:', error);
        setAlertMessage('Error saving to backend.');
        setAlertVisible(true);
      });
  };

  return (
    <>
      <Modal className='modal-container' isOpen={modalIsOpen}>
        <div className='modal-content'>
          <h2 className='modal-title'>Enter Note Title</h2>
          <input
            className='modal-input'
            type="text"
            placeholder="Enter Note Title"
            value={noteTitle}
            onChange={handleTitleChange}
          />
          <div className='button-container'>
            <button className='modal-button' onClick={handleBackButtonClick}>Back</button>
            <button className='modal-button' onClick={handleTitleSubmit}>Next</button>
          </div>
        </div>
      </Modal>


      <div className="notes">
        <div className="editor">
          <ReactQuill value={value} onChange={handleEditorChange} modules={modules} />
        </div>

        <button className='buttonsave' onClick={saveContent}>Save</button>
        <button className='buttonsave' onClick={saveToBackend}>
          Save to Backend
        </button>
        <button className='buttonsave' onClick={loadContent}>Load</button>
        <button className='buttonsave' onClick={exportPDF}>Export as PDF</button>
      </div>
      {alertVisible && (
        <CustomAlert message={alertMessage} onClose={() => setAlertVisible(false)} />
      )}
    </>
  );
}
