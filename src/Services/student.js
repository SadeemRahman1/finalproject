let student = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 5,
    courses: ["Artificial Intelligence", "Design and Analysis of Algorithms", "Computer Graphics", "Information Security", "Mobile Application Development", "Professional Practices"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 2,
    courses: ["Object-Oriented Programming", "Calculus II", "Technical Writing", "Physics II", "Data Structures", "Pakistan Studies"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 1,
    courses: ["Introduction to Programming", "Calculus I", "English Composition", "Physics I", "Digital Logic Design", "Islamic Studies"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 8,
    courses: ["Data Mining", "Big Data Analytics", "Computer Vision", "Quantum Computing", "Final Year Project III", "Professional Ethics"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 5,
    courses: ["Mathematics", "Physics"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    department: "Computer Science",
    semester: 5,
    courses: ["Mathematics", "Physics"],
    feeStatus: "paid",
    cgpa: 3.8,
    shift: "Morning",
    password: "Test@123",
  },
];

export const getstudents = () => {
  return student;
};

export const addStudent = (newStudent) => {
  const emailExists = student.some((s) => s.email === newStudent.email);
  if (emailExists) {
    throw new Error("Student with this email already exists");
  }
  if (!newStudent.password) {
    throw new Error("Password is required");
  }
  student.push(newStudent);
  return student;
};

export const updateStudent = (email, updatedData) => {
  const index = student.findIndex((s) => s.email === email);
  if (index === -1) {
    throw new Error("Student not found");
  }
  if (updatedData.email && updatedData.email !== email) {
    const emailExists = student.some((s) => s.email === updatedData.email);
    if (emailExists) {
      throw new Error("New email already exists");
    }
  }
  // Ensure password is not removed during update
  if (updatedData.password === undefined) {
    updatedData.password = student[index].password;
  }
  student[index] = { ...student[index], ...updatedData };
  return student;
};

export const deleteStudent = (email) => {
  const index = student.findIndex((s) => s.email === email);
  if (index === -1) {
    throw new Error("Student not found");
  }
  student.splice(index, 1);
  return student;
};
