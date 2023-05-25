import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Navbar from "./navbar/Navbar";
import mssnLogo from "./../assets/paid.png";
import { useLocation } from 'react-router-dom';

import './verifyPayment.css';

const VerifyPayment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const regNo = params.get("regNo");

  return (
    <div className="payment-page">
      <Navbar />
      <Box
        width='100%'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: 20
        }}
      >
        <Paper elevation={4} sx={{ width: 595 , height: 350}}>
          <Box
            width='100%'
            sx={{
              mt: 5,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div className="header" style={{ paddingTop: 110, width: '100%' }}>
              <Typography variant="h6" align="center" fontWeight='bold' >
                Payment Verification
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: '100%',
                  top: -10
                }}
              >
                <img style={{ width: 150 }} src={mssnLogo} alt="mssnLogo" />
              </Box>
            </div>
            <hr style={{ width: '70%' }} />

            <div className="message" style={{ width: '70%' }}>
              <Typography variant="h6" align="center">
                Payment Successful!
              </Typography>
              <Typography variant="body1" align="center">
                Student with registration number {regNo} has made the payment.
              </Typography>
            </div>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default VerifyPayment;
