import React, { useState } from 'react';
import AddCourseData from './Generator/AddCourseData';


export default function CreateCourse() {
  const [isAddCourseInfoVisible, setIsAddCourseInfoVisible] = useState(false);

  const handleCreateCourse = () => {
    setIsAddCourseInfoVisible(true);
  };

  const handleGoBack = () => {
    setIsAddCourseInfoVisible(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div >
            <div className="card text-center">
              <div className="card-body">
                {isAddCourseInfoVisible ? (
                  <AddCourseData onGoBack={handleGoBack} />
                ) : (
                  <div>
                    <h2 className="card-title mb-4">Create Course</h2>
                    <button className="btn btn-primary" onClick={handleCreateCourse}>
                      + Create Course
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
