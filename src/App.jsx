import './App.css';

import { Navigate, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import { useSelector } from 'react-redux';

function App() {
  const authState = useSelector((state) => state.auth.user) || '';
  console.log(authState);
  return (
    <>
      <PageLayout>
        {' '}
        <Routes>
          <Route
            path='/'
            element={authState ? <HomePage /> : <Navigate to='/auth' />}
          />
          <Route
            path='/auth'
            element={!authState ? <AuthPage /> : <Navigate to='/' />}
          />
          <Route path='/:username' element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
