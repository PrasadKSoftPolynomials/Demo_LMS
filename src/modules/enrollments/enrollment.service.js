const prisma = require("../../config/database");

const getEnrollments = async (
  userId,
  courseId
) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (courseId) {
    where.courseId = courseId;
  }

  return prisma.enrollment.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      course: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};

const createEnrollment = async (
  userId,
  courseId
) => {

  const existing =
    await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

  if (existing) {
    throw new Error(
      "Student already enrolled"
    );
  }

  return prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  });
};

const deleteEnrollment = async (
  enrollmentId
) => {
  return prisma.enrollment.delete({
    where: {
      id: enrollmentId
    }
  });
};

module.exports = {
  getEnrollments,
  createEnrollment,
  deleteEnrollment
};