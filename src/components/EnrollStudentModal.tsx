import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface EnrollStudentModalProps {
  student: Student;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
}

const EnrollStudentModal = ({ student, onClose, onEnroll }: EnrollStudentModalProps) => {
  const [courses] = useState<Course[]>([
    { id: '1', title: 'Introduction to React', instructor: 'John Doe' },
    { id: '2', title: 'Advanced JavaScript', instructor: 'Jane Smith' },
    { id: '3', title: 'Node.js Fundamentals', instructor: 'Mike Johnson' },
  ]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const handleEnroll = () => {
    if (selectedCourseId) {
      onEnroll(selectedCourseId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enroll Student in Course</h2>
        
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Student Name</p>
          <p className="font-medium text-gray-900">{student.name}</p>
          <p className="text-sm text-gray-600 mt-2 mb-1">Email</p>
          <p className="font-medium text-gray-900">{student.email}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Choose a course...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} - {course.instructor}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            disabled={!selectedCourseId}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#2d3db8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enroll Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollStudentModal;

