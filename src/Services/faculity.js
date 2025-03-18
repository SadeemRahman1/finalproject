let faculity = [
    { name: "Sir Ismail kashif", email: "abcuser@gmail.com", position: "HOD", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Afraz danish", email: "abcuser@gmail.com", position: "Coordinator", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Umair bashir", email: "abcuser@gmail.com", position: "DSA", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ashad bloach", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Amaar ", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Ma'am Saira", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Ma'am khadija", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Imran ", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Wajahat anwar", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ali", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
];

export const getFaculity = () => {
    return faculity;
};

export const addFaculity = (newUser) => {
    const { name, position, department } = newUser;
    if (!name || !position || !department) {
        throw new Error("Name, Position, and Department are required!");
    }

    const existingUser = faculity.find((user) => user.name === name && user.position === position);
    if (existingUser) {
        throw new Error("User with this name and position already exists!");
    }

    faculity = [...faculity, newUser];
    return faculity;
};

export const updateFaculity = (name, position, updatedData) => {
    const index = faculity.findIndex(
        (user) => user.name === name && user.position === position
    );
    
    if (index === -1) {
        throw new Error("Faculty member not found!");
    }
    
    faculity[index] = { ...faculity[index], ...updatedData };
    return faculity;
};

export const deleteFaculity = (name, position) => {
    const index = faculity.findIndex(
        (user) => user.name === name && user.position === position
    );
    
    if (index === -1) {
        throw new Error("Faculty member not found!");
    }
    
    faculity = faculity.filter((user) => !(user.name === name && user.position === position));
    return faculity;
};
