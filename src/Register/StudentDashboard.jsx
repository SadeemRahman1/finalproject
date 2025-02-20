import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    GraduationCap,
    Settings,
    PieChart,
    ClipboardList,
    Book, Clock, Calendar as CalendarIcon,
    X, Bell
} from 'lucide-react';

// Sample course data by department and semester
const coursesByDepartmentAndSemester = {
    'Computer Science': {
        1: ["Introduction to Programming", "Calculus I", "English Composition", "Physics I", "Digital Logic Design", "Islamic Studies"],
        2: ["Object-Oriented Programming", "Calculus II", "Technical Writing", "Physics II", "Data Structures", "Pakistan Studies"],
        3: ["Data Structures and Algorithms", "Discrete Mathematics", "Database Systems", "Computer Architecture", "Web Programming", "Probability and Statistics"],
        4: ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Automata", "Human Computer Interaction", "Numerical Computing"],
        5: ["Artificial Intelligence", "Design and Analysis of Algorithms", "Computer Graphics", "Information Security", "Mobile Application Development", "Professional Practices"],
        6: ["Machine Learning", "Compiler Construction", "Distributed Systems", "Cloud Computing", "Software Project Management", "Final Year Project I"],
        7: ["Deep Learning", "Natural Language Processing", "Internet of Things", "Blockchain Technology", "Final Year Project II", "Entrepreneurship"],
        8: ["Data Mining", "Big Data Analytics", "Computer Vision", "Quantum Computing", "Final Year Project III", "Professional Ethics"]
    },
    'Electrical Engineering': {
        1: ["Engineering Mathematics I", "Physics for Engineers", "Basic Electrical Engineering", "Engineering Drawing", "Introduction to Computing", "Communication Skills"],
        2: ["Engineering Mathematics II", "Circuit Analysis", "Digital Logic Design", "Programming Fundamentals", "Workshop Practice", "Islamic Studies"],
        3: ["Linear Control Systems", "Electronic Devices and Circuits", "Signals and Systems", "Probability and Random Variables", "Power Generation", "Engineering Economics"],
        4: ["Digital Signal Processing", "Microprocessor and Microcontroller", "Electromagnetic Theory", "Power Transmission and Distribution", "Communication Systems", "Technical Report Writing"],
        5: ["Power Electronics", "Digital Communication", "Instrumentation and Measurement", "Computer Networks", "RF and Microwave Engineering", "Professional Ethics"],
        6: ["High Voltage Engineering", "Wireless Communication", "Electric Machines", "VLSI Design", "Control Engineering", "Final Year Project I"],
        7: ["Power System Analysis", "Antenna and Wave Propagation", "Embedded Systems", "Renewable Energy Systems", "Final Year Project II", "Entrepreneurship"],
        8: ["Smart Grid Technology", "Satellite Communication", "Robotics and Automation", "Power System Protection", "Final Year Project III", "Project Management"]
    },
    'Mechanical Engineering': {
        1: ["Engineering Mechanics", "Engineering Drawing", "Materials Science", "Workshop Technology", "Calculus and Analytical Geometry", "Communication Skills"],
        2: ["Thermodynamics I", "Manufacturing Processes", "Engineering Materials", "Computer-Aided Design", "Differential Equations", "Islamic Studies"],
        3: ["Fluid Mechanics", "Machine Design I", "Mechanics of Materials", "Electrical Engineering", "Numerical Analysis", "Technical Report Writing"],
        4: ["Thermodynamics II", "Machine Design II", "Dynamics of Machinery", "Metallurgy", "Electronics for Mechanical Engineers", "Pakistan Studies"],
        5: ["Heat and Mass Transfer", "Theory of Machines", "Mechanical Vibrations", "Internal Combustion Engines", "Hydraulics and Pneumatics", "Engineering Economics"],
        6: ["Refrigeration and Air Conditioning", "Automobile Engineering", "Manufacturing Automation", "Industrial Engineering", "Professional Ethics", "Final Year Project I"],
        7: ["Power Plant Engineering", "Control Engineering", "Renewable Energy Systems", "Computer Integrated Manufacturing", "Final Year Project II", "Entrepreneurship"],
        8: ["Mechanical Design Project", "Robotics and Mechatronics", "Advanced Manufacturing Processes", "Engineering Management", "Final Year Project III", "Project Management"]
    }
};

