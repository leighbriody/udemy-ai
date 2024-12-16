import React from "react";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
}

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Available Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            instructorId={course.instructorId}
          />
        ))}
      </div>
    </div>
  );
}
