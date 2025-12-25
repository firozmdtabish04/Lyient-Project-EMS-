import axios from 'axios';

// Update BASE_URL to your Java backend URL
const BASE_URL = 'http://localhost:8080/api/employees';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all employees
export const getAllEmployees = () => api.get('/');

// GET single employee by ID
export const getEmployeeById = (id) => api.get(`/${id}`);

// SEARCH employees by name or ID
export const searchEmployees = (query) => api.get(`/search?query=${query}`);

// CREATE new employee
export const createEmployee = (employeeData) => api.post('/', employeeData);

// UPDATE existing employee
export const updateEmployee = (id, employeeData) => api.put(`/${id}`, employeeData);

// DELETE employee
export const deleteEmployee = (id) => api.delete(`/${id}`);

export default api;
