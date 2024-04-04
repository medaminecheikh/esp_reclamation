import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ReclamationForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    application: '',
    problem: '',
    priorite: '',
    file: '',
    description: '',
    allowextraemails: false
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.firstname) errors.firstname = 'Champ requis';
    if (!formData.lastname) errors.lastname = 'Champ requis';
    if (!formData.description) errors.description = 'Champ requis';

// Validation for application and problem (assuming required)
    if (!formData.application) errors.application = 'Champ requis';
    if (!formData.problem) errors.problem = 'Champ requis';

// Validation for descriptionProbleme with max character limit
    if (formData.description && formData.description.length > 1000) {
      errors.description = 'La description ne doit pas dépasser 1000 caractères.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData); // Log the form data to console
      // ... handle form submission logic here (e.g., send data to server)
    }
  };

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >

      <Typography component="h1" variant="h2" sx={{ mt: 1, color: '#212121' }}>
        Remplir Réclamation
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2} justifyContent={'space-evenly'}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...formData} // Spread form data for automatic value setting
              error={!!formErrors.firstname} // Set error state based on presence of error
              onChange={handleChange}
              name="firstname"
              required
              fullWidth
              id="firstname"
              label="First Name"
              autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...formData} // Spread form data for automatic value setting
              error={!!formErrors.lastname} // Set error state based on presence of error
              onChange={handleChange}
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="family-name"
              maxLength={100}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="application-select-label">Application</InputLabel>
              <Select
                {...formData} // Spread form data for automatic value setting
                error={!!formErrors.application} // Set error state based on presence of error
                onChange={handleChange}
                fullWidth
                required
                labelId="application-select-label"
                id="application"
                name="application"
                maxLength={500}
              >
                <MenuItem value="">Choisir une application</MenuItem>
                <MenuItem value="etudiant">Espace etudiant</MenuItem>
                <MenuItem value="pfe">Site PFE</MenuItem>
                <MenuItem value="forum">Forum</MenuItem>
                {/* Add options for applications here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="problem">Problème</InputLabel>
              <Select
                {...formData} // Spread form data for automatic value setting
                error={!!formErrors.problem} // Set error state based on presence of error
                onChange={handleChange}
                fullWidth
                required
                labelId="problem"
                id="problem"
                name="problem"
                maxLength={500}
              >
                <MenuItem value="">Choisir un problème</MenuItem>
                <MenuItem value="motDePasseIncorrect">Mot de passe incorrect</MenuItem>
                <MenuItem value="compteBloque">Compte bloqué</MenuItem>
                <MenuItem value="connexionImpossible">Connexion impossible</MenuItem>
                <MenuItem value="bugPage">Bug sur la page</MenuItem>

                {/* Add options for problems here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="priorite">Priorité</InputLabel>
              <Select
                fullWidth
                labelId="priorite"
                id="priorite"
                name="priorite"
                maxLength={500}
              >
                <MenuItem value="">Choisir un problème</MenuItem>
                {/* Add options for problems here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...formData} // Spread form data for automatic value setting
              error={!!formErrors.description} // Set error state based on presence of error
              onChange={handleChange}
              required
              maxLength={500}
              fullWidth
              label="Description Problème"
              name="description"
              id="description"
              multiline
              rows={5} // Adjust the number of rows as needed
              placeholder="Veuillez décrire le problème en détail"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-start">
            <TextField
              id="file"
              type="file"
              label="Sélectionner un fichier" // Label
              onChange={handleChange}
              focused
              fullWidth // To occupy full width
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <FormControlLabel
              control={<Checkbox value="allowextraemails" color="primary" />}
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
          sx={{ mt: 2, mb: 2, bgcolor: 'error.dark' }}
        >
          Envoyer Réclamation
        </Button>

      </Box>
    </Box>
  );
}

export default ReclamationForm;
