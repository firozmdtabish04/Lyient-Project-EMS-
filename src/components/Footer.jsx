import { Box, Typography, Container, Divider } from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  LinkedIn, 
  Email 
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container maxWidth="lg" className="footer-container">
        {/* Top section */}
        <Box className="footer-top">
          <Box className="footer-brand">
            <Typography variant="h6" className="footer-logo">
              HR<span className="logo-highlight">Pro</span>
            </Typography>
            <Typography className="footer-tagline">
              Managing your workforce, simplified.
            </Typography>
          </Box>

          <Box className="footer-links">
            <Box className="footer-column">
              <Typography variant="subtitle2" className="footer-column-title">
                Employees
              </Typography>
              <Typography className="footer-link">Create Employee</Typography>
              <Typography className="footer-link">Update Employee</Typography>
              <Typography className="footer-link">Employee List</Typography>
            </Box>

            <Box className="footer-column">
              <Typography variant="subtitle2" className="footer-column-title">
                Company
              </Typography>
              <Typography className="footer-link">About Us</Typography>
              <Typography className="footer-link">Contact</Typography>
              <Typography className="footer-link">Privacy</Typography>
            </Box>

            <Box className="footer-column">
              <Typography variant="subtitle2" className="footer-column-title">
                Support
              </Typography>
              <Typography className="footer-link">Help Center</Typography>
              <Typography className="footer-link">Documentation</Typography>
              <Typography className="footer-link">Status</Typography>
            </Box>
          </Box>
        </Box>

        <Divider className="footer-divider" />

        {/* Bottom section */}
        <Box className="footer-bottom">
          <Box className="footer-left">
            <Typography className="footer-copyright">
              © {currentYear} HRPro. All rights reserved.
            </Typography>
          </Box>

          <Box className="footer-right">
            <Box className="footer-social">
              <Facebook className="social-icon" fontSize="small" />
              <Twitter className="social-icon" fontSize="small" />
              <LinkedIn className="social-icon" fontSize="small" />
              <Email className="social-icon" fontSize="small" />
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
