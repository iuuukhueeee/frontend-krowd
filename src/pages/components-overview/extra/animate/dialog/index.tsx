import { useState } from 'react';
import { Card, Grid } from '@mui/material';

import ControlPanel from '../ControlPanel';

import ContainerView from './ContainerView';
//
import variantTypes from './types';

export default function DialogView() {
  const [open, setOpen] = useState(false);
  const [selectVariant, setSelectVariant] = useState('slideInUp');

  const handleChangeVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectVariant(event.target.value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView
            isOpen={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            selectVariant={selectVariant}
          />
        </Grid>
        <Grid item xs={3}>
          <ControlPanel
            variantTypes={variantTypes}
            selectVariant={selectVariant}
            onChangeVariant={handleChangeVariant}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
