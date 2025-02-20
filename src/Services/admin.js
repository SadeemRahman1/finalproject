let admin = [
  {
    name: "Taimoor Gillani",
    email: "adminuser@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "admin",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser1@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser2@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser3@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser4@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser4@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
  {
    name: "Taimoor Gillani",
    email: "adminuser5@edu.com",
    password: "Test@123",
    mobile: "03011234567",
    userType: "finance",
  },
];

export const getAdmin = () => {
  return admin.filter((user) => user.userType === "admin");
};

export const getFinanceUsers = () => {
  return admin.filter((user) => user.userType === "finance");
};

export const addAdmin = (newUser) => {
  const { email, password } = newUser;
  if (!email || !password) {
    throw new Error("Email and Password are required!");
  }
  const existingUser = admin.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("User with this email already exists!");
  }

  const adminUser = { ...newUser, userType: "admin" };
  admin = [...admin, adminUser];
  return admin;
};

export const addFinanceUser = (newUser) => {
  const { email, password } = newUser;
  if (!email || !password) {
    throw new Error("Email and Password are required!");
  }
  const existingUser = admin.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("User with this email already exists!");
  }

  const financeUser = { ...newUser, userType: "finance" };
  admin = [...admin, financeUser];
  return admin;
};

export const updateAdmin = (updatedUser) => {
  const { email, password } = updatedUser;
  if (!email || !password) {
    throw new Error("Email and Password are required!");
  }
  const userIndex = admin.findIndex(
    (user) => user.email === email && user.userType === "admin"
  );

  if (userIndex === -1) {
    throw new Error("Admin user with this email does not exist!");
  }

  admin[userIndex] = { ...admin[userIndex], ...updatedUser, userType: "admin" };
  return admin;
};

export const updateFinanceUser = (updatedUser) => {
  const { email, password } = updatedUser;
  if (!email || !password) {
    throw new Error("Email and Password are required!");
  }
  const userIndex = admin.findIndex(
    (user) => user.email === email && user.userType === "finance"
  );

  if (userIndex === -1) {
    throw new Error("Finance user with this email does not exist!");
  }

  admin[userIndex] = {
    ...admin[userIndex],
    ...updatedUser,
    userType: "finance",
  };
  return admin;
};

export const deleteAdmin = (email) => {
  const userIndex = admin.findIndex(
    (user) => user.email === email && user.userType === "admin"
  );

  if (userIndex === -1) {
    throw new Error("Admin user with this email does not exist!");
  }

  admin = admin.filter(
    (user) => !(user.email === email && user.userType === "admin")
  );
  return admin;
};

export const deleteFinanceUser = (email) => {
  const userIndex = admin.findIndex(
    (user) => user.email === email && user.userType === "finance"
  );

  if (userIndex === -1) {
    throw new Error("Finance user with this email does not exist!");
  }

  admin = admin.filter(
    (user) => !(user.email === email && user.userType === "finance")
  );
  return admin;
};
