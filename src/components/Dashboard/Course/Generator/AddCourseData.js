import React, { useState } from 'react';
import './style/AddCourseData.css';
import { useAuth } from '../../../Auth/AuthContext'

import Axios from 'axios';
import Progress from './Progress';
import GeneratedCourse from './GeneratedCourse';
import addpng from './style/ICONS/add.png'
import backpng from './style/ICONS/back.png'
import deletepng from './style/ICONS/delete.png'
import editpng from './style/ICONS/edit.png'
import genratepng from './style/ICONS/ai.png'

export default function AddCourseData({ onGoBack }) {
    const { userid } = useAuth();
    const [courseName, setCourseName] = useState('');
    const [isCourseNameEditing, setIsCourseNameEditing] = useState(true);
    const [modules, setModules] = useState([]);
    const [newModule, setNewModule] = useState('');
    const [editModule, setEditModule] = useState({ index: null, text: '' });
    const [componentToShow, setComponentToShow] = useState('addCourseData'); // default to 'addCourseData'

    const handleSaveCourseName = () => {
        setIsCourseNameEditing(false);
    };

    const handleAddModule = () => {
        if (newModule.trim() !== '') {
            setModules([...modules, newModule]);
            setNewModule('');
        }
    };

    const handleEditModule = (index) => {
        setEditModule({ index, text: modules[index] });
    };

    const handleSaveModule = () => {
        const updatedModules = [...modules];
        updatedModules[editModule.index] = editModule.text;
        setModules(updatedModules);
        setEditModule({ index: null, text: '' });
    };

    const handleDeleteModule = (index) => {
        const updatedModules = modules.filter((_, i) => i !== index);
        setModules(updatedModules);
    };

    const handleGoBack = () => {
        onGoBack();
    };
    const [generatedCourseData, setGeneratedCourseData] = useState(null);


    const handleCreateCourse = () => {
        const data = {
            courseName: courseName,
            modules: modules,
            userid: userid,
        };
        setComponentToShow('progress'); // show the progress component

        Axios.post(`https://coursecrafterai.onrender.com/api/saveCourseData`, data)
            .then((response) => {
                setGeneratedCourseData(response.data); // Store the API response in state

                setComponentToShow('generatedCourse'); // show the generated course component
                alert('Course Created Successfully', response.data);
            })
            .catch((error) => {
                setComponentToShow('addCourseData'); // show the add course data component
                alert('Error in creating course', error);
            });
    };

    switch (componentToShow) {
        case 'addCourseData':
            return (
                <div className="container mt-5">
                    <div className="text-center mb-4">
                        {isCourseNameEditing ? (
                            <>
                                <h2 className="heading">Enter Course Name:</h2>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Course Name"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                />
                                <button className="btn button" onClick={handleSaveCourseName}>
                                    Save Course Name
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="mb-4 heading">{courseName}</h2>
                            </>
                        )}
                    </div>
                    {modules.map((module, index) => (
                        <div key={index} className="module-item">
                            <span className="modulenumber">{index + 1}</span>
                            <div className="input-group">
                                {editModule.index === index ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editModule.text}
                                        onChange={(e) => setEditModule({ ...editModule, text: e.target.value })}
                                    />
                                ) : (
                                    <input type="text" className="form-control" value={module} disabled />
                                )}
                                {editModule.index === index ? (
                                    <button className="btn btn-primary" onClick={handleSaveModule}>
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-outline-primary" onClick={() => handleEditModule(index)}>
                                            <img src={editpng} alt="Edit Icon" /> Edit
                                        </button>
                                        <button className="btn  btn-outline-danger" onClick={() => handleDeleteModule(index)}>
                                            <img src={deletepng} alt="Delete Icon" /> Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Add Module:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Module Name"
                                value={newModule}
                                onChange={(e) => setNewModule(e.target.value)}
                            />
                            <button className="btn btn-outline-info" onClick={handleAddModule}>
                            <img src={addpng} alt="ADD Icon" />

                                Add Module
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
                        <img src={backpng} alt="Back Icon" /> 

                            Back
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleCreateCourse}>
                            <img src={genratepng} alt="Ai PNg"  />

                            Create
                        </button>
                    </div>
                </div>
            );
        case 'progress':
            return <Progress />;
        case 'generatedCourse':
            return <GeneratedCourse onGoBack={handleGoBack} courseData={generatedCourseData} />;

        default:
            return null;
    }
}
