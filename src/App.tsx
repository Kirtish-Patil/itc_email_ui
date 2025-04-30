import MailPage from "./screens/mail/MailPage";
import { BrowserRouter, Route, Routes } from "react-router";
import TestScreen from "./screens/test/TestScreen";
import MainLayout from "./layout/mainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<MailPage />} path="/" /> */}
          <Route element={<TestScreen />} path="/test" />
          <Route path="app" element={<MainLayout />}>
            <Route index element={<MailPage type="inbox" />} />
            <Route path="inbox" element={<MailPage type="inbox" />} />
            <Route path="draft" element={<MailPage type="draft" />} />
            <Route path="sent" element={<MailPage type="sent" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
