import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material

import {
  ContactForm,
  ContactHero,
  ContactMap,
} from '../components/_external-pages/contact';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function Contact() {
  return (
    <RootStyle title="Contact us | Minimal-UI">
      <ContactHero />

      <Container sx={{ my: 10 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactMap />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
