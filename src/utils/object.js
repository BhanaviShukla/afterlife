export const areObjectsEqual = (object1, object2) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};

export const sortObjectByDob = (a, b) => {
  // no sorting if DOB not provided to avoid confusion for the user
  if (!a.dob || !b.dob) return 0; //
  else return new Date(a.dob) - new Date(b.dob);
};
