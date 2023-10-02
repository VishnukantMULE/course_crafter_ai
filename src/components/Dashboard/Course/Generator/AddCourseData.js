import React, { useState } from 'react';
import './style/AddCourseData.css';

export default function AddCourseData({ onGoBack }) {
    const [courseName, setCourseName] = useState('');
    const [isCourseNameEditing, setIsCourseNameEditing] = useState(true);
    const [modules, setModules] = useState([]);
    const [newModule, setNewModule] = useState('');
    const [editModule, setEditModule] = useState({ index: null, text: '' });

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

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                {isCourseNameEditing ? (
                    <>
                        <h2>Enter Course Name:</h2>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Course Name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSaveCourseName}>
                            Save Course Name
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="mb-4">{courseName}</h2>
                    </>
                )}
            </div>
            {modules.map((module, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Module {index + 1}:</label>
                    <div className="input-group">
                        {editModule.index === index ? (
                            <input
                                type="text"
                                className="form-control"
                                value={editModule.text}
                                onChange={(e) => setEditModule({ ...editModule, text: e.target.value })}
                            />
                        ) : (
                            <input
                                type="text"
                                className="form-control"
                                value={module}
                                disabled
                            />
                        )}
                        {editModule.index === index ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleSaveModule}
                            >
                                Save
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEditModule(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteModule(index)}
                                >
                                    Delete
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
                    <button className="btn btn-primary" onClick={handleAddModule}>
                        Add Module
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={handleGoBack}>
                    Back
                </button>
                <button className="btn btn-success">Create</button>
            </div>
        </div>
    );
}
