import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import 'font-awesome/css/font-awesome.min.css';
import DashboardPage from './pages/DashboardPage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import AdminBlankPage from './pages/AdminBlankPage';
import UploadPage from './pages/UploadPage';
import ImagesPage from './pages/ImagesPage';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route exact path='/home' element={<DashboardPage/>} />
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/reset-password' element={<ResetPassword/>} />
        <Route exact path='/profile' element={<ProfilePage/>} />
        <Route exact path='/change-password' element={<ChangePasswordPage/>} />
        <Route exact path='/preferences' element={<UserPreferencesPage/>} />
        <Route exact path='/typography' element={<TypographyPage/>} />
        <Route exact path='/blank-page' element={<AdminBlankPage/>} />
        <Route path="*" exact element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
