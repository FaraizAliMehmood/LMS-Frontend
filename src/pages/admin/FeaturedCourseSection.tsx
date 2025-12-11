import { useState } from 'react';

interface Course {
  id: string;
  title: string;
}

const FeaturedCourseSection = () => {
  const [allCategoryCourses, setAllCategoryCourses] = useState('All Category Courses');
  const [selectedAllCourses, setSelectedAllCourses] = useState<string[]>([
    'Modern Front-End Development with js',
    'Artificial Intelligence and Machine',
    'DevOps Automation with Jenkins and Ansible',
    'UX/UI Design: Creating Intuitive User Experiences',
    'Project Management Fundamentals: Agile',
  ]);
  
  const [categoryOne, setCategoryOne] = useState('Development');
  const [selectedCategoryCourses, setSelectedCategoryCourses] = useState<string[]>([
    'Advanced Data Analysis for Business',
  ]);
  
  const [status, setStatus] = useState('Active');

  const availableAllCourses = [
    'Modern Front-End Development with js',
    'Artificial Intelligence and Machine',
    'DevOps Automation with Jenkins and Ansible',
    'UX/UI Design: Creating Intuitive User Experiences',
    'Project Management Fundamentals: Agile',
    'Full Stack Web Development',
    'Mobile App Development',
    'Cloud Computing Essentials',
  ];

  const availableCategoryCourses = [
    'Advanced Data Analysis for Business',
    'Python Programming Masterclass',
    'Web Development Bootcamp',
    'JavaScript Advanced Concepts',
  ];

  const categories = ['Development', 'Design', 'Marketing', 'Business', 'IT & Software'];
  const statusOptions = ['Active', 'Inactive'];

  const handleRemoveAllCourse = (courseTitle: string) => {
    setSelectedAllCourses(selectedAllCourses.filter((course) => course !== courseTitle));
  };

  const handleAddAllCourse = (courseTitle: string) => {
    if (!selectedAllCourses.includes(courseTitle)) {
      setSelectedAllCourses([...selectedAllCourses, courseTitle]);
    }
  };

  const handleRemoveCategoryCourse = (courseTitle: string) => {
    setSelectedCategoryCourses(selectedCategoryCourses.filter((course) => course !== courseTitle));
  };

  const handleAddCategoryCourse = (courseTitle: string) => {
    if (!selectedCategoryCourses.includes(courseTitle)) {
      setSelectedCategoryCourses([...selectedCategoryCourses, courseTitle]);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving featured courses:', {
      allCategoryCourses,
      selectedAllCourses,
      categoryOne,
      selectedCategoryCourses,
      status,
    });
    // You can add API call here
    alert('Featured courses updated successfully!');
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Update featured courses</h1>
        <p className="text-sm text-gray-600 mt-1">Select and manage featured courses</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        {/* All Courses Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            All Courses
          </label>
          <select
            value={allCategoryCourses}
            onChange={(e) => setAllCategoryCourses(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
          >
            <option value="All Category Courses">All Category Courses</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Courses
          </label>
          
          {/* Selected Courses Pills */}
          {selectedAllCourses.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-3 border border-gray-200 rounded-md min-h-[50px]">
              {selectedAllCourses.map((course) => (
                <span
                  key={course}
                  className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveAllCourse(course)}
                    className="hover:bg-primary-dark rounded-full p-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {course}
                </span>
              ))}
            </div>
          )}

          {/* Course Selection Dropdown */}
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value && e.target.value !== '') {
                  handleAddAllCourse(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a course to add...</option>
              {availableAllCourses
                .filter((course) => !selectedAllCourses.includes(course))
                .map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Category One Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category one
          </label>
          <select
            value={categoryOne}
            onChange={(e) => {
              setCategoryOne(e.target.value);
              setSelectedCategoryCourses([]);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Courses
          </label>

          {/* Selected Courses Pills */}
          {selectedCategoryCourses.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-3 border border-gray-200 rounded-md min-h-[50px]">
              {selectedCategoryCourses.map((course) => (
                <span
                  key={course}
                  className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveCategoryCourse(course)}
                    className="hover:bg-primary-dark rounded-full p-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {course}
                </span>
              ))}
            </div>
          )}

          {/* Course Selection Dropdown */}
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value && e.target.value !== '') {
                  handleAddCategoryCourse(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a course to add...</option>
              {availableCategoryCourses
                .filter((course) => !selectedCategoryCourses.includes(course))
                .map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Status Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseSection;
