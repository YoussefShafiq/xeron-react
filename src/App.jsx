import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import PortfolioPage from '@/pages/PortfolioPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage';
import PortfolioProcessSectionPage from '@/pages/PortfolioProcessSectionPage';
import ContactPage from '@/pages/ContactPage';
import JobsPage from '@/pages/JobsPage';
import JobDetailPage from '@/pages/JobDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/portfolio/:slug/:section" element={<PortfolioProcessSectionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:slug" element={<JobDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
