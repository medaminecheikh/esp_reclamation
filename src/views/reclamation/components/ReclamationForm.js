import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

function ReclamationForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#EEEEEE', boxShadow: '6' }}>
        <HistoryEduIcon  sx={{ color: '#212121' }} />
      </Avatar>
      <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
        Remplir Reclamation
      </Typography>
      <Box component="form" noValidate onSubmit={null} sx={{ mt: 3}}>
        <Grid container spacing={2} justifyContent={'space-evenly'}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="application-select-label">Application</InputLabel>
              <Select
                fullWidth
                required
                labelId="application-select-label"
                id="application"
                name="application"

              >
                <MenuItem value="">Choisir une application</MenuItem>
                {/* Add options for applications here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="problem-select-label">Problème</InputLabel>
              <Select
                fullWidth
                labelId="problem-select-label"
                id="problem"
                name="problem"

              >
                <MenuItem value="">Choisir un problème</MenuItem>
                {/* Add options for problems here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="problem-select-label">Priorité</InputLabel>
              <Select
                fullWidth
                labelId="problem-select-label"
                id="Priorite"
                name="Priorité"

              >
                <MenuItem value="">Choisir un problème</MenuItem>
                {/* Add options for problems here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Description Problème"
              name="descriptionProbleme"
              id="descriptionProbleme"
              multiline
              rows={5} // Adjust the number of rows as needed
              placeholder="Veuillez décrire le problème en détail"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-start">
            <TextField
              id="file-input"
              type="file"
              label="Sélectionner un fichier" // Label
              onChange={handleChange}
              focused
              fullWidth // To occupy full width
            />
            {selectedFile && (
              <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
                <Typography variant="body2" color="text.secondary">
                  {selectedFile.name}
                </Typography>
                <IconButton onClick={handleRemoveFile} sx={{ marginLeft: 5 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
          </Grid>
        </Grid>
        <Button
          endIcon={<SendIcon />}
          type="submit"
          color={'info'}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: 'error.dark' }}
        >
          Envoyer Réclamation
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ReclamationForm;
