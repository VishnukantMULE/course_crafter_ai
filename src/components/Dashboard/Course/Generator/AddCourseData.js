import React, { useState, useEffect } from 'react';
import './style/AddCourseData.css';
import socketIOClient from 'socket.io-client';



import Axios from 'axios';
import Progress from './Progress';
import GeneratedCourse from './GeneratedCourse';
import addpng from './style/ICONS/add.png'
import backpng from './style/ICONS/back.png'
import deletepng from './style/ICONS/delete.png'
import editpng from './style/ICONS/edit.png'
import genratepng from './style/ICONS/ai.png'
import { useAuth } from '../../../Auth/AuthContext';


export default function AddCourseData({ onGoBack }) {
    const { userId } = useAuth();

    const [progressData, setProgressData] = useState({
        progress: 0,
        message: '',
        error: null,
    });

    const [courseName, setCourseName] = useState('');
    const [isCourseNameEditing, setIsCourseNameEditing] = useState(true);
    const [modules, setModules] = useState([]);
    const [newModule, setNewModule] = useState('');
    const [editModule, setEditModule] = useState({ index: null, text: '' });
    const [componentToShow, setComponentToShow] = useState('addCourseData');
    const [Kn_level, setKnLevel] = useState(''); 
    const [Language, setLanguage] = useState('');

    const knowledgeLevels = ['Beginner Level', 'Intermediate Level', 'Professional Level', 'Advanced Level', 'Expert Level'];
    const languages = ['English', 'Marathi', 'Hindi'];
    const defaultKnLevel = 'Beginner Level';
    const defaultLanguage = 'English';

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

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = socketIOClient('https://coursecrafterai.onrender.com');
        setSocket(newSocket);
    
        return () => {
            newSocket.disconnect();
        };
    }, []);
    
    useEffect(() => {
        if (socket) {
            socket.on('progressUpdate', (data) => {
                setProgressData((prevData) => ({
                    ...prevData,
                    progress: prevData.progress + 16.66,
                    message: data.message,
                    error: null, 
                }));
            });
    
            socket.on('error', (errorData) => {
                setProgressData((prevData) => ({
                    ...prevData,
                    error: errorData.message,
                }));
            });
        }
    
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    const handleCreateCourse = () => {
        const data = {
            courseName: courseName,
            modules: modules,
            userid: userId,
            Kn_level: Kn_level || defaultKnLevel,
            Language: Language || defaultLanguage,
        };
        setComponentToShow('progress'); 

        Axios.post(`https://coursecrafterai.onrender.com/generate/generatecourse`, data)
            .then((response) => {
                setGeneratedCourseData(response.data); 
                setComponentToShow('generatedCourse'); 
                console.log(response.data)

                alert('Course Created Successfully', response.data);
            })
            .catch((error) => {
                setComponentToShow('addCourseData'); 
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

                    <div className='kandl'>

                        <div className="mb-3">
                            <label className="form-label">Knowledge Level:</label>
                            <select
                                className="form-select"
                                value={Kn_level}
                                onChange={(e) => setKnLevel(e.target.value)}
                            >
                                <option value="" disabled>Select Knowledge Level</option>
                                {knowledgeLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Language:</label>
                            <select
                                className="form-select"
                                value={Language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="" disabled>Select Language</option>
                                {languages.map((language) => (
                                    <option key={language} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
                            <img src={backpng} alt="Back Icon" />

                            Back
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleCreateCourse}>
                            <img src={genratepng} alt="Ai PNg" />

                            Create
                        </button>
                    </div>

                </div>
            );
        case 'progress':
            return <Progress progressData={progressData} />

        case 'generatedCourse':
            return <GeneratedCourse onGoBack={handleGoBack} courseData={generatedCourseData} />;
        default:
            return null;
    }
}
