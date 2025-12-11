import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  sn: number;
  title: string;
  category: string;
  instructor: string;
  price: string;
  students: number;
  createdDate: string;
  updateDate: string;
  status: 'Published' | 'Draft';
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
}

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      sn: 1,
      title: 'Artificial Intelligence in Business',
      category: 'SEO',
      instructor: 'Mark Davenport',
      price: '$138.00',
      students: 1,
      createdDate: '04 Jul, 2024\n03:41',
      updateDate: '04 Jul, 2024\n03:41',
      status: 'Published',
      approvalStatus: 'Approved',
    },
    {
      id: '2',
      sn: 2,
      title: 'Remote Work Productivity: Tips and Tools',
      category: 'Music fundamentals',
      instructor: 'Jason Thorne',
      price: '$182.00',
      students: 1,
      createdDate: '04 Jul, 2024\n03:41',
      updateDate: '04 Jul, 2024\n03:41',
      status: 'Published',
      approvalStatus: 'Approved',
    },
    {
      id: '3',
      sn: 3,
      title: 'Introduction to Financial Markets',
      category: 'Leadership',
      instructor: 'Ethan Granger',
      price: '$150.00',
      students: 0,
      createdDate: '04 Jul, 2024\n03:41',
      updateDate: '04 Jul, 2024\n03:41',
      status: 'Published',
      approvalStatus: 'Approved',
    },
    {
      id: '4',
      sn: 4,
      title: 'Songwriting Basics: Crafting Melodies',
      category: 'Communication',
      instructor: 'Nathaniel Cross',
      price: '$76.00',
      students: 0,
      createdDate: '04 Jul, 2024\n03:41',
      updateDate: '04 Jul, 2024\n03:41',
      status: 'Published',
      approvalStatus: 'Approved',
    },
    {
      id: '5',
      sn: 5,
      title: 'E-commerce Strategies for Small Businesses',
      category: 'Management',
      instructor: 'Barclay Mcpherson',
      price: '$170.00',
      students: 0,
      createdDate: '04 Jul, 2024\n03:41',
      updateDate: '04 Jul, 2024\n03:41',
      status: 'Published',
      approvalStatus: 'Approved',
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
    instructor: '',
    approvalStatus: '',
    status: '',
    orderBy: '',
    perPage: '10',
  });

  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [approvalDropdownOpen, setApprovalDropdownOpen] = useState<string | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleActionMenu = (courseId: string) => {
    setActionMenuOpen(actionMenuOpen === courseId ? null : courseId);
  };

  const toggleApprovalDropdown = (courseId: string) => {
    setApprovalDropdownOpen(approvalDropdownOpen === courseId ? null : courseId);
  };

  const updateApprovalStatus = (courseId: string, status: 'Approved' | 'Pending' | 'Rejected') => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, approvalStatus: status } : course
      )
    );
    setApprovalDropdownOpen(null);
  };

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="SEO">SEO</option>
              <option value="Music fundamentals">Music fundamentals</option>
              <option value="Leadership">Leadership</option>
              <option value="Communication">Communication</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
            <select
              value={filters.instructor}
              onChange={(e) => handleFilterChange('instructor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Instructor</option>
              <option value="Mark Davenport">Mark Davenport</option>
              <option value="Jason Thorne">Jason Thorne</option>
              <option value="Ethan Granger">Ethan Granger</option>
              <option value="Nathaniel Cross">Nathaniel Cross</option>
              <option value="Barclay Mcpherson">Barclay Mcpherson</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approval Status</label>
            <select
              value={filters.approvalStatus}
              onChange={(e) => handleFilterChange('approvalStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order By</label>
            <select
              value={filters.orderBy}
              onChange={(e) => handleFilterChange('orderBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Order</option>
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
              <option value="students">Students</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
            <select
              value={filters.perPage}
              onChange={(e) => handleFilterChange('perPage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses List Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Courses List</h1>
        <Link
          to="/admin/courses/add"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </Link>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approve
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.sn}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{course.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line">
                    {course.createdDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line">
                    {course.updateDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleApprovalDropdown(course.id)}
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900"
                      >
                        {course.approvalStatus}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {approvalDropdownOpen === course.id && (
                        <div className="absolute left-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <button
                            onClick={() => updateApprovalStatus(course.id, 'Approved')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Approved
                          </button>
                          <button
                            onClick={() => updateApprovalStatus(course.id, 'Pending')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => updateApprovalStatus(course.id, 'Rejected')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Rejected
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleActionMenu(course.id)}
                        className="text-primary hover:text-primary-dark focus:outline-none"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      {actionMenuOpen === course.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Edit
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            View
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(actionMenuOpen || approvalDropdownOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setActionMenuOpen(null);
            setApprovalDropdownOpen(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageCourses;
