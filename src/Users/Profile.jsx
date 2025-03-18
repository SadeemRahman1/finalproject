import React from 'react'
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../Services/admin";

function Setting() {
    const navigate = useNavigate();
    const admin = localStorage.getItem("admin");
    const adminData = JSON.parse(admin);

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transform transition-all duration-300">
                <div className="p-6 text-center border-b border-blue-800">
                    <img 
  src="https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/NCBA%26E.png?raw=true" 
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
                      backgroundImage: `url('https://github.com/SadeemRahman1/finalproject/blob/main/src/assets/background_image.png?raw=true')`,
 
                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
                }}>
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">{adminData.name}</h1>
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
