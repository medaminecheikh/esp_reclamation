import { Button, FormControl, Grid, Stack, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

import React from 'react'
import AnimateButton from 'ui-component/extended/AnimateButton'

function UpdateForm() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Stack spacing={4}>
          <Typography variant='h2'>Utilisateur Choisi</Typography>

          {/* Email and Password fields */}
          <Stack direction="row" spacing={2}>
            <TextField label="Email" id="username" variant="filled" size="small" />
            <TextField label="New Password" id="password" variant="filled" size="small" />
          </Stack>

          {/* Role and Status selects */}
          <Stack direction="row" spacing={2}>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                size="small"
              >
             
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                size="small"
              >
               
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Save and Cancel buttons */}
          
          <Stack direction="row" style={{ marginTop: '60px', width:'100%'  }} justifyContent={'flex-end'} spacing={2}>
            <AnimateButton >
              <Button  disableElevation minWidth="100px" fullWidth size="small" type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button disableElevation fullWidth size="small" type="reset" variant="contained" color="inherit">
                Cancel
              </Button>
            </AnimateButton>
          </Stack>
          
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UpdateForm