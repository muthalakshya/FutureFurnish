import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const initialOrders = [
  {
    id: "#12345",
    date: "Jan 12, 2025",
    status: "Delivered",
    total: "$450",
    details: [
      "1x Modern Luxury Sofa - $400",
      "1x Antique Wall Clock - $50",
    ],
  },
  {
    id: "#67890",
    date: "Feb 05, 2025",
    status: "Shipped",
    total: "$250",
    details: ["1x Elegant Floor Lamp - $75", "1x Wooden Coffee Table - $175"],
  },
  {
    id: "#54321",
    date: "Feb 20, 2025",
    status: "Processing",
    total: "$120",
    details: ["1x Decorative Wall Mirror - $120"],
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Shipped":
      return "info";
    case "Processing":
      return "warning";
    default:
      return "default";
  }
};

const OrderHistory = () => {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="sm:px-24 px-8 py-20">
      <Typography variant="h4" gutterBottom>
        Your Order History 📦
      </Typography>

      <Grid container spacing={3}>
        {initialOrders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="shadow-md">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">{order.id}</Typography>
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    Ordered on: {order.date}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Total: {order.total}
                  </Typography>

                  <IconButton onClick={() => handleExpand(order.id)}>
                    <ExpandMoreIcon />
                  </IconButton>

                  <Collapse in={expanded === order.id}>
                    <div className="mt-2">
                      {order.details.map((item, index) => (
                        <Typography key={index} variant="body2">
                          {item}
                        </Typography>
                      ))}
                    </div>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {initialOrders.length === 0 && (
        <Typography variant="h6" color="text.secondary" className="mt-4">
          No past orders found.
        </Typography>
      )}
    </div>
  );
};

export default OrderHistory;
