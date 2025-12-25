import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  // 1) Fetch employees
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data); // initial list
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // 2) Filter when searchTerm or employees change
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter((emp) => {
      // CHANGE THESE FIELD NAMES IF YOUR BACKEND IS DIFFERENT
      const firstName = (emp.firstName || emp.firstname || emp.name || '').toLowerCase();
      const lastName = (emp.lastName || emp.lastname || '').toLowerCase();
      const email = (emp.email || emp.emailId || '').toLowerCase();
      const department = (emp.department || '').toLowerCase();
      const position = (emp.position || emp.role || emp.jobTitle || '').toLowerCase();

      const fullName = `${firstName} ${lastName}`.trim();

      return (
        fullName.includes(term) ||
        email.includes(term) ||
        department.includes(term) ||
        position.includes(term)
      );
    });

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="emp-list">
      {/* Header: left buttons, right search + refresh */}
      <div className="emp-header">
        <div className="emp-left">
          <button
            className="text-btn create-btn"
            onClick={() => navigate('/create')}
          >
            Add
          </button>
          <button
            className="text-btn update-btn"
            // you can change this default id
            onClick={() => navigate('/update/1')}
          >
            Update
          </button>
        </div>

        <div className="emp-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, email, department, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-inp"
            />
          </div>
          <button
            className="text-btn refresh-btn"
            onClick={fetchEmployees}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="emp-table-box">
        {filteredEmployees.length === 0 ? (
          <div className="no-emp">No employees found</div>
        ) : (
          <div className="table-wrap">
            <table className="emp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => {
                  const firstName = emp.firstName || emp.firstname || emp.name || '';
                  const lastName = emp.lastName || emp.lastname || '';
                  const fullName = `${firstName} ${lastName}`.trim();

                  return (
                    <tr key={emp.id}>
                      <td>{fullName || '-'}</td>
                      <td>{emp.email || emp.emailId || '-'}</td>
                      <td>{emp.position || emp.role || emp.jobTitle || '-'}</td>
                      <td>{emp.department || '-'}</td>
                      <td>{emp.salary != null ? emp.salary : '-'}</td>
                      <td className="emp-actions">
                        <button
                          className="small-text-btn edit"
                          onClick={() => navigate(`/update/${emp.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="small-text-btn del"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredEmployees.length > 0 && (
        <div className="emp-info">
          {filteredEmployees.length} of {employees.length} employees
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