// Sample data for announcements
const announcements = [
    {
        id: '1',
        title: 'Midterm Schedule Update',
        content: 'The midterm exam has been rescheduled to next Friday.',
        date: '2024-03-15',
        course: 'Introduction to Computer Science',
    },
    {
        id: '2',
        title: 'New Assignment Posted',
        content: 'Please check the new assignment in Module 5.',
        date: '2024-03-14',
        course: 'Advanced Mathematics',
    },
    {
        id: '3',
        title: 'Workshop Registration',
        content: 'Register for the upcoming programming workshop by Monday.',
        date: '2024-03-16',
        course: 'Web Programming',
    },
];

// Function to generate mock course outline
const generateCourseOutline = (courseName) => {
    return {
        name: courseName,
        instructor: `Dr. ${['Ahmad', 'Khan', 'Malik', 'Javed', 'Riaz'][Math.floor(Math.random() * 5)] + ' ' + ['Ali', 'Hassan', 'Raza', 'Hussain', 'Shah'][Math.floor(Math.random() * 5)]}`,
        lectureCount: Math.floor(Math.random() * 10) + 30,
        schedule: {
            days: ['Monday', 'Wednesday'].sort(() => Math.random() - 0.5).slice(0, 2),
            time: ['9:00 AM - 10:30 AM', '11:00 AM - 12:30 PM', '2:00 PM - 3:30 PM'][Math.floor(Math.random() * 3)]
        },
        assessment: {
            assignments: Math.floor(Math.random() * 3) + 4,
            quizzes: Math.floor(Math.random() * 4) + 2,
            presentations: Math.floor(Math.random() * 2) + 1,
            projects: Math.floor(Math.random() * 2)
        },
        topics: [
            'Introduction to the subject',
            'Fundamental concepts',
            'Advanced applications',
            'Practical implementations',
            'Research methodologies'
        ],
        grading: {
            assignments: '20%',
            quizzes: '15%',
            presentations: '10%',
            projects: '15%',
            midterm: '15%',
            final: '25%'
        }
    };
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    
    // Get student data from localStorage
    const student = localStorage.getItem("student");
    const studentData = JSON.parse(student) || {
        name: "Student Name",
        department: "Computer Science",
        semester: 3
    };

    // Get courses for the student's department and semester
    const departmentCourses = coursesByDepartmentAndSemester[studentData.department] || {};
    const semesterCourses = departmentCourses[studentData.semester] || [];

    // Create course objects
    const courses = semesterCourses.map((course, index) => ({
        id: index + 1,
        name: course,
        instructor: `Dr. ${['Ahmad', 'Khan', 'Malik'][Math.floor(Math.random() * 3)]}`,
        progress: Math.floor(Math.random() * 100),
    }));

    // Create assignments
    const assignments = courses.map((course, index) => ({
        id: index + 1,
        title: `Assignment for ${course.name}`,
        course: course.name,
        dueDate: new Date(Date.now() + (Math.random() * 14 + 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: ['pending', 'submitted', 'graded'][Math.floor(Math.random() * 3)],
    }));

    // Create schedule from the courses with random days and times
    const generateSchedule = (courses) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const times = ['9:00 AM - 10:30 AM', '11:00 AM - 12:30 PM', '1:00 PM - 2:30 PM', '3:00 PM - 4:30 PM'];
        
        return courses.map((course, index) => ({
            id: index + 1,
            course: course.name,
            time: times[Math.floor(Math.random() * times.length)],
            day: days[Math.floor(Math.random() * days.length)]
        }));
    };

    const displayCourses = courses.slice(0, 6);
    const displayAssignments = assignments.slice(0, 3);
    const courseSchedule = generateSchedule(displayCourses);

    // Handle course click
    const handleCourseClick = (course) => {
        setSelectedCourse(generateCourseOutline(course.name));
        setShowModal(true);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col shadow-xl">
                <div className="px-4 py-6 text-center bg-blue-800">
                    <img
                        src="src/assets/NCBA&E.png"
                        alt="NCBA&E Logo"
                        className="mx-auto h-20 w-20 mb-2 transition-all duration-300 hover:scale-105"
                    />
                    <h1 className="text-xl font-bold tracking-wider">NCBA&E LMS</h1>
                </div>
                <nav className="flex-1 px-4 mt-6">
                    <ul>
                        <li className="my-2">
                            <a
                                href="/studentdashboard"
                                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white bg-blue-600 shadow-md transition-all duration-300 hover:bg-blue-500 hover:translate-x-1"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentcourses"
                                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                            >
                                <BookOpen className="w-5 h-5" />
                                Courses
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentassignments"
                                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                            >
                                <Calendar className="w-5 h-5" />
                                Assignments
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentschedule"
                                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                            >
                                <CalendarIcon className="w-5 h-5" />
                                Class Schedule
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentannouncements"
                                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-blue-600 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                            >
                                <Bell className="w-5 h-5" />
                                Announcements
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 mt-auto">
                    <button className="w-full bg-red-600 py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-95 shadow-md flex items-center justify-center gap-2"
                        onClick={() => {
                            localStorage.removeItem("student");
                            navigate("/studentsignin");
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 ml-64 overflow-auto">
                <header className="mb-8 bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-800">
                            Welcome, {studentData.name}
                        </h1>
                        <p className="text-gray-600 mt-1">Have a productive day!</p>
                    </div>
                    <div className="text-right bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-gray-700">Department: <span className="font-semibold text-blue-700">{studentData.department}</span></p>
                        <p className="text-sm text-gray-700">Semester: <span className="font-semibold text-blue-700">{studentData.semester}</span></p>
                    </div>
                </header>

                {/* Grid Layout for Dashboard Sections */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* My Courses Section - Modified to make courses clickable */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-800">My Courses</h2>
                            <Book className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {displayCourses.map((course) => (
                                <div 
                                    key={course.id} 
                                    className="space-y-2 p-4 border border-gray-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-all hover:border-blue-200 hover:scale-[1.02]"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-gray-900">{course.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-2 bg-blue-600 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assignments Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-800">Upcoming Deadlines</h2>
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {displayAssignments.map((assignment) => (
                                <div key={assignment.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-all hover:border-blue-200">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                                        <p className="text-sm text-gray-600">{assignment.course}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{assignment.dueDate}</p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${assignment.status === 'submitted'
                                                ? 'bg-green-100 text-green-600'
                                                : assignment.status === 'graded'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-amber-100 text-amber-600'
                                                }`}
                                        >
                                            {assignment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-800">Announcements</h2>
                            <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {announcements.map((announcement) => (
                                <div key={announcement.id} className="space-y-2 p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-all hover:border-blue-200">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{announcement.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{announcement.content}</p>
                                    <p className="text-xs text-gray-500">{announcement.course}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Class Schedule Section - Updated to use the same courses and with scrollbar */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-800">Class Schedule</h2>
                            <CalendarIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {courseSchedule.map((schedule) => (
                                <div 
                                    key={schedule.id} 
                                    className="space-y-2 p-4 border border-gray-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-all hover:border-blue-200 hover:scale-[1.02]"
                                    onClick={() => {
                                        const course = displayCourses.find(c => c.name === schedule.course);
                                        if (course) handleCourseClick(course);
                                    }}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-gray-900">{schedule.course}</h3>
                                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{schedule.day}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-gray-500" /> {schedule.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Course Detail Modal - Enhanced UI */}
            {showModal && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b bg-blue-50">
                            <h2 className="text-2xl font-bold text-blue-800">{selectedCourse.name}</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Instructor Information */}
                            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                                    <GraduationCap className="w-5 h-5 mr-2" /> Instructor
                                </h3>
                                <p className="text-gray-700 font-medium">{selectedCourse.instructor}</p>
                            </div>
                            
                            {/* Course Schedule */}
                            <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" /> Schedule
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p className="text-gray-700">
                                        <span className="font-medium text-blue-600">Days:</span> {selectedCourse.schedule.days.join(', ')}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium text-blue-600">Time:</span> {selectedCourse.schedule.time}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium text-blue-600">Total Lectures:</span> {selectedCourse.lectureCount}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Assessment Information */}
                            <div className="space-y-3 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                                    <ClipboardList className="w-5 h-5 mr-2" /> Assessment
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p className="text-gray-700">
                                        <span className="font-medium text-indigo-600">Assignments:</span> {selectedCourse.assessment.assignments}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium text-indigo-600">Quizzes:</span> {selectedCourse.assessment.quizzes}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium text-indigo-600">Presentations:</span> {selectedCourse.assessment.presentations}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium text-indigo-600">Projects:</span> {selectedCourse.assessment.projects}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Course Topics */}
                            <div className="space-y-3 bg-green-50 p-4 rounded-lg border border-green-100">
                                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2" /> Main Topics
                                </h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {selectedCourse.topics.map((topic, index) => (
                                        <li key={index} className="text-gray-700">{topic}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Grading Scheme */}
                            <div className="space-y-3 bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                                    <PieChart className="w-5 h-5 mr-2" /> Grading Scheme
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedCourse.grading).map(([key, value]) => (
                                        <p key={key} className="text-gray-700">
                                            <span className="font-medium text-purple-600">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 border-t bg-gray-50 flex justify-end">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for custom scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c5d6f6;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ab5e9;
                }
            `}</style>
        </div>
    );
};

export default StudentDashboard;