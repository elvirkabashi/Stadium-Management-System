import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import EventsCrud from "./Events/EventsCrud";
import ProductCrud from "./Product/ProductCrud";
import "./Dashboard.css";
import CategoryCrud from "./Categories/CategoryCrud";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  const dashboardItems = [
    { id: 1, name: "Products" },
    { id: 2, name: "Events" },
    { id: 3, name: "Categories" }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const renderTable = () => {
    switch (selectedItem.name) {
      case "Products":
        return <ProductCrud />;

      case "Events":
        return <EventsCrud />;

        case "Categories":
        return <CategoryCrud />;
      // Add more cases for other CRUD operations if needed
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h2" className="dashboard-title" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Current Time: {currentTime.toLocaleTimeString()}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Date: {currentTime.toLocaleDateString()}
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              className="card-container"
              onClick={() => handleItemClick(item)}
            >
              <CardContent className="card-content">
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to view {item.name} Table
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <div className="table-container">
          <Typography variant="h3" gutterBottom>
            {selectedItem.name} Table
          </Typography>
          {renderTable()}
          <Button variant="outlined" className="close-button" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
