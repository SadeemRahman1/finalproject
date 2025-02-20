import React from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    GraduationCap,
    Settings,
    Bell,
    Book, Clock, Calendar as CalendarIcon,
    MapPin
} from 'lucide-react';

const Student_Schedule = () => {
    const navigate = useNavigate();
    const student = localStorage.getItem("student");
    const studentData = JSON.parse(student);

    // Generate dynamic schedule based on student's courses
    const generateSchedule = () => {
        if (!studentData?.courses || !Array.isArray(studentData.courses)) {
            return [];
        }

        // Time slots and days for course scheduling
        const timeSlots = [
            "8:00 AM - 9:30 AM",
            "10:00 AM - 11:30 AM", 
            "12:00 PM - 1:30 PM",
            "2:00 PM - 3:30 PM",
            "4:00 PM - 5:30 PM"
        ];
        
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        return studentData.courses.map((course, index) => {
            const courseName = typeof course === 'string' ? course : course.name || 'Unknown Course';
            // Assign time slots and days in a distributed manner
            const timeIndex = index % timeSlots.length;
            const dayIndex = index % days.length;
            
            return {
                id: index + 1,
                course: courseName,
                time: timeSlots[timeIndex],
                day: days[dayIndex],
                location: `Room ${Math.floor(Math.random() * 300) + 100}`
            };
        });
    };

    const scheduleData = generateSchedule().length > 0 ? generateSchedule() : [
        { id: 1, course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", day: "Monday", location: "Room 203" },
        { id: 2, course: "Data Structures and Algorithms", time: "12:00 PM - 1:30 PM", day: "Tuesday", location: "Room 301" },
        { id: 3, course: "Database Systems", time: "2:00 PM - 3:30 PM", day: "Wednesday", location: "Room 105" },
        { id: 4, course: "Operating System", time: "2:00 PM - 3:30 PM", day: "Thursday", location: "Room 210" },
        { id: 5, course: "Networking", time: "2:00 PM - 3:30 PM", day: "Friday", location: "Room 122" }
    ];

    const isActive = (path) => {
        return location.pathname === path;
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
                            className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentdashboard') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
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
                            className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-all duration-300 hover:bg-blue-500 hover:translate-x-1 ${isActive('/studentschedule') ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-600 hover:shadow-md'}`}
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

                {/* Weekly Calendar View */}
                <div className="mb-8 overflow-x-auto">
                    <div className="min-w-max">
                        <div className="grid grid-cols-6 bg-white rounded-lg shadow">
                            {/* Header row */}
                            <div className="p-3 border-b border-r font-medium text-gray-500">Time</div>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                                <div key={day} className="p-3 border-b font-medium text-gray-700 text-center">{day}</div>
                            ))}

                            {/* Time slots */}
                            {["8:00 - 9:30", "10:00 - 11:30", "12:00 - 1:30", "2:00 - 3:30", "4:00 - 5:30"].map(timeSlot => (
                                <React.Fragment key={timeSlot}>
                                    <div className="p-2 border-r border-b text-xs text-gray-500">{timeSlot}</div>
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => {
                                        const course = scheduleData.find(
                                            s => s.day === day && s.time.includes(timeSlot.split(' - ')[0])
                                        );
                                        return (
                                            <div key={`${timeSlot}-${day}`} className="p-2 border-b min-h-12">
                                                {course && (
                                                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-xs">
                                                        <p className="font-medium text-blue-800 truncate mb-1">{course.course}</p>
                                                        <p className="text-blue-600 text-xs">{course.location}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-medium text-gray-800 mb-4">Course Schedule Cards</h2>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scheduleData.map((schedule) => (
                        <div key={schedule.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">{schedule.course}</h2>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
                                    <Clock className="w-5 h-5 text-indigo-600" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <p className="text-sm font-medium text-gray-600">{schedule.time}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                                    <p className="text-sm font-medium text-gray-600">{schedule.day}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <p className="text-sm font-medium text-gray-600">{schedule.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Student_Schedule;