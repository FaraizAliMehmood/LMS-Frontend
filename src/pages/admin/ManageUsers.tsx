import { useState } from 'react';
import EnrollStudentModal from '../../components/EnrollStudentModal';
import CreateStudentModal from '../../components/CreateStudentModal';

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  status: 'active' | 'banned';
  createdAt: string;
}

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'banned'>('all');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      enrolledCourses: 3,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      enrolledCourses: 2,
      status: 'active',
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      enrolledCourses: 0,
      status: 'banned',
      createdAt: '2024-01-10',
    },
  ]);

  const filteredStudents =
    activeTab === 'all'
      ? students.filter((s) => s.status === 'active')
      : students.filter((s) => s.status === 'banned');

  const handleBanStudent = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: 'banned' as const } : student
      )
    );
  };

  const handleUnbanStudent = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: 'active' as const } : student
      )
    );
  };

  const handleEnrollClick = (student: Student) => {
    setSelectedStudent(student);
    setShowEnrollModal(true);
  };

  const handleCreateStudent = (studentData: { name: string; email: string; password: string }) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: studentData.name,
      email: studentData.email,
      enrolledCourses: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setStudents([...students, newStudent]);
    setShowCreateModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Users</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#2d3db8] transition-colors w-full sm:w-auto"
        >
          + Create Student Account
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Students
          </button>
          <button
            onClick={() => setActiveTab('banned')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'banned'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Banned Students
          </button>
        </nav>
      </div>

      {/* Desktop Students Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrolled Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.enrolledCourses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEnrollClick(student)}
                    className="text-primary hover:text-[#2d3db8] mr-3"
                  >
                    Enroll in Course
                  </button>
                  {activeTab === 'all' ? (
                    <button
                      onClick={() => handleBanStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnbanStudent(student.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No {activeTab === 'all' ? 'active' : 'banned'} students found.
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            No {activeTab === 'all' ? 'active' : 'banned'} students found.
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{student.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{student.email}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Enrolled:</span>
                    <span className="ml-1">{student.enrolledCourses}</span>
                  </div>
                  <div>
                    <span className="font-medium">Joined:</span>
                    <span className="ml-1">{student.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleEnrollClick(student)}
                  className="w-full px-3 py-2 text-sm text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Enroll in Course
                </button>
                {activeTab === 'all' ? (
                  <button
                    onClick={() => handleBanStudent(student.id)}
                    className="w-full px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Ban Student
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnbanStudent(student.id)}
                    className="w-full px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Unban Student
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Enroll Student Modal */}
      {showEnrollModal && selectedStudent && (
        <EnrollStudentModal
          student={selectedStudent}
          onClose={() => {
            setShowEnrollModal(false);
            setSelectedStudent(null);
          }}
          onEnroll={(courseId) => {
            // Handle enrollment logic here
            console.log(`Enrolling ${selectedStudent.name} in course ${courseId}`);
            setShowEnrollModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {/* Create Student Modal */}
      {showCreateModal && (
        <CreateStudentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateStudent}
        />
      )}
    </div>
  );
};

export default ManageUsers;

