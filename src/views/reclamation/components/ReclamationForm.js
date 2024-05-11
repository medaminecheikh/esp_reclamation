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
import {useFormik} from 'formik';
import * as Yup from 'yup';
import UseGetJiraData from "../../../services/jiraAPI/requests/useGetJiraData";
import UsePostJiraIssue from "../../../services/jiraAPI/requests/usePostJiraData";
import PostAttachIssue from "../../../services/jiraAPI/requests/postAttachIssue";

const initialValues = {
    summary: '',
    projectKey: '',
    reporter: '',
    labels: '',
    priority: '3',
    description: '',
    allowExtraEmails: false,
    file: null,
};

const validationSchema = Yup.object({
    summary: Yup.string().required('Champ requis'),
    projectKey: Yup.string().required('Champ requis'),
    labels: Yup.string().required('Champ requis'),
    description: Yup.string().max(1000, 'La description ne doit pas dépasser 1000 caractères.').required('Champ requis'),
    file: Yup.mixed().notRequired()
        .test(
            'fileSize',
            'La taille du fichier ne doit pas dépasser 5 Mo',
            (value) => !value || (value && value.size <= 5242880)
        ),
});

function ReclamationForm() {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const {data, error} = UseGetJiraData();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, {resetForm}) => {
            console.log(values); // Submit form data (e.g., send to server)
            const postData = {
                fields: {
                    project: {key: values.projectKey},
                    summary: values.summary,
                    description: values.description,
                    issuetype: {name: 'Bug'}, // or any other issue type you want
                    customfield_10112: storedUserData.username,
                    labels: [values.labels],
                    priority: {id: values.priority}
                    // Additional fields as needed
                }
            };
            console.log(postData); // Submit form data (e.g., send to server)


            try {
                const response = await UsePostJiraIssue(postData); // Call the UsePostJiraIssue function
                console.log("RESPONSE POST ", response);
                if (values.file) {
                    await PostAttachIssue(response.data.key, values.file);
                }
                resetForm(); // Reset form values
            } catch (error) {
                console.error('Error posting JIRA issue:', error);
            }
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

            <Typography component="h1" variant="h2" sx={{mt: 1, color: '#212121'}}>
                Remplir Réclamation
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
                <Grid container spacing={2} justifyContent={'space-evenly'}>
                    <Grid item xs={12}>
                        <TextField
                            {...formik.getFieldProps('summary')} // Use Formik's getFieldProps
                            error={formik.touched.summary && Boolean(formik.errors.summary)} // Set error state based on Formik
                            name="summary"
                            required
                            fullWidth
                            id="summary"
                            label="Sommaire"
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="application-select-label">Application</InputLabel>
                            <Select
                                {...formik.getFieldProps('projectKey')}
                                error={formik.touched.projectKey && Boolean(formik.errors.projectKey)}
                                fullWidth
                                required
                                labelId="application-select-label"
                                id="projectKey"
                                label="Application"
                                name="projectKey"
                            >
                                {error ? (
                                    <MenuItem disabled>Error fetching data</MenuItem>
                                ) : (
                                    data && data.length > 0 ? (
                                        data.map((project) => (
                                            <MenuItem key={project.key} value={project.key}>{project.name}</MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No projects found</MenuItem>
                                    )
                                )}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="problem-label">Problème</InputLabel>
                            <Select
                                {...formik.getFieldProps('labels')}
                                error={formik.touched.labels && Boolean(formik.errors.labels)}
                                fullWidth
                                required
                                labelId="problem-label"
                                id="labels"
                                label="Problème"
                                name="labels"

                            >
                                <MenuItem value="MDP_incorrect">Mot de passe incorrect</MenuItem>
                                <MenuItem value="Compte_bloqué">Compte bloqué</MenuItem>
                                <MenuItem value="Connexion_impossible">Connexion impossible</MenuItem>
                                <MenuItem value="Bug_sur_la_page">Bug sur la page</MenuItem>


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="priorite-label">Priorité</InputLabel>
                            <Select
                                {...formik.getFieldProps('priority')} // Apply Formik props for integration
                                error={formik.touched.priority && Boolean(formik.errors.priority)} // Set error state
                                fullWidth
                                labelId="priorite-label"
                                id="priority"
                                label="Priorité"
                                name="priority"
                            >
                                <MenuItem value="4">Faible</MenuItem>
                                <MenuItem value="3">Moyenne</MenuItem>
                                <MenuItem value="2">Élevée</MenuItem>
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
                            onChange={handleFileChange} focused
                            fullWidth // To occupy full width
                        />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <FormControlLabel
                            control={<Checkbox  {...formik.getFieldProps('allowExtraEmails')} color="primary"/>}
                            label="I want to receive a copy via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    endIcon={<SendIcon/>}
                    type="submit"
                    color={'info'}
                    fullWidth
                    variant="contained"
                    sx={{mt: 2, mb: 2, bgcolor: 'error.dark'}}
                    disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Envoi en cours...' : 'Envoyer Réclamation'}

                </Button>

            </Box>
        </Box>
    );
}

export default ReclamationForm;
