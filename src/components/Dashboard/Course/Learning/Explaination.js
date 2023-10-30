import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './style/Explaination.css'
import LoadVideo from './LoadVideo';
import loadingpng from './style/ICONS/loading.png'

export default function Explanation({ courseId, selectedChapter, selectedModule }) {
  const [chapterData, setChapterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state to handle loading state
 const updateCompletion = async (courseId, moduleNo, chapterNo) => {
        try {
            const response = await axios.post(`${process.env.URL}/updateCompletionStatus`, {
                courseId,
                moduleNo,
                chapterNo,
            });

            console.log('Chapter completion status updated:', response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error(`Error updating chapter completion status: ${error.response.data.message}`);
                if (error.response.data.error === "ChapterAlreadyCompleted") {
                    // Handle the ChapterAlreadyCompleted error specifically
                    console.error('Chapter already marked as completed for this module.');
                }
            } else {
                console.error('Error updating chapter completion status:', error);
            }
        }
    };

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        let responseData = null;
        if (selectedChapter === null) {
          // Handle default case for module1 and chapter1
          responseData = await axios.post(`${process.env.URL}/getchapterdata`, {
            courseId,
            moduleNumber: 1, // Default module number (module1)
            chapterNumber: 1, // Default chapter number (chapter1)
          });
        } else {
          // Fetch data for selected chapter
          responseData = await axios.post(`${process.env.URL}/getchapterdata`, {
            courseId,
            moduleNumber: selectedModule + 1,
            chapterNumber: selectedChapter.chapterIndex + 1,
          });
        }

        setChapterData(responseData.data.chapter);
        setIsLoading(false); // Set loading state to false after data is received

        console.log('Data received from the backend:', responseData.data.chapter);
        if (responseData.data.chapter) {
                console.log('Fetching data for courseId:', courseId, 'module:', selectedModule, 'chapter:', selectedChapter.chapterIndex);

          updateCompletion(courseId, selectedModule+1, selectedChapter.chapterIndex);
        }
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    };

    fetchDataFromBackend();
  }, [courseId, selectedChapter, selectedModule]);

  return (
    <div className="chapter-container">
    {isLoading ? (
      <img src={loadingpng} alt="Loading" className="loading-spinner" /> // Loading spinner image
    ) : chapterData ? (
      <div>
        {/* <h2>{courseId}</h2> */}
        <h2>Chapter Name: {chapterData.chapter_name}</h2>
        <LoadVideo videolink={chapterData.chapter_link} />
        <div className="table-style">
          <h3>Explanation Content:</h3>
          <ReactMarkdown>{chapterData.chapter_explanation}</ReactMarkdown>
        </div>
      </div>
    ) : (
      <p>Error loading chapter data.</p> // Message for error state
    )}
  </div>
  );
}
