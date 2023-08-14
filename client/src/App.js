import { Container, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes } from "react-router-dom";
import Header from "./layout/app-header";
import Loading from "./layout/app-loadding";
import { generateLazyRoutes } from "./lib/layz-routers";
import Auth from "./provider/login-provider";
import { Route } from "react-router-dom";

import {
  adminRoutesData,
  authRoutesData,
  disactivateRoutesData,
  unauthRoutesData,
} from "./routes/routes";
import Calendar from "./pages/calendar";

import Schedule from "./pages/calendar/schedule";
import Quiz from "./pages/calendar/quiz";

const generatedAuthRoutes = generateLazyRoutes(authRoutesData);
const generatedUnauthRoutes = generateLazyRoutes(unauthRoutesData);
const generateDisactiveRoutes = generateLazyRoutes(disactivateRoutesData);
const generateAdminRoutes = generateLazyRoutes(adminRoutesData);
function App() {
  const { setAuthData } = Auth();
  const user = useSelector((action) => action.authReducer);
  return (
    <Stack direction="row" justifyContent="flex-start">
      <Container>
        <Loading loading={user.users === null ? setAuthData : user.isLoading}>
          <React.Suspense fallback={<LinearProgress />}>
            {setAuthData && <Header />}
            <Routes>
              <Route path="*" exact element={<Navigate to="/" />} />
              <Route path="/calendar" exact element={<Calendar />} />
              <Route path="/calendar/test" exact element={<Quiz />} />
              <Route path="/calendar/schedule" exact element={<Schedule />} />
              {setAuthData === true
                ? generatedAuthRoutes
                : setAuthData === "disactive"
                ? generateDisactiveRoutes
                : setAuthData === "admin"
                ? generateAdminRoutes
                : generatedUnauthRoutes}
            </Routes>
          </React.Suspense>
        </Loading>
      </Container>
    </Stack>
  );
}

export default App;
