import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import InternshipsSection from './components/sections/InternshipsSection';
import JobsSection from './components/sections/JobsSection';
import BootcampsSection from './components/sections/BootcampsSection';
import PostGradSection from './components/sections/PostGradSection';
import GlobalSection from './components/sections/GlobalSection';
import EntranceExamsSection from './components/sections/EntranceExamsSection';
import CompetitiveExamsSection from './components/sections/CompetitiveExamsSection';
import InsightsSection from './components/sections/InsightsSection';
import CounselingSection from './components/sections/CounselingSection';
import LocationsSection from './components/sections/LocationsSection';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MasterClassSection from './components/sections/MasterClassSection';
import Register from './pages/Register';
import IndividualAdminDashboard from './pages/IndividualAdminDashboard';
import IndividualAdminInternships from './pages/IndividualAdminInternships';
import IndividualAdminJobs from './pages/IndividualAdminJobs';
import IndividualAdminMasterclasses from './pages/IndividualAdminMasterclasses';
import IndividualAdminGlobals from './pages/IndividualAdminGlobals';
import IndividualAdminPostgrads from './pages/IndividualAdminPostgrads';
import IndividualAdminBootcamps from './pages/IndividualAdminBootcamps';
import InternshipDetails from './pages/InternshipDetails';
import JobDetails from './pages/JobDetails';
import MasterclassDetails from './pages/MasterclassDetails';
import BootcampDetails from './pages/BootcampDetails';
import PostGradDetails from './pages/PostGradDetails';
import GlobalDetails from './pages/GlobalDetails';

export const API_BASE_URL = 'http://localhost:3000';

function HomePage() {
  return (
    <>
    <Header />
      <HeroSection />
      <InternshipsSection />
      <JobsSection />
      <BootcampsSection />
      <PostGradSection />
      <MasterClassSection />
      <GlobalSection />
      <EntranceExamsSection />
      <CompetitiveExamsSection />
      <InsightsSection />
      <CounselingSection />
      <LocationsSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          {/* <Header /> */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* <Route path="/admin/dashboard/:id" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } /> */}
              <Route path="/individual-admin/dashboard/:id"  element={
                <ProtectedRoute>
                  <IndividualAdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/internships" element={
                <ProtectedRoute>
                  <IndividualAdminInternships />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/jobs" element={
                <ProtectedRoute>
                  <IndividualAdminJobs />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/masterclasses" element={
                <ProtectedRoute>
                  <IndividualAdminMasterclasses />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/globals" element={
                <ProtectedRoute>
                  <IndividualAdminGlobals />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/postgrads" element={
                <ProtectedRoute>
                  <IndividualAdminPostgrads />
                </ProtectedRoute>
              } />
              <Route path="/individual-admin/dashboard/:adminId/bootcamps" element={
                <ProtectedRoute>
                  <IndividualAdminBootcamps />
                </ProtectedRoute>
              } />
              <Route path="/internships/:id" element={<InternshipDetails />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/masterclasses/:id" element={<MasterclassDetails />} />
              <Route path="/bootcamps/:id" element={<BootcampDetails />} />
              <Route path="/postgrads/:id" element={<PostGradDetails />} />
              <Route path="/globals/:id" element={<GlobalDetails />} />
            </Routes>
          </main>
          
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
