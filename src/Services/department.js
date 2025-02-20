const departments = [
  {
    name: "Computer Science", 
    degrees: ["BS", "MS"] 
  },
  { 
    name: "Physics", 
    degrees: ["BS", "MS"] 
  },
  { 
    name: "Chemistry", 
    degrees: ["BS"] 
  },
  { 
    name: "Mathematics", 
    degrees: ["BS"] 
  },
  { 
    name: "Business Administration", 
    degrees: ["BBA", "MBA"] 
  },
  { 
    name: "Botany", 
    degrees: ["BS"] 
  },
  { 
    name: "Mass Communication", 
    degrees: ["BS"] 
  }
];

export const getDepartment = () => {
    return departments;
};


export const addDepartment = (name, degrees) => {
  const exists = departments.some(dept => dept.name === name);
  if (exists) {
      return null;
  }
  const newDepartment = { name, degrees };
  departments.push(newDepartment);
  return departments;
};


export const updateDepartment = (name, updatedDegrees) => {
  const index = departments.findIndex(dept => dept.name === name);
  if (index !== -1) {
      departments[index].degrees = updatedDegrees;
      return departments;
  }
  return null;
};

export const deleteDepartment = (name) => {
  const index = departments.findIndex(dept => dept.name === name);
  if (index !== -1) {
      departments.splice(index, 1);
      return departments;
  }
  return null;
};