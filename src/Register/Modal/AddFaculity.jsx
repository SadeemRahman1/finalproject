import { useState } from 'react';
import { addFaculity } from '../../Services/faculity';
import { useNavigate } from "react-router-dom";

export default function FaculityModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        shift: 'Morning',
        salary: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.position.trim()) tempErrors.position = 'Position is required';
        if (!formData.department.trim()) tempErrors.department = 'Department is required';
        if (!formData.salary) tempErrors.salary = 'Salary is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addFaculity(formData)
                navigate("/facultylist")
                setFormData({
                    name: '',
                    email: '',
                    position: '',
                    department: '',
                    shift: 'Morning',
                    salary: ''
                });
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' ? Number(value) : value
        }));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-blue-600 text-white flex flex-col fixed h-full">
                <div className="px-4 py-6 text-center">
                    <img
                        src="src/assets/NCBA&E.png"
                        alt="NCBA&E Logo"
                        className="mx-auto h-25 w-20"
                    />
                </div>
                <nav className="flex-1 px-4">
                    <ul>
                        <li className="my-2">
                            <a
                                href="/admindashboard"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/studentlist"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Students
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/facultylist"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Faculity
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/department"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Departments
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/f-staff"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Finance Staff
                            </a>
                        </li>
                        <li className="my-2">
                            <a
                                href="/profile"
                                className="block py-2 px-4 rounded text-white hover:bg-blue-500 transition hover:text-black"
                            >
                                Setting
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="p-4">
                    <button className="w-full bg-blue-500 py-2 rounded hover:bg-red-400 transition"
                        onClick={() => {
                            localStorage.removeItem("admin");
                            navigate("/adminsignin");
                        }}>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 ml-64 overflow-y-auto">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Add Student</h1>
                </header>

                <section>
                    <div className="bg-white p-6 rounded shadow-md w-full">

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>'
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Position</label>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Select Position</option>
                                            <option value="HOD">HOD</option>
                                            <option value="Permanent">Permanent</option>
                                            <option value="Visiting">Visiting</option>
                                        </select>
                                        {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Shift</label>
                                        <select
                                            name="shift"
                                            value={formData.shift}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="Morning">Morning</option>
                                            <option value="Evening">Evening</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Bs-Cs">BS Computer Science</option>
                                        <option value="Bs-SE">BS Software Engineering</option>
                                        <option value="Bs-IT">BS Information Technology</option>
                                    </select>
                                    {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                                </div>
                                
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    onClick={() => navigate("/facultylist")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Add Faculty
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}