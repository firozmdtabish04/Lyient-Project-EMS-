import { useState } from 'react';
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
import { createEmployee } from '../services/api';
import '../styles/CreateEmployee.css';

const initialFormData = {
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

const CreateEmployee = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

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
      const value = formData[field];
      if (!value || String(value).trim() === '') {
        errors[field] = 'Required';
      }
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
    if (formData.panNumber && !panRegex.test(formData.panNumber.toUpperCase())) {
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

    if (!validate()) {
      setError('Please fix the errors highlighted below.');
      return;
    }

    try {
      setLoading(true);
      await createEmployee(formData);
      setSuccess('Employee created successfully.');
      setFormData(initialFormData);
      setFormErrors({});
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to create employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="create-employee-page">
      <Paper elevation={3} className="create-employee-card">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={1}
        >
          <h2 className="create-employee-title">Add Employee</h2>
          <Button
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            onClick={() => navigate('/list')}
          >
            Back to List
          </Button>
        </Box>

        {error && (
          <Alert severity="error" className="create-employee-alert">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="create-employee-alert">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="create-employee-form">
          {/* Personal Details */}
          <div className="ce-section">
            <h3 className="ce-section-title">Personal Details</h3>
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
                  value={formData.dob}
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

          {/* Contact */}
          <div className="ce-section">
            <h3 className="ce-section-title">Contact Details</h3>
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

          {/* Address */}
          <div className="ce-section">
            <h3 className="ce-section-title">Address</h3>
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

          {/* Job & Salary */}
          <div className="ce-section">
            <h3 className="ce-section-title">Job & Salary</h3>
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

          {/* Documents */}
          <div className="ce-section">
            <h3 className="ce-section-title">Documents</h3>
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

          <Box className="ce-actions">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? 'Saving...' : 'Save Employee'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setFormData(initialFormData);
                setFormErrors({});
                setError('');
                setSuccess('');
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

export default CreateEmployee;
