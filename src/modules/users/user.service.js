const prisma = require("../../config/database");

const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

const updateUser = async (
  userId,
  data
) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
};

const deleteUser = async (
  userId
) => {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};