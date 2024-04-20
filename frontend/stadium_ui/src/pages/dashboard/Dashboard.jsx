// Dashboard.jsx
import { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import ProductCrud from "./Product/ProductCrud";
import "./Dashboard.css"

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

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
      // Ketu shtoni ndonje case , per shtimin e crudev tjera
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h2" className="dashboard-title" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="card-container" onClick={() => handleItemClick(item)}>
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
