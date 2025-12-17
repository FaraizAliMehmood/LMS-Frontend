import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import AddCourse from './pages/admin/AddCourse';
import ManageCategories from './pages/admin/ManageCategories';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageBlogCategories from './pages/admin/ManageBlogCategories';
import AddBlog from './pages/admin/AddBlog';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import AddTestimonial from './pages/admin/AddTestimonial';
import ManageFAQs from './pages/admin/ManageFAQs';
import AddFAQ from './pages/admin/AddFAQ';
import HeroSection from './pages/admin/HeroSection';
import AboutSection from './pages/admin/AboutSection';
import FeaturedCourseSection from './pages/admin/FeaturedCourseSection';
import FaqSection from './pages/admin/FaqSection';
import NewsletterSection from './pages/admin/NewsletterSection';
import NewsletterSubscribers from './pages/admin/NewsletterSubscribers';
import SendBulkMail from './pages/admin/SendBulkMail';
import ContactPageSection from './pages/admin/ContactPageSection';
import Footer from './pages/admin/Footer';
import ManageUsers from './pages/admin/ManageUsers';
import SectionSettings from './pages/admin/SectionSettings';
import Settings from './pages/admin/Settings';
import GeneralSettings from './pages/admin/GeneralSettings';
import SocialLinks from './pages/admin/SocialLinks';
import PageBuilder from './pages/admin/PageBuilder';
import AddPage from './pages/admin/AddPage';
import MenuBuilder from './pages/admin/MenuBuilder';
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
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blog-categories" element={<ManageBlogCategories />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="testimonials/add" element={<AddTestimonial />} />
          <Route path="testimonials/edit/:id" element={<AddTestimonial />} />
          <Route path="faqs" element={<ManageFAQs />} />
          <Route path="faqs/add" element={<AddFAQ />} />
          <Route path="faqs/edit/:id" element={<AddFAQ />} />
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="about-section" element={<AboutSection />} />
          <Route path="featured-course-section" element={<FeaturedCourseSection />} />
          <Route path="faq-section" element={<FaqSection />} />
          <Route path="newsletter-section" element={<NewsletterSection />} />
          <Route path="newsletter/subscribers" element={<NewsletterSubscribers />} />
          <Route path="newsletter/send-bulk-mail" element={<SendBulkMail />} />
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
          <Route path="page-builder" element={<PageBuilder />} />
          <Route path="page-builder/add" element={<AddPage />} />
          <Route path="page-builder/edit/:id" element={<AddPage />} />
          <Route path="menu-builder" element={<MenuBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
