import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = lazy(() => import("../pages/loginPage/LoginPage.js"));
const DashboardPage = lazy(() => import("../pages/dashboardPage/DashboardPage.js"));
const ChatPage = lazy(() => import("../pages/chat/ChatPage.js"));
const DesignStudioPage = lazy(() => import("../pages/designStudioPage/DesignStudioPage.js"));
const ProtectedRoute = lazy(() => import("../protectedRoute/ProtectedRoute.js"));
const ProtectedRouteAdmin = lazy(() => import("../protectedRoute/ProtectedRouteAdmin.js"));
const NewInsightsPage = lazy(() => import("../pages/newInsightsPage/NewInsightsPage"));
const AdminDashboard = lazy(() => import("../pages/admin/dashboard"));
const UserManagement = lazy(() => import("../pages/admin/userManagement"));
const InsightsManagement = lazy(() => import("../pages/admin/insightsManagement"));
const AdminQuestions = lazy(() => import("../pages/admin/questions"));
const AdminDesignStudio = lazy(() => import("../pages/admin/DesignStudio"));
const ProductsAndCategories = lazy(() => import("../pages/admin/productsAndCategories"));
const ProjectManagement = lazy(() => import("../pages/admin/projectManagement"));
const SchedulingManagement = lazy(() => import("../pages/admin/SchedulingManagement"));
const SimulationPage = lazy(() => import("../pages/simulation/SimulationPage"));


const Config = () => {
  
  return (
    <Router>
       <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/dashboard" element={<ProtectedRoute component={DashboardPage}></ProtectedRoute>}></Route>
          <Route exact path="/chat" element={<ProtectedRoute component={ChatPage}></ProtectedRoute>}></Route>
          {/* <Route
            exact
            path="/insights/:id"
            element={<ProtectedRoute component={InsightsPage}></ProtectedRoute>}
          ></Route> */}

          
          <Route
            exact
            path="/new-insights/:id/:model_id"
            element={<ProtectedRoute component={NewInsightsPage}></ProtectedRoute>}
          ></Route>
          <Route
            exact
            path="/design-studio/:id/:model_id"
            element={<ProtectedRoute component={DesignStudioPage}></ProtectedRoute>}
          ></Route>
          <Route
            exact
            path="/design-studio"
            element={<ProtectedRoute component={DesignStudioPage}></ProtectedRoute>}
          ></Route>

          <Route
            exact
            path="/simulation/:projectName/:project_id/:model_id"
            element={<ProtectedRoute component={SimulationPage}></ProtectedRoute>}
          ></Route>
          {/* Admin */}
          <Route exact path="/admin/dashboard" element={<ProtectedRouteAdmin component={AdminDashboard} />}></Route>
          <Route
            exact
            path="/admin/user-management"
            element={<ProtectedRouteAdmin component={UserManagement} />}
          ></Route>
          {/* <Route
            exact
            path="/admin/insights-management"
            element={<ProtectedRouteAdmin component={InsightsManagement} />}
          ></Route> */}
          <Route
            exact
            path="/admin/insights-management"
            element={<ProtectedRouteAdmin component={AdminQuestions} />}
          ></Route>
          <Route
            exact
            path="/admin/design-studio"
            element={<ProtectedRouteAdmin component={AdminDesignStudio} />}
          ></Route>
          <Route
            exact
            path="/admin/products&Categories"
            element={<ProtectedRouteAdmin component={ProductsAndCategories} />}
          ></Route>
          <Route
            exact
            path="/admin/project-management"
            element={<ProtectedRouteAdmin component={ProjectManagement} />}
          ></Route>
          <Route
            exact
            path="/admin/scheduling-management"
            element={<ProtectedRouteAdmin component={SchedulingManagement} />}
          ></Route>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Config;
