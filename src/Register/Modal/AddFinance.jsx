import { useState } from 'react';
import { addFinanceUser } from '../../Services/admin';
import { useNavigate } from "react-router-dom";

export default function AddFinanceModal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        userType: 'finance',

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
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.mobile.trim()) {
            tempErrors.mobile = 'Mobile number is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addFinanceUser(formData);
                navigate("/f-staff");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    mobile: '',
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
            [name]: value
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
                    <h1 className="text-2xl font-semibold text-gray-800">Add Finance Staff</h1>
                </header>

                <section>
                    <div className="bg-white p-6 rounded shadow-md w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
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
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                                </div>
                            </div>

                            {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    onClick={() => navigate("/f-staff")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Add Finance Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}