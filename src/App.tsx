import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import AddCourse from './pages/admin/AddCourse';
import ManageCategories from './pages/admin/ManageCategories';
import HeroSection from './pages/admin/HeroSection';
import AboutSection from './pages/admin/AboutSection';
import FeaturedCourseSection from './pages/admin/FeaturedCourseSection';
import FaqSection from './pages/admin/FaqSection';
import NewsletterSection from './pages/admin/NewsletterSection';
import ContactPageSection from './pages/admin/ContactPageSection';
import Footer from './pages/admin/Footer';
import ManageUsers from './pages/admin/ManageUsers';
import SectionSettings from './pages/admin/SectionSettings';
import Settings from './pages/admin/Settings';
import GeneralSettings from './pages/admin/GeneralSettings';
import SocialLinks from './pages/admin/SocialLinks';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/add" element={<AddCourse />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="about-section" element={<AboutSection />} />
          <Route path="featured-course-section" element={<FeaturedCourseSection />} />
          <Route path="faq-section" element={<FaqSection />} />
          <Route path="newsletter-section" element={<NewsletterSection />} />
          <Route path="contact-page-section" element={<ContactPageSection />} />
          <Route path="languages" element={<ManageCourses />} />
          <Route path="levels" element={<ManageCourses />} />
          <Route path="course-reviews" element={<ManageCourses />} />
          <Route path="course-delete-requests" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="section-settings" element={<SectionSettings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="footer" element={<Footer />} />
          <Route path="social-links" element={<SocialLinks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
