import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./Pages/LandingPage.jsx'));
const LoginPage = lazy(() => import('./Pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./Pages/SignupPage.jsx'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage.jsx'));
const LibraryPage = lazy(() => import('./Pages/LibraryPage.jsx'));
const PathwayPage = lazy(() => import('./Pages/PathwayPage.jsx'));
const NotificationsPage = lazy(() => import('./Pages/NotificationsPage.jsx'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage.jsx'));

const TimelineView = lazy(() => import('./components/pathway/TimelineView.jsx'));
const CalenderView = lazy(() => import('./components/pathway/CalenderView.jsx'));
const CreatePathway = lazy(() => import('./components/library/CreatePathway.jsx'));
const TasksView = lazy(() => import('./components/pathway/TasksView.jsx'));

import AppWrapper from './components/core/AppWrapper.jsx';

const suspenseComponent = (component) => (
  <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

function App() {
  return (
    <div className="h-screen w-screen grid place-items-center overflow-y-scroll no-scrollbar dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={suspenseComponent(<LandingPage />)} />
          <Route path="/login" element={suspenseComponent(<LoginPage />)} />
          <Route path="/signup" element={suspenseComponent(<SignupPage />)} />
          <Route path="/app" element={suspenseComponent(<AppWrapper />)}>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
