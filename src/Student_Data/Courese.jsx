import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    GraduationCap,
    Settings,
    Bell,
    Book,
    Clock,
    Calendar as CalendarIcon,
    BookMarked,
    BarChart3,
    Users,
    Info
} from 'lucide-react';

const Student_Courses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const student = localStorage.getItem("student");
    const studentData = JSON.parse(student);

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

    // Process course data
    const courseNames = Array.isArray(studentData?.courses)
        ? studentData.courses
        : [];

    const courses = courseNames.map((course, index) => {
        const baseCourse = {
            id: index + 1,
            name: typeof course === 'string' ? course : course.name || 'Unknown Course',
            instructor: typeof course === 'object' ? course.instructor || 'TBD' : 'TBD',
            progress: typeof course === 'object' ? course.progress || 0 : 0,
        };

        // Use generateCourseOutline after it's defined
        const courseOutline = generateCourseOutline(baseCourse.name);
        return {
            ...baseCourse,
            ...courseOutline,
            progress: baseCourse.progress // Keep original progress if available
        };
    });

    // Function to determine if a nav link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col shadow-xl">
                <div className="px-4 py-6 text-center bg-blue-800">
                    <img 
  src="https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/NCBA%26E.png?raw=true" 
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
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentdashboard') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentcourses"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentcourses') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
                            >
                                <BookOpen className="w-5 h-5" />
                                Courses
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentassignments"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentassignments') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
                            >
                                <Calendar className="w-5 h-5" />
                                Assignments
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentschedule"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentschedule') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
                            >
                                <CalendarIcon className="w-5 h-5" />
                                Class Schedule
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentannouncements"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentannouncements') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
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
            <main className="flex-1 p-6 ml-64 overflow-auto"
                style={{
                      backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,

                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
                }}>
                <header className="mb-8 bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-800">
                            Welcome, {studentData.name}
                        </h1>
                        <p className="text-gray-600 mt-1">Explore your enrolled courses and track your progress</p>
                    </div>
                    <div className="text-right bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-gray-700">Student: <span className="font-semibold text-blue-700">{studentData.name}</span></p>
                        <p className="text-sm text-gray-700">Department: <span className="font-semibold text-blue-700">{studentData.department}</span></p>
                        <p className="text-sm text-gray-700">Semester: <span className="font-semibold text-blue-700">{studentData.semester}</span></p>
                    </div>
                </header>

                {selectedCourse ? (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="text-blue-700 hover:text-blue-900 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <GraduationCap className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-semibold text-gray-800">Instructor</h3>
                                </div>
                                <p className="text-gray-700 ml-7">{selectedCourse.instructor}</p>

                                <div className="flex items-center gap-2 mt-4 mb-3">
                                    <Clock className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
                                </div>
                                <div className="ml-7">
                                    <p className="text-gray-700">Days: {selectedCourse.schedule.days.join(', ')}</p>
                                    <p className="text-gray-700">Time: {selectedCourse.schedule.time}</p>
                                </div>

                                <div className="flex items-center gap-2 mt-4 mb-3">
                                    <BookMarked className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-semibold text-gray-800">Course Content</h3>
                                </div>
                                <p className="text-gray-700 ml-7">Total Lectures: {selectedCourse.lectureCount}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <BarChart3 className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-semibold text-gray-800">Assessment</h3>
                                </div>
                                <div className="ml-7 grid grid-cols-2 gap-2">
                                    <p className="text-gray-700">Assignments: {selectedCourse.assessment.assignments}</p>
                                    <p className="text-gray-700">Quizzes: {selectedCourse.assessment.quizzes}</p>
                                    <p className="text-gray-700">Presentations: {selectedCourse.assessment.presentations}</p>
                                    <p className="text-gray-700">Projects: {selectedCourse.assessment.projects}</p>
                                </div>

                                <div className="flex items-center gap-2 mt-4 mb-3">
                                    <Info className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-semibold text-gray-800">Grading Policy</h3>
                                </div>
                                <div className="ml-7 grid grid-cols-2 gap-2">
                                    {Object.entries(selectedCourse.grading).map(([type, percentage]) => (
                                        <p key={type} className="text-gray-700">{type.charAt(0).toUpperCase() + type.slice(1)}: {percentage}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-5 h-5 text-blue-700" />
                                <h3 className="text-lg font-semibold text-gray-800">Course Topics</h3>
                            </div>
                            <ul className="ml-7 space-y-2">
                                {selectedCourse.topics.map((topic, index) => (
                                    <li key={index} className="text-gray-700">
                                        {index + 1}. {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                                onClick={() => setSelectedCourse(course)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{course.name}</h2>
                                    <Book className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 mb-3">
                                            <GraduationCap className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700">Instructor: {course.instructor}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calendar className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700">{course.schedule.days.join(', ')} - {course.schedule.time}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">{course.assessment.assignments}</span> Assignments
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">{course.assessment.quizzes}</span> Quizzes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default Student_Courses;