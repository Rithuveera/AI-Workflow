import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const products = [
  'BSSTech ERP',
  'BSSTech HRMS',
  'Camp Accomodation Managment',
  'Camp Nueron'
];

export const AppProvider = ({ children }) => {
  const [requirements, setRequirements] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(localStorage.getItem('selectedProduct') || null);

  // Update localStorage when product changes
  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('selectedProduct', selectedProduct);
    } else {
      localStorage.removeItem('selectedProduct');
    }
  }, [selectedProduct]);

  // Fetch data when component mounts or product changes
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProduct) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [reqs, tcs, execs, statistics] = await Promise.all([
          api.getRequirements(selectedProduct),
          api.getTestCases(selectedProduct),
          api.getExecutions(selectedProduct),
          api.getStats(selectedProduct)
        ]);

        setRequirements(reqs);
        setTestCases(tcs);
        setExecutions(execs);
        setStats(statistics);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to connect to the server. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProduct]);

  const refreshStats = async () => {
    if (!selectedProduct) return;
    try {
      const newStats = await api.getStats(selectedProduct);
      setStats(newStats);
    } catch (err) {
      console.error("Failed to refresh stats:", err);
    }
  };

  const addRequirement = async (req, skipApi = false) => {
    try {
      const reqWithProduct = { ...req, product: selectedProduct };
      let newReq;
      if (skipApi) {
        newReq = reqWithProduct;
      } else {
        newReq = await api.createRequirement(reqWithProduct);
      }
      setRequirements(prev => [newReq, ...prev]);
      return newReq;
    } catch (err) {
      console.error("Failed to add requirement:", err);
      throw err;
    }
  };

  const addTestCase = async (tc) => {
    try {
      const tcWithProduct = { ...tc, product: selectedProduct };
      const newTc = await api.createTestCase(tcWithProduct);
      setTestCases([newTc, ...testCases]);
      return newTc;
    } catch (err) {
      console.error("Failed to add test case:", err);
      throw err;
    }
  };

  const addExecution = async (exec) => {
    try {
      const execWithProduct = { ...exec, product: selectedProduct };
      const newExec = await api.createExecution(execWithProduct);
      setExecutions([newExec, ...executions]);
      await refreshStats(); // Refresh stats after new execution
      return newExec;
    } catch (err) {
      console.error("Failed to add execution:", err);
      throw err;
    }
  };

  const updateRequirement = async (id, req) => {
    try {
      const updatedReq = await api.updateRequirement(id, req);
      setRequirements(requirements.map(r => r.id === id ? updatedReq : r));
      return updatedReq;
    } catch (err) {
      console.error("Failed to update requirement:", err);
      throw err;
    }
  };

  const updateTestCase = async (id, tc) => {
    try {
      const updatedTc = await api.updateTestCase(id, tc);
      setTestCases(testCases.map(t => t.id === id ? updatedTc : t));
      return updatedTc;
    } catch (err) {
      console.error("Failed to update test case:", err);
      throw err;
    }
  };

  const deleteRequirement = async (id) => {
    try {
      await api.deleteRequirement(id);
      setRequirements(requirements.filter(r => r.id !== id));
      // Also remove related test cases from state if needed, though backend cascade handles DB
      setTestCases(testCases.filter(tc => tc.requirementId !== id));
    } catch (err) {
      console.error("Failed to delete requirement:", err);
      throw err;
    }
  };

  const deleteTestCase = async (id) => {
    try {
      await api.deleteTestCase(id);
      setTestCases(testCases.filter(tc => tc.id !== id));
    } catch (err) {
      console.error("Failed to delete test case:", err);
      throw err;
    }
  };

  return (
    <AppContext.Provider value={{
      requirements, addRequirement, updateRequirement, deleteRequirement,
      testCases, addTestCase, updateTestCase, deleteTestCase,
      executions, addExecution,
      stats, refreshStats,
      loading, error,
      selectedProduct, setSelectedProduct, products
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
