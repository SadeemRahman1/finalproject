import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Bell,
    Calendar as CalendarIcon
} from 'lucide-react';

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
        title: 'Presentation Schedule',
        content: 'Please check the new presentation schedule in Module 5.',
        date: '2024-03-14',
        course: 'Web Development',
    },
];

const Student_Announcements = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const student = localStorage.getItem("student");
    const studentData = JSON.parse(student);

    // Function to determine if a route is active
    const isActive = (path) => {
        return location.pathname === path;
    };

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
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:translate-x-1 ${isActive('/studentdashboard')
                                        ? 'bg-blue-600 shadow-md'
                                        : 'hover:bg-blue-600 hover:shadow-md'
                                    }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentcourses"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:translate-x-1 ${isActive('/studentcourses')
                                        ? 'bg-blue-600 shadow-md'
                                        : 'hover:bg-blue-600 hover:shadow-md'
                                    }`}
                            >
                                <BookOpen className="w-5 h-5" />
                                Courses
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentassignments"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:translate-x-1 ${isActive('/studentassignments')
                                        ? 'bg-blue-600 shadow-md'
                                        : 'hover:bg-blue-600 hover:shadow-md'
                                    }`}
                            >
                                <Calendar className="w-5 h-5" />
                                Assignments
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentschedule"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:translate-x-1 ${isActive('/studentschedule')
                                        ? 'bg-blue-600 shadow-md'
                                        : 'hover:bg-blue-600 hover:shadow-md'
                                    }`}
                            >
                                <CalendarIcon className="w-5 h-5" />
                                Class Schedule
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentannouncements"
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:translate-x-1 ${isActive('/studentannouncements')
                                        ? 'bg-blue-600 shadow-md'
                                        : 'hover:bg-blue-600 hover:shadow-md'
                                    }`}
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
                        <p className="text-gray-600 mt-1">Have a productive day!</p>
                    </div>
                    <div className="text-right bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-gray-700">Department: <span className="font-semibold text-blue-700">{studentData.department}</span></p>
                        <p className="text-sm text-gray-700">Semester: <span className="font-semibold text-blue-700">{studentData.semester}</span></p>
                    </div>
                </header>

                {/* Announcements Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Recent Announcements</h2>
                        <p className="text-sm text-gray-600">Stay updated with the latest information</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-300 text-sm font-medium">
                            Mark All as Read
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm font-medium">
                            Filter
                        </button>
                    </div>
                </div>

                {/* Announcements Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">{announcement.title}</h2>
                                <CalendarIcon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">{announcement.content}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{announcement.course}</span>
                                        <span>{new Date(announcement.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* More Announcements Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-300 text-sm font-medium">
                        Load More Announcements
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Student_Announcements;