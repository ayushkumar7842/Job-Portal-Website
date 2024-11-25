const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
  { id: 2, name: "Sumit", email: "sumit@gmail.com", password: "123456" },
];

export const getAllUsers = () => {
  return users;
};

export const getNameWithEmail = (email) => {
  // find the appropriate user from the users array
  const userData = users.find((user) => {
    return user.email === email;
  });
  return userData;
};

export const addUser = (user) => {
  const id = users.length + 1;
  users.push({ ...user, id: id });
};

// authenicate the user check they are available in the users array or not
export const authenticateUser = (reqUser) => {
  let isAuth = false;
  users.forEach((user) => {
    if (user.email === reqUser.email && user.password === reqUser.password) {
      isAuth = true;
    }
  });
  return isAuth;
};
