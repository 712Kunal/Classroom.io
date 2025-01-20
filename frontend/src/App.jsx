import { React } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";
import LibraryPage from "./Pages/LibraryPage";
import PathwayPage from "./Pages/PathwayPage";
import NotificationsPage from "./Pages/NotificationsPage";
import NotFoundPage from "./Pages/NotFoundPage";

import TimelineView from "./Components/pathway/TimelineView";
import CalenderView from "./Components/pathway/CalenderView";
import CreatePathway from "./Components/pathway/CreatePathway";
import TasksView from "./Components/pathway/TasksView";

import AppWrapper from "./Components/core/AppWrapper";

function App() {
  return (
    <div className="h-screen w-screen grid place-items-center dark:bg-neutral-900 dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/app" element={<AppWrapper />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="library/pathways/:pathwayId" element={<PathwayPage />}>
              <Route path="timeline" element={<TimelineView />} />
              <Route path="calender" element={<CalenderView />} />
              <Route path="create" element={<CreatePathway />} />
              <Route path="tasks" element={<TasksView />} />
            </Route>
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
