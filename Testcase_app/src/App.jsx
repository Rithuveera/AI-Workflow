import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Requirements from './components/Requirements';
import TestCases from './components/TestCases';
import Execution from './components/Execution';
import Reports from './components/Reports';

import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ProductSelection from './components/ProductSelection';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductSelection />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="requirements" element={<Requirements />} />
              <Route path="test-cases" element={<TestCases />} />
              <Route path="execution" element={<Execution />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
