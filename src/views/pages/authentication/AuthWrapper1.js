// material-ui
import { styled } from '@mui/material/styles';
import gbloginImage from '../../../assets/images/ColoredShapes.svg'; // Assuming your folder structure


// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
   backgroundImage: `url(${gbloginImage})`,
  backgroundSize: 'cover',
  minHeight: '100vh'
}));

export default AuthWrapper1;
