import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "View Employees",
      description:
        "Browse all employees in a professional data grid with search and pagination",
      action: () => navigate("/list"),
      buttonText: "View List",
    },
    {
      icon: <AddIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
      title: "Add Employee",
      description: "Create new employee records with all required information",
      action: () => navigate("/create"),
      buttonText: "Create",
    },
    {
      icon: <EditIcon sx={{ fontSize: 40, color: "#FF9800" }} />,
      title: "Update Employee",
      description: "Search and update existing employee details",
      action: () => navigate("/update"),
      buttonText: "Update",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "transparent", py: 5 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          sx={{
            p: 6,
            mb: 6,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Employee Management System
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Manage your employees efficiently with our comprehensive management
            platform
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Create, read, update, and delete employee records with ease
          </Typography>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              color: "#333",
            }}
          >
            What You Can Do
          </Typography>
          <Grid
            container
            spacing={3}
            wrap="nowrap"
            sx={{
              overflowX: "auto",
              pb: 2,
            }}
          >
            {features.map((feature, index) => (
              <Grid item key={index} sx={{ minWidth: 320 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, boxShadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>

                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {feature.description}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={feature.action}
                      sx={{
                        mt: "auto",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {feature.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Information Section */}
        <Paper sx={{ p: 4, backgroundColor: "transparent", mb: 6 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
          >
            Quick Start Guide
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#2196F3", fontWeight: "bold", mb: 1 }}
                >
                  📋
                </Typography>
                <Typography variant="body2">
                  View all employees in a data grid
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#4CAF50", fontWeight: "bold", mb: 1 }}
                >
                  ➕
                </Typography>
                <Typography variant="body2">
                  Add new employees to the system
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FF9800", fontWeight: "bold", mb: 1 }}
                >
                  ✏️
                </Typography>
                <Typography variant="body2">
                  Update existing employee details
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#F44336", fontWeight: "bold", mb: 1 }}
                >
                  🗑️
                </Typography>
                <Typography variant="body2">Delete employee records</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Call to Action */}
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            backgroundColor: "transparent",
            border: "2px solid #2196F3",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, color: "#1976D2" }}
          >
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
            Use the navigation menu above or the buttons below to explore the
            application
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/list")}
              sx={{ px: 4 }}
            >
              View Employees
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/create")}
              sx={{ px: 4 }}
            >
              Create New
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
