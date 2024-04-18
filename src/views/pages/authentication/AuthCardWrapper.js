import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
style={{background: 'rgba(255, 255, 255, 0.83)', /* Transparent white */
      backdropFilter: 'blur(10px)', /* Adjust the blur level as needed */
      borderRadius: '10px', /* Adjust border radius as needed */
      padding: '20px' /* Adjust padding as needed */
    }}
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
  >
    <Box  sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthCardWrapper;
