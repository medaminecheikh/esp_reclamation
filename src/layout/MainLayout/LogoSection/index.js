import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import {ButtonBase} from '@mui/material';

// project imports
import config from 'config';
import {MENU_OPEN} from 'store/actions';
import logo from '../../../assets/images/logo.svg';
import * as React from "react";
// ==============================|| MAIN LOGO ||============================== //
const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer'
};
const LogoSection = () => {
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    return (
        <ButtonBase disableRipple onClick={() => dispatch({type: MENU_OPEN, id: defaultId})} component={Link}
                    to={config.defaultPath}>
            <img
                src={
                    logo
                }
                style={logoStyle}
                alt="ESPRIT"
            />
        </ButtonBase>
    );
};

export default LogoSection;
