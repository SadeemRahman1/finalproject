import React, { useState, useEffect } from 'react';
import { updateStudent } from '../../Services/student';

function EditStudentModal({ isOpen, onClose, student, refreshStudents }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [availableSemesters, setAvailableSemesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        semester: '',
        courses: [],
        feeStatus: 'unpaid',
        cgpa: '',
        shift: "Morning",
        password: '',
    });

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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                email: student.email,
                phone: student.phone,
                department: student.department,
                semester: student.semester,
                courses: student.courses || [],
                feeStatus: student.feeStatus,
                cgpa: student.cgpa,
                shift: student.shift,
                password: student.password || '',
            });

            // Set available courses based on the student's department and semester
            if (student.department && student.semester) {
                const coursesForSelection = coursesByDepartmentAndSemester[student.department][student.semester] || [];
                setAvailableCourses(coursesForSelection);
            }
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));

        if (name === 'department') {
            // When department changes, reset semester and courses
            setFormData(prev => ({
                ...prev,
                [name]: value,
                semester: '',
                courses: []
            }));
            setAvailableCourses([]);
        } else if (name === 'semester') {
            // When semester changes, reset courses and update available courses
            const newSemester = Number(value);
            const coursesForSelection = coursesByDepartmentAndSemester[formData.department]?.[newSemester] || [];
            
            setFormData(prev => ({
                ...prev,
                [name]: newSemester,
                courses: []
            }));
            setAvailableCourses(coursesForSelection);
        } else {
            // For other fields, just update normally
            setFormData(prev => ({
                ...prev,
                [name]: name === 'cgpa' ? Number(value) : value
            }));
        }
    };

    const handleCourseChange = (course) => {
        const updatedCourses = formData.courses.includes(course)
            ? formData.courses.filter((c) => c !== course)
            : [...formData.courses, course];

        setFormData({
            ...formData,
            courses: updatedCourses
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateStudent(student.email, formData);
            refreshStudents();
            onClose();
        } catch (error) {
            console.error('Error updating student:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl my-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Student</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            >
                                <option value="">Select Department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                            <input
                                type="number"
                                name="cgpa"
                                step="0.01"
                                min="0"
                                max="4"
                                value={formData.cgpa}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                                disabled={!formData.department}
                            >
                                <option value="">Select Semester</option>
                                {availableSemesters.map(semester => (
                                    <option key={semester} value={semester}>{semester}</option>
                                ))}
                            </select>
                            {!formData.department && 
                                <p className="text-amber-500 text-sm mt-1">Please select a department first</p>
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fee Status</label>
                            <select
                                name="feeStatus"
                                value={formData.feeStatus}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            >
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                            <select
                                name="shift"
                                value={formData.shift}
                                onChange={handleChange}
                                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            >
                                <option value="Morning">Morning</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
                        <button
                            type="button"
                            onClick={() => setShowCourses(!showCourses)}
                            className="block w-full text-left px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                            disabled={!formData.department || !formData.semester}
                        >
                            Select Courses ({formData.courses.length}/6)
                        </button>
                        {(!formData.department || !formData.semester) && 
                            <p className="text-amber-500 text-sm mt-1">Please select both department and semester to see available courses</p>
                        }

                        {showCourses && (
                            <div className="mt-2 p-4 border rounded-md shadow-sm bg-white max-h-60 overflow-y-auto">
                                {availableCourses.length > 0 ? (
                                    availableCourses.map((course) => (
                                        <div key={course} className="flex items-center mb-3">
                                            <input
                                                type="checkbox"
                                                id={course}
                                                checked={formData.courses.includes(course)}
                                                onChange={() => handleCourseChange(course)}
                                                disabled={!formData.courses.includes(course) && formData.courses.length >= 6}
                                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor={course} className="ml-3 text-base text-gray-700">
                                                {course}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-amber-500">No courses available for the selected department and semester</p>
                                )}
                            </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">You can select up to 6 courses</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStudentModal;