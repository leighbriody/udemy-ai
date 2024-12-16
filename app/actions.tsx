"use server";

import prisma from "./db";

export async function getCoursesWithKeywords(keyword: string) {
  const courses = await prisma.course.findMany({
    where: {
      OR: [{ description: { contains: keyword, mode: "insensitive" } }],
    },
  });
  return courses;
}
