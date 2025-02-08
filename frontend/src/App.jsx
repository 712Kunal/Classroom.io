import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthListener } from './hooks/use-auth';
import { ToastContainer } from 'react-toastify';

const LandingPage = lazy(() => import('./Pages/LandingPage.jsx'));
const LoginPage = lazy(() => import('./Pages/LoginPage.jsx'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const SignupPage = lazy(() => import('./Pages/SignupPage.jsx'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage.jsx'));
const LibraryPage = lazy(() => import('./Pages/LibraryPage.jsx'));
const PathwayPage = lazy(() => import('./Pages/PathwayPage.jsx'));
const NotificationsPage = lazy(() => import('./Pages/NotificationsPage.jsx'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage.jsx'));
const FormDetailsPage = lazy(() => import('./Pages/FormDetails.jsx'));
const TwoFactorAuthPage = lazy(() => import('./Pages/TwoFactPage.jsx'));

const TimelineView = lazy(() => import('./components/pathway/TimelineView.jsx'));
const CalenderView = lazy(() => import('./components/pathway/CalenderView.jsx'));
const CreatePathway = lazy(() => import('./components/library/CreatePathway.jsx'));
const TasksView = lazy(() => import('./components/pathway/TasksView.jsx'));

import AppWrapper from './components/core/AppWrapper.jsx';
import { Loader } from './Pages/LibraryPage';
import Loader1 from './Components/ui/Loader1';

const suspenseComponent = (component) => (
  <Suspense
    fallback={
      <div className="w-full h-full grid place-items-center">
        <Loader1 />
      </div>
    }>
    {component}
  </Suspense>
);
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const { user, loading } = useAuthListener();

  if (loading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <Loader1 />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen grid place-items-center overflow-y-scroll no-scrollbar dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/app/profile" /> : suspenseComponent(<LandingPage />)}
          />
          <Route path="/login" element={suspenseComponent(<LoginPage />)} />
          <Route path="/forgot-password" element={suspenseComponent(<ForgotPassword />)} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/app/profile" /> : suspenseComponent(<SignupPage />)}
          />
          <Route path="/detailsForm" element={suspenseComponent(<FormDetailsPage />)} />
          <Route path="/twofactorauth" element={suspenseComponent(<TwoFactorAuthPage />)} />
          <Route
            path="/app"
            element={<ProtectedRoute user={user} children={suspenseComponent(<AppWrapper />)} />}>
            <Route path="profile" element={suspenseComponent(<ProfilePage />)} />
            <Route path="library" element={suspenseComponent(<LibraryPage />)} />
            <Route path="library/new" element={suspenseComponent(<CreatePathway />)} />
            <Route path="library/pathways/:pathwayId" element={suspenseComponent(<PathwayPage />)}>
              <Route path="timeline" element={suspenseComponent(<TimelineView />)} />
              <Route path="calender" element={suspenseComponent(<CalenderView />)} />
              <Route path="tasks" element={suspenseComponent(<TasksView />)} />
            </Route>
            <Route path="notifications" element={suspenseComponent(<NotificationsPage />)} />
          </Route>
          <Route path="*" element={suspenseComponent(<NotFoundPage />)} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={true}
          closeButton={true}
          className="toast-container-dark"
        />
      </BrowserRouter>
    </div>
  );
}
export default App;
