import React from "react";
import { Card } from "react-bootstrap";

function DashboardCard({ titulo, quantidade }) {
  return (
    <Card className="dashboard-card">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{quantidade}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
