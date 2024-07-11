import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/tracker" element={<div>Tracker Page</div>} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;