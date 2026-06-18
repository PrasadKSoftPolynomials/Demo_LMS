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
const updateUserRole = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await userService.updateUserRole(
        req.params.userId,
        req.body.role
      );

    res.json({
      success: true,
      message:
        "User role updated successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
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
const updateUserStatus = async (
  userId,
  status
) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status
    }
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
  deleteUser,
  updateUserRole,
  updateUserStatus
};