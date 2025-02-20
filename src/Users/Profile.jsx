import React from 'react'
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../Services/admin";

function Setting() {
    const navigate = useNavigate();
    const admin = localStorage.getItem("admin");
    const adminData = JSON.parse(admin);

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
                    <h1 className="text-2xl font-semibold text-gray-800">{adminData.name}</h1>
                </header>

                <section>
                    <div className="bg-white p-6 rounded shadow-md w-full">
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedUser = {
                                    name: formData.get("name"),
                                    email: formData.get("email"),
                                    mobile: formData.get("mobile"),
                                    password: formData.get("password"),
                                };

                                try {
                                    const updatedAdminList = await updateAdmin(updatedUser);
                                    localStorage.setItem("admin", JSON.stringify(updatedUser));
                                    console.log("User updated successfully!", updatedAdminList);
                                    alert("Profile updated successfully!");
                                    window.location.reload();
                                } catch (error) {
                                    console.error(error.message);
                                    alert(error.message);
                                }
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={adminData.name}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={adminData.email}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    defaultValue={adminData.mobile}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Setting
