import { useState, useEffect } from 'react';
import { addStudent } from '../../Services/student';
import { useNavigate } from "react-router-dom";

export default function StudentModal() {
    const navigate = useNavigate();
    const [showCourses, setShowCourses] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            tempErrors.phone = 'Phone is required';
        }
        if (!formData.department.trim()) tempErrors.department = 'Department is required';
        if (!formData.semester) tempErrors.semester = 'Semester is required';
        if (formData.cgpa && (formData.cgpa < 0 || formData.cgpa > 4)) {
            tempErrors.cgpa = 'CGPA must be between 0 and 4';
        }
        if (!formData.password.trim()) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addStudent(formData);
                navigate("/studentlist");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    department: '',
                    semester: '',
                    courses: [],
                    feeStatus: 'unpaid',
                    cgpa: '',
                    password: '',
                });
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        setFormData(prev => ({
            ...prev,
            [name]: name === 'semester' || name === 'cgpa' ? Number(value) : value
        }));
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

    useEffect(() => {
        if (formData.department && formData.semester) {
            const coursesForSelection = coursesByDepartmentAndSemester[formData.department][formData.semester] || [];
            setAvailableCourses(coursesForSelection);
            setShowCourses(true);
        } else {
            setAvailableCourses([]);
        }
    }, [formData.department, formData.semester]);

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transform transition-all duration-300">
                <div className="p-6 text-center border-b border-blue-800">
                    <img
                        src="src/assets/NCBA&E.png"
                        alt="NCBA&E Logo"
                        className="mx-auto h-20 w-20 transition-transform duration-300 hover:scale-105"
                    />
                    <h2 className="mt-2 text-xl font-bold tracking-wide">Admin Portal</h2>
                </div>
                <nav className="flex-1 px-4 py-6">
                    <ul className="space-y-3">
                        {[
                            { href: "/admindashboard", label: "Dashboard" },
                            { href: "/studentlist", label: "Students" },
                            { href: "/facultylist", label: "Faculty" },
                            { href: "/department", label: "Departments" },
                            { href: "/f-staff", label: "Finance Staff" },
                            { href: "/profile", label: "Settings" },
                        ].map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="block py-3 px-5 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-6">
                    <button
                        className="w-full py-3 bg-red-500 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                        onClick={() => {
                            localStorage.removeItem("admin");
                            navigate("/adminsignin");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto"
                style={{
                    backgroundImage: `url(/src/assets/background_image.png)`, // Adjust path as needed
                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
                }}>
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">Add Student</h1>
                </header>

                <section>
                    <div className="bg-white p-6 rounded shadow-md w-full">

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
                                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA/CGPA</label>
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
                                    {errors.cgpa && <p className="text-red-500 text-sm mt-1">{errors.cgpa}</p>}
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
                                    {!formData.department && <p className="text-amber-500 text-sm mt-1">Please select a department first</p>}
                                    {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
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
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Shift
                                    </label>
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

                                {!formData.department || !formData.semester ?
                                    <p className="text-amber-500 text-sm mt-1">Please select both department and semester first</p> : null}

                                {showCourses && availableCourses.length > 0 && (
                                    <div className="mt-2 p-4 border rounded-md shadow-sm bg-white max-h-60 overflow-y-auto">
                                        {availableCourses.map((course) => (
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
                                        ))}
                                    </div>
                                )}
                                {showCourses && availableCourses.length === 0 && (
                                    <p className="text-amber-500 text-sm mt-1">No courses available for the selected department and semester</p>
                                )}
                                <p className="text-sm text-gray-500 mt-1">You can select up to 6 courses</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base pr-12"
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    className="px-5 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    onClick={() => navigate("/studentlist")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};