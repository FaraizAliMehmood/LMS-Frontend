import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [manageCoursesMenuOpen, setManageCoursesMenuOpen] = useState(false);
  const [sectionsMenuOpen, setSectionsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('$-USD');

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSubmenuActive = (paths: string[]) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  // Auto-open submenu if current route is one of its items
  useEffect(() => {
    const manageCoursesPaths = ['/admin/courses', '/admin/categories', '/admin/languages', '/admin/course-delete-requests'];
    if (isSubmenuActive(manageCoursesPaths)) {
      setManageCoursesMenuOpen(true);
    }
    const sectionsPaths = ['/admin/hero-section', '/admin/about-section', '/admin/featured-course-section', '/admin/newsletter-section', '/admin/featured-instructor', '/admin/counter-section', '/admin/faq-section', '/admin/our-features-section', '/admin/banner-section', '/admin/contact-page-section'];
    if (isSubmenuActive(sectionsPaths)) {
      setSectionsMenuOpen(true);
    }
  }, [location.pathname]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-primary z-50 lg:left-64">
        <div className="px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left side - Hamburger (mobile) and dropdowns */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-primary border border-white/30 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 pr-6 sm:pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white appearance-none cursor-pointer hover:bg-primary-dark transition-colors"
              >
                <option value="English" className="bg-white text-gray-900">English</option>
                <option value="Spanish" className="bg-white text-gray-900">Spanish</option>
                <option value="French" className="bg-white text-gray-900">French</option>
              </select>
              <svg
                className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-primary border border-white/30 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 pr-6 sm:pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white appearance-none cursor-pointer hover:bg-primary-dark transition-colors"
              >
                <option value="$-USD" className="bg-white text-gray-900">$-USD</option>
                <option value="€-EUR" className="bg-white text-gray-900">€-EUR</option>
                <option value="£-GBP" className="bg-white text-gray-900">£-GBP</option>
              </select>
              <svg
                className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        
       

          {/* Right side - User Profile */}
          <div className="flex items-center shrink-0">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 sm:space-x-2 text-white hover:bg-primary-dark px-2 sm:px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm hidden md:inline">Admin</span>
                <svg
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[60]">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Close user menu when clicking outside */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary hidden lg:block">LMS Admin</h1>
          <div className="lg:hidden flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">LMS Admin</h1>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
              isActive('/admin/dashboard') ? 'bg-primary text-white' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          {/* Manage Courses Submenu */}
          <div>
            <button
              onClick={() => setManageCoursesMenuOpen(!manageCoursesMenuOpen)}
              className={`w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                isSubmenuActive(['/admin/courses', '/admin/categories', '/admin/languages', '/admin/levels', '/admin/course-reviews', '/admin/course-delete-requests']) ? 'bg-primary text-white' : ''
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Manage Courses
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${manageCoursesMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {manageCoursesMenuOpen && (
              <div className="bg-gray-50">
                <Link
                  to="/admin/courses"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/courses') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Courses
                </Link>
                <Link
                  to="/admin/categories"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/categories') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Categories
                </Link>
                <Link
                  to="/admin/languages"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/languages') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Languages
                </Link>
                
                
                <Link
                  to="/admin/course-delete-requests"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/course-delete-requests') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Course Delete Requests
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
              isActive('/admin/users') ? 'bg-primary text-white' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </Link>
          {/* Sections Submenu */}
          <div>
            <button
              onClick={() => setSectionsMenuOpen(!sectionsMenuOpen)}
              className={`w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                isSubmenuActive(['/admin/hero-section', '/admin/about-section', '/admin/featured-course-section', '/admin/newsletter-section', '/admin/featured-instructor', '/admin/counter-section', '/admin/faq-section', '/admin/our-features-section', '/admin/banner-section', '/admin/contact-page-section']) ? 'bg-primary text-white' : ''
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Sections
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${sectionsMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sectionsMenuOpen && (
              <div className="bg-gray-50">
                <Link
                  to="/admin/hero-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/hero-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Hero Section
                </Link>
                <Link
                  to="/admin/about-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/about-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  About Section
                </Link>
                <Link
                  to="/admin/featured-course-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/featured-course-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Featured Course Section
                </Link>
                <Link
                  to="/admin/newsletter-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/newsletter-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Newsletter Section
                </Link>
                <Link
                  to="/admin/featured-instructor"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/featured-instructor') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Featured Instructor
                </Link>
                <Link
                  to="/admin/counter-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/counter-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Counter Section
                </Link>
                <Link
                  to="/admin/faq-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/faq-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Faq Section
                </Link>
                <Link
                  to="/admin/our-features-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/our-features-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Our Features Section
                </Link>
                <Link
                  to="/admin/banner-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/banner-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Banner Section
                </Link>
                <Link
                  to="/admin/contact-page-section"
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-2.5 pl-12 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                    isActive('/admin/contact-page-section') ? 'bg-primary text-white' : ''
                  }`}
                >
                  Contact Page Section
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/admin/settings"
            onClick={closeSidebar}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
              isActive('/admin/settings') ? 'bg-primary text-white' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <Link
            to="/admin/social-links"
            onClick={closeSidebar}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
              isActive('/admin/social-links') ? 'bg-primary text-white' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Social Links
          </Link>
          <Link
            to="/admin/footer"
            onClick={closeSidebar}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
              isActive('/admin/footer') ? 'bg-primary text-white' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Footer
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-16 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

