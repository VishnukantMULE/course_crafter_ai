import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useAuth } from '../../Auth/AuthContext';



import './style/Notes.css'



const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // added more header levels
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }], // added font button
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video']
  ],
};


function Notes() {
  const {userId} = useAuth();
  const [value, setValue] = useState('');
  // const [editorValue, setEditorValue] = useState('');

  

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
  
  fetch('https://coursecrafterai.onrender.com/savenotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, content: deltaContent }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Saved to backend:', data);
    })
    .catch((error) => {
      console.error('Error saving to backend:', error);
    });
};


  return (
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
  );
}

export default Notes;
