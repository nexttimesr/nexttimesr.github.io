import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Container,
  Paper,
  Button,
  Grid2 as Grid,
  Fade
} from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BiotechIcon from '@mui/icons-material/Biotech';

const ratios = {
  noElement: 1,
  ice: 0.85,
  radiation: 0.75,
  fireGroup: 0.8,
};

const ElementCalculator = () => {
  const [values, setValues] = useState({
    noElement: '',
    ice: '',
    radiation: '',
    fireGroup: '',
  });

  const calculateFromBase = (baseValue, baseType) => {
    const base = parseFloat(baseValue);
    if (isNaN(base)) return;

    const baseRatio = ratios[baseType];
    const noElementVal = base / baseRatio;

    setValues({
      noElement: Math.round(noElementVal * ratios.noElement),
      ice: Math.round(noElementVal * ratios.ice),
      radiation: Math.round(noElementVal * ratios.radiation),
      fireGroup: Math.round(noElementVal * ratios.fireGroup),
    });
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    setValues({ ...values, [type]: value });
    calculateFromBase(value, type);
  };

  const handleReset = () => {
    setValues({
      noElement: '',
      ice: '',
      radiation: '',
      fireGroup: '',
    });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        minHeight: '100vh',
        py: 8,
        color: 'white',
      }}
    >
      <Fade in timeout={800}>
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              transition: '0.3s ease',
              ':hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Element Damage Calculator
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  label="No Element (100%)"
                  fullWidth
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <FlashOnIcon sx={{ mr: 1, color: 'gold' }} />,
                  }}
                  value={values.noElement}
                  onChange={(e) => handleChange(e, 'noElement')}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Ice (85%)"
                  fullWidth
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <AcUnitIcon sx={{ mr: 1, color: '#00e5ff' }} />,
                  }}
                  value={values.ice}
                  onChange={(e) => handleChange(e, 'ice')}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Radiation (75%)"
                  fullWidth
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box sx={{ mr: 1, fontSize: 24 }}>☢</Box>,
                  }}
                  value={values.radiation}
                  onChange={(e) => handleChange(e, 'radiation')}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Fire / Corrosive / Shock (80%)"
                  fullWidth
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <WhatshotIcon sx={{ mr: 1, color: 'orangered' }} />,
                  }}
                  value={values.fireGroup}
                  onChange={(e) => handleChange(e, 'fireGroup')}
                />
              </Grid>
              <Grid xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                    sx={{
                      px: 4,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      backgroundColor: '#f44336',
                      ':hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
};

export default ElementCalculator;
