import React from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup'; // for validation schema


const initialValues = {
  firstName: '',
  lastName: '',
  application: '',
  problem: '',
  priorite: 'f',
  description: '',
  allowExtraEmails: false,
  file: null,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('Champ requis'),
  lastName: Yup.string().required('Champ requis'),
  application: Yup.string().required('Champ requis'),
  problem: Yup.string().required('Champ requis'),
  description: Yup.string().max(1000, 'La description ne doit pas dépasser 1000 caractères.').required('Champ requis'),
  file: Yup.mixed().notRequired()
      .test(
          'fileSize',
          'La taille du fichier ne doit pas dépasser 5 Mo',
          (value) => !value || (value && value.size <= 5242880)
      ),
});

function ReclamationForm() {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // Submit form data (e.g., send to server)
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('file', event.currentTarget.files[0]);
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
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2} justifyContent={'space-evenly'}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...formik.getFieldProps('firstName')} // Use Formik's getFieldProps
              error={formik.touched.firstName && Boolean(formik.errors.firstName)} // Set error state based on Formik
              name="firstName"
              required
              fullWidth
              id="firstname"
              label="First Name"
               />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...formik.getFieldProps('lastName')}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              maxLength={100}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="application-select-label">Application</InputLabel>
              <Select
                {...formik.getFieldProps('application')}
                error={formik.touched.application && Boolean(formik.errors.application)}
                fullWidth
                required
                labelId="application-select-label"
                id="application"
                name="application"
              >
                <MenuItem value="etudiant">Espace etudiant</MenuItem>
                <MenuItem value="pfe">Site PFE</MenuItem>
                <MenuItem value="forum">Forum</MenuItem>
                {/* Add options for applications here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="problem-label">Problème</InputLabel>
              <Select
                {...formik.getFieldProps('problem')}
                error={formik.touched.problem && Boolean(formik.errors.problem)}
                fullWidth
                required
                labelId="problem-label"
                id="problem"
                name="problem"

              >
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
              <InputLabel id="priorite-label">Priorité</InputLabel>
              <Select
                {...formik.getFieldProps('priorite')} // Apply Formik props for integration
                error={formik.touched.priorite && Boolean(formik.errors.priorite)} // Set error state
                fullWidth
                labelId="priorite-label"
                id="priorite"
                name="priorite"
              >
                <MenuItem value="f">Faible</MenuItem>
                <MenuItem value="m">Moyenne</MenuItem>
                <MenuItem value="e">Élevée</MenuItem>
                {/* Add options for problems here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...formik.getFieldProps('description')}
              error={formik.touched.description && Boolean(formik.errors.description)}
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
              onChange={handleFileChange}              focused
              fullWidth // To occupy full width
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <FormControlLabel
              control={<Checkbox  {...formik.getFieldProps('allowExtraEmails')} color="primary" />}
              label="I want to receive a copy via email."
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
