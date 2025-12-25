import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  Avatar,
  Divider,
  Button,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';

// Animation for the dialog sliding up
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeModal = ({ open, onClose, employee }) => {
  if (!employee) return null;

  // Generate avatar color based on employee ID or Name
  const getAvatarColor = () => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    const charCodeSum = employee.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[charCodeSum % colors.length];
  };

  // Get employee initials
  const getInitials = () => {
    return employee.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || '??';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 }
      }}
    >
      {/* Header Section */}
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Employee Profile
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            '&:hover': { color: '#e74c3c' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Avatar & Basic Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: '2rem',
              bgcolor: getAvatarColor(),
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              mb: 2,
            }}
          >
            {getInitials()}
          </Avatar>
          <Typography variant="h5" fontWeight="700" color="#2c3e50">
            {employee.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {employee.position || 'Employee'}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Details Grid */}
        <Grid container spacing={2.5}>
          <InfoItem icon={<PersonIcon color="primary" />} label="Employee ID" value={employee.empId} />
          <InfoItem icon={<EmailIcon color="primary" />} label="Email" value={employee.email} isEmail />
          <InfoItem icon={<PhoneIcon color="primary" />} label="Phone" value={employee.phone} />
          
          {employee.department && (
            <InfoItem icon={<BusinessIcon color="primary" />} label="Department" value={employee.department} />
          )}

          {employee.salary && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PaidIcon color="success" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Salary</Typography>
                  <Typography variant="body2" fontWeight="600" color="#27ae60">
                    ${employee.salary.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {employee.joinDate && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CalendarMonthIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Join Date</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Footer Action */}
        <Box sx={{ mt: 4, mb: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: 'none',
              '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
            }}
          >
            Close Details
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Reusable component for detail rows to keep code DRY
 */
const InfoItem = ({ icon, label, value, isEmail = false }) => (
  <Grid item xs={12}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Box sx={{ mt: 0.5 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight="500"
          sx={{ 
            color: '#2c3e50',
            wordBreak: isEmail ? 'break-all' : 'normal'
          }}
        >
          {value || 'N/A'}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

export default EmployeeModal;