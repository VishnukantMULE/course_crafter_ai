import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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
  const [value, setValue] = useState('');

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


  return (
    <div className="notes">
      <div className="editore">
      <ReactQuill defaultValue={value} onChange={setValue} modules={modules} />
      </div>
      
      <button className='buttonsave' onClick={saveContent}>Save</button>
      <button className='buttonsave' onClick={loadContent}>Load</button>
      <button className='buttonsave' onClick={exportPDF}>Export as PDF</button>
      
    </div>
  );
}

export default Notes;
