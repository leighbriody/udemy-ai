import React from "react";
import { Book, Users, Clock } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  imageUrl?: string;
  duration?: string;
  enrolledStudents?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  imageUrl = "/api/placeholder/600/400", // Default placeholder
  duration = "4 weeks",
  enrolledStudents = 0,
}: CourseCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-100">
      {/* Course Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Course Details */}
        <div className="flex items-center space-x-4 text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-green-500" />
            <span className="text-sm">
              {enrolledStudents.toLocaleString()} Students
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <a
            href={`/course/${id}`}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-md"
          >
            <Book size={18} />
            <span>View Course</span>
          </a>
        </div>
      </div>
    </div>
  );
}
