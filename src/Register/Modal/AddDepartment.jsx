import { useState } from 'react';
import { addDepartment } from '../../Services/department';
import { useNavigate } from "react-router-dom";

export default function AddDepartmentModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        degrees: []
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Department name is required';
        if (formData.degrees.length === 0) tempErrors.degrees = 'At least one degree is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const result = await addDepartment(formData.name, formData.degrees);
                if (result === null) {
                    setErrors({ submit: 'Department already exists' });
                } else {
                    navigate("/department");
                    setFormData({
                        name: '',
                        degrees: []
                    });
                }
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDegreeChange = (degree) => {
        setFormData(prev => ({
            ...prev,
            degrees: prev.degrees.includes(degree)
                ? prev.degrees.filter(d => d !== degree)
                : [...prev.degrees, degree]
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
                    <h1 className="text-2xl font-semibold text-gray-800">Add Department</h1>
                </header>

                <section>
                    <div className="bg-white p-6 rounded shadow-md w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department Name</label>
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
                                <label className="block text-sm font-medium text-gray-700">Degrees Offered</label>
                                <div className="mt-2 space-y-2">
                                    {['BS', 'MS', 'PhD', 'BBA', 'MBA'].map((degree) => (
                                        <div key={degree} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={degree}
                                                checked={formData.degrees.includes(degree)}
                                                onChange={() => handleDegreeChange(degree)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor={degree} className="ml-2 text-sm text-gray-700">
                                                {degree}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.degrees && <p className="text-red-500 text-sm">{errors.degrees}</p>}
                            </div>

                            {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    onClick={() => navigate("/department")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Add Department
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}