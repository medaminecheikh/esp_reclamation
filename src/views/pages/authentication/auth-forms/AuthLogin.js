import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import LoginRequest from '../../../../services/backApi/LoginRequest';
import { useUser } from '../../../../context/UserContext';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
const navigate = useNavigate (); 
const { loginUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          Username: 'info@esprit.tn',
          Password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          Username: Yup.string().email('Must be a valid email').max(255).required('Username is required'),
          Password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log("values",values);
            const response = await LoginRequest({ Username: values.Username, Password: values.Password }); // Call the LoginRequest function with form values
            console.log('Login successful:', response);
           // Store token in session storage
           await loginUser( values.Username, values.Password );
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('role', response.role);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            if (response.role === 'admin') {
        navigate('/admin/dashboard'); // Navigate to admin route
      } else if (response.role === 'user') {
        navigate('/esp/reclamation'); // Navigate to esp route
      } else {
        // Navigate to some default route
      }
          } catch (err) {
            console.error('Error logging in:', error);
            console.error(err);
           
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.Username && errors.Username)}
                         sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.Username}
                name="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.Username && errors.Username && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.Username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.Password && errors.Password)}
                         sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'Password'}
                value={values.Password}
                name="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.Password && errors.Password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.Password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked"
                            color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large"  type="submit"
                        variant="contained" sx={{bgcolor:"#535252"}} color={'info'}  >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
