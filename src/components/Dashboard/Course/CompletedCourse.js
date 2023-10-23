import React from 'react';
import GeneratedCourse from './Generator/GeneratedCourse'
const courseData = 
  {
    "step": 1,
    "message": "Initial JSON generated successfully.",
    "courseData": {
        "course_name": "Web Development",
        "modules": [
            {
                "module_no": 1,
                "module_name": "HTML and CSS",
                "chapters": [
                    "Introduction to HTML",
                    "HTML Basics",
                    "HTML Tags",
                    "HTML Attributes",
                    "HTML Formatting"
                ]
            },
            {
                "module_no": 2,
                "module_name": "JavaScript",
                "chapters": [
                    "Introduction to JavaScript",
                    "JavaScript Basics",
                    "JavaScript Variables",
                    "JavaScript Functions",
                    "JavaScript Objects"
                ]
            },
            {
                "module_no": 3,
                "module_name": "jQuery",
                "chapters": [
                    "Introduction to jQuery",
                    "jQuery Basics",
                    "jQuery Events",
                    "jQuery Plugins",
                    "jQuery AJAX"
                ]
            },
            {
                "module_no": 4,
                "module_name": "Bootstrap",
                "chapters": [
                    "Introduction to Bootstrap",
                    "Bootstrap Basics",
                    "Bootstrap Grid System",
                    "Bootstrap Components",
                    "Bootstrap Responsive Design"
                ]
            },
            {
                "module_no": 5,
                "module_name": "PHP",
                "chapters": [
                    "Introduction to PHP",
                    "PHP Basics",
                    "PHP Variables",
                    "PHP Functions",
                    "PHP Objects"
                ]
            },
            {
                "module_no": 6,
                "module_name": "MySQL",
                "chapters": [
                    "Introduction to MySQL",
                    "MySQL Basics",
                    "MySQL Data Types",
                    "MySQL Tables",
                    "MySQL Queries"
                ]
            },
            {
                "module_no": 7,
                "module_name": "Node.js",
                "chapters": [
                    "Introduction to Node.js",
                    "Node.js Basics",
                    "Node.js Modules",
                    "Node.js Events",
                    "Node.js Streams"
                ]
            },
            {
                "module_no": 8,
                "module_name": "AngularJS",
                "chapters": [
                    "Introduction to AngularJS",
                    "AngularJS Basics",
                    "AngularJS Directives",
                    "AngularJS Services",
                    "AngularJS Routing"
                ]
            },
            {
                "module_no": 9,
                "module_name": "React",
                "chapters": [
                    "Introduction to React",
                    "React Basics",
                    "React Components",
                    "React State Management",
                    "React Hooks"
                ]
            },
            {
                "module_no": 10,
                "module_name": "Vue.js",
                "chapters": [
                    "Introduction to Vue.js",
                    "Vue.js Basics",
                    "Vue.js Components",
                    "Vue.js Data Binding",
                    "Vue.js Routing"
                ]
            }
        ]
    }

};




export default function CompletedCourse() {
 
  return (
    <div>


      <GeneratedCourse courseData={courseData} />
    </div>
  );
}