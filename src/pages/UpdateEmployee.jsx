import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Grid,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees, getEmployeeById, updateEmployee } from '../services/api';
import '../styles/UpdateEmployee.css';

const emptyEmployee = {
  id: '',
  organizationId: '',
  designationId: '',
  deptId: '',
  managerId: '',

  firstName: '',
  middleName: '',
  lastName: '',

  dob: '',
  nationality: '',
  bloodGroup: '',
  gender: '',
  maritalStatus: '',

  officialEmail: '',
  personalEmail: '',
  mobile: '',
  whatsappNumber: '',

  presentAddress: '',
  permanentAddress: '',
  city: '',
  state: '',
  country: '',

  qualification: '',
  certification: '',
  yearOfExp: '',
  employmentStatus: '',
  grade: '',
  employmentCategory: '',
  jobLocation: '',

  basicSalary: '',
  payFrequency: '',

  panNumber: '',
  bankAccountNumber: '',
  bankName: '',
  ifscCode: '',
  pfAccountNumber: '',
  aadhaar: '',
  passportNumber: '',
};

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // search + selection
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  // form
  const [formData, setFormData] = useState(emptyEmployee);
  const [formErrors, setFormErrors] = useState({});

  // status
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --------- load list once ----------
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingList(true);
        const list = await getAllEmployees(); // MUST exist in ../services/api
        setEmployees(list || []);
        setFilteredEmployees(list || []);
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setError('Failed to load employees list.');
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, []);

  // --------- filter list when search changes ----------
  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFilteredEmployees(employees);
      return;
    }
    const filtered = employees.filter((emp) => {
      const idStr = String(emp.id || '').toLowerCase();
      const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
      return idStr.includes(term) || fullName.includes(term);
    });
    setFilteredEmployees(filtered);
  }, [search, employees]);

  // --------- handle select ----------
  const handleSelectEmployee = async (id) => {
    setSelectedId(id);
    setError('');
    setSuccess('');
    setFormErrors({});
    if (!id) {
      setFormData(emptyEmployee);
      return;
    }

    try {
      setLoading(true);
      const data = await getEmployeeById(id); // MUST exist in ../services/api
      setFormData({ ...emptyEmployee, ...data, id });
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setError('Failed to load employee details.');
      setFormData(emptyEmployee);
    } finally {
      setLoading(false);
    }
  };

  // --------- form handlers ----------
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
    setError('');
    setSuccess('');
  };

  const validate = () => {
    const errors = {};
    const required = [
      'firstName',
      'lastName',
      'dob',
      'gender',
      'officialEmail',
      'mobile',
      'presentAddress',
      'city',
      'state',
      'country',
      'employmentStatus',
      'employmentCategory',
      'jobLocation',
      'basicSalary',
    ];

    required.forEach((field) => {
      const v = formData[field];
      if (!v || String(v).trim() === '') errors[field] = 'Required';
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.officialEmail && !emailRegex.test(formData.officialEmail)) {
      errors.officialEmail = 'Invalid email';
    }
    if (formData.personalEmail && !emailRegex.test(formData.personalEmail)) {
      errors.personalEmail = 'Invalid email';
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      errors.mobile = 'Enter 10‑digit number';
    }
    if (formData.whatsappNumber && !mobileRegex.test(formData.whatsappNumber)) {
      errors.whatsappNumber = 'Enter 10‑digit number';
    }

    const aadhaarRegex = /^[0-9]{12}$/;
    if (formData.aadhaar && !aadhaarRegex.test(formData.aadhaar)) {
      errors.aadhaar = 'Enter 12‑digit Aadhaar';
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.panNumber && !panRegex.test((formData.panNumber || '').toUpperCase())) {
      errors.panNumber = 'Invalid PAN format';
    }

    if (formData.basicSalary && Number(formData.basicSalary) <= 0) {
      errors.basicSalary = 'Must be greater than 0';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedId) {
      setError('Please choose an employee to update.');
      return;
    }

    if (!validate()) {
      setError('Please fix the highlighted errors.');
      return;
    }

    try {
      setLoading(true);
      await updateEmployee(selectedId, formData); // MUST exist in ../services/api
      setSuccess('Employee updated successfully.');
    } catch (e) {
      setError('Failed to update employee.',e);
    } finally {
      setLoading(false);
    }
  };

  // --------- render ----------
  return (
    <Container maxWidth="lg" className="update-employee-page">
      <Paper elevation={3} className="update-employee-card">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={1}
        >
          <h2 className="update-employee-title">Update Employee</h2>
          <Button
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            onClick={() => navigate('/list')}
          >
            Back to List
          </Button>
        </Box>

        {/* Search + select bar */}
        <Box className="ue-search-bar">
          <TextField
            label="Search by Emp ID or Name"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            label="Select Employee"
            size="small"
            select
            fullWidth
            value={selectedId}
            onChange={(e) => handleSelectEmployee(e.target.value)}
            disabled={loadingList || filteredEmployees.length === 0}
          >
            {filteredEmployees.map((emp) => {
              const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
              return (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.id} - {fullName || 'Unnamed'}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>

        {loadingList && (
          <Alert severity="info" className="update-employee-alert">
            Loading employees...
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="update-employee-alert">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="update-employee-alert">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="update-employee-form">
          {/* PERSONAL */}
          <div className="ue-section">
            <h3 className="ue-section-title">Personal Details</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="First Name*"
                  fullWidth
                  size="small"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Middle Name"
                  fullWidth
                  size="small"
                  value={formData.middleName}
                  onChange={handleChange('middleName')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Last Name*"
                  fullWidth
                  size="small"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date of Birth*"
                  type="date"
                  fullWidth
                  size="small"
                  value={formData.dob || ''}
                  onChange={handleChange('dob')}
                  error={!!formErrors.dob}
                  helperText={formErrors.dob}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Gender*"
                  select
                  fullWidth
                  size="small"
                  value={formData.gender}
                  onChange={handleChange('gender')}
                  error={!!formErrors.gender}
                  helperText={formErrors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Marital Status"
                  select
                  fullWidth
                  size="small"
                  value={formData.maritalStatus}
                  onChange={handleChange('maritalStatus')}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nationality"
                  fullWidth
                  size="small"
                  value={formData.nationality}
                  onChange={handleChange('nationality')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Blood Group"
                  fullWidth
                  size="small"
                  value={formData.bloodGroup}
                  onChange={handleChange('bloodGroup')}
                />
              </Grid>
            </Grid>
          </div>

          {/* CONTACT */}
          <div className="ue-section">
            <h3 className="ue-section-title">Contact Details</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Official Email*"
                  fullWidth
                  size="small"
                  value={formData.officialEmail}
                  onChange={handleChange('officialEmail')}
                  error={!!formErrors.officialEmail}
                  helperText={formErrors.officialEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Personal Email"
                  fullWidth
                  size="small"
                  value={formData.personalEmail}
                  onChange={handleChange('personalEmail')}
                  error={!!formErrors.personalEmail}
                  helperText={formErrors.personalEmail}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile*"
                  fullWidth
                  size="small"
                  value={formData.mobile}
                  onChange={handleChange('mobile')}
                  error={!!formErrors.mobile}
                  helperText={formErrors.mobile}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="WhatsApp Number"
                  fullWidth
                  size="small"
                  value={formData.whatsappNumber}
                  onChange={handleChange('whatsappNumber')}
                  error={!!formErrors.whatsappNumber}
                  helperText={formErrors.whatsappNumber}
                />
              </Grid>
            </Grid>
          </div>

          {/* ADDRESS */}
          <div className="ue-section">
            <h3 className="ue-section-title">Address</h3>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Present Address*"
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  value={formData.presentAddress}
                  onChange={handleChange('presentAddress')}
                  error={!!formErrors.presentAddress}
                  helperText={formErrors.presentAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Permanent Address"
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  value={formData.permanentAddress}
                  onChange={handleChange('permanentAddress')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="City*"
                  fullWidth
                  size="small"
                  value={formData.city}
                  onChange={handleChange('city')}
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="State*"
                  fullWidth
                  size="small"
                  value={formData.state}
                  onChange={handleChange('state')}
                  error={!!formErrors.state}
                  helperText={formErrors.state}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Country*"
                  fullWidth
                  size="small"
                  value={formData.country}
                  onChange={handleChange('country')}
                  error={!!formErrors.country}
                  helperText={formErrors.country}
                />
              </Grid>
            </Grid>
          </div>

          {/* JOB & SALARY */}
          <div className="ue-section">
            <h3 className="ue-section-title">Job & Salary</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Employment Status*"
                  select
                  fullWidth
                  size="small"
                  value={formData.employmentStatus}
                  onChange={handleChange('employmentStatus')}
                  error={!!formErrors.employmentStatus}
                  helperText={formErrors.employmentStatus}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Employment Category*"
                  select
                  fullWidth
                  size="small"
                  value={formData.employmentCategory}
                  onChange={handleChange('employmentCategory')}
                  error={!!formErrors.employmentCategory}
                  helperText={formErrors.employmentCategory}
                >
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Job Location*"
                  fullWidth
                  size="small"
                  value={formData.jobLocation}
                  onChange={handleChange('jobLocation')}
                  error={!!formErrors.jobLocation}
                  helperText={formErrors.jobLocation}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Qualification"
                  fullWidth
                  size="small"
                  value={formData.qualification}
                  onChange={handleChange('qualification')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Certification"
                  fullWidth
                  size="small"
                  value={formData.certification}
                  onChange={handleChange('certification')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Experience (Years)"
                  type="number"
                  fullWidth
                  size="small"
                  value={formData.yearOfExp}
                  onChange={handleChange('yearOfExp')}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Basic Salary*"
                  type="number"
                  fullWidth
                  size="small"
                  value={formData.basicSalary}
                  onChange={handleChange('basicSalary')}
                  error={!!formErrors.basicSalary}
                  helperText={formErrors.basicSalary}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Pay Frequency"
                  select
                  fullWidth
                  size="small"
                  value={formData.payFrequency}
                  onChange={handleChange('payFrequency')}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </div>

          {/* DOCUMENTS */}
          <div className="ue-section">
            <h3 className="ue-section-title">Documents</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="PAN Number"
                  fullWidth
                  size="small"
                  value={formData.panNumber}
                  onChange={handleChange('panNumber')}
                  error={!!formErrors.panNumber}
                  helperText={formErrors.panNumber}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Aadhaar"
                  fullWidth
                  size="small"
                  value={formData.aadhaar}
                  onChange={handleChange('aadhaar')}
                  error={!!formErrors.aadhaar}
                  helperText={formErrors.aadhaar}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Passport Number"
                  fullWidth
                  size="small"
                  value={formData.passportNumber}
                  onChange={handleChange('passportNumber')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bank Name"
                  fullWidth
                  size="small"
                  value={formData.bankName}
                  onChange={handleChange('bankName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bank Account Number"
                  fullWidth
                  size="small"
                  value={formData.bankAccountNumber}
                  onChange={handleChange('bankAccountNumber')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="IFSC Code"
                  fullWidth
                  size="small"
                  value={formData.ifscCode}
                  onChange={handleChange('ifscCode')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="PF Account Number"
                  fullWidth
                  size="small"
                  value={formData.pfAccountNumber}
                  onChange={handleChange('pfAccountNumber')}
                />
              </Grid>
            </Grid>
          </div>

          <Box className="ue-actions">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !selectedId}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? 'Saving...' : 'Update Employee'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setFormData(emptyEmployee);
                setFormErrors({});
                setSelectedId('');
                setSuccess('');
                setError('');
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateEmployee;
