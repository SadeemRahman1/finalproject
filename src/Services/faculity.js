let faculity = [
    { name: "Sir Shakeel Shahid", email: "abcuser@gmail.com", position: "HOD", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
    { name: "Sir Ahmed Ghaffor", email: "abcuser@gmail.com", position: "Permanent", department: "Bs-Cs", shift: "Morning", salary: 10000 },
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
