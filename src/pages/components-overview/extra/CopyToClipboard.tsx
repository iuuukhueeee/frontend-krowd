import { Box, Card, CardContent, Container, styled } from '@mui/material';

import CopyClipboard from '../../../components/CopyClipboard';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

export default function CopyToClipboard() {
  return (
    <RootStyle title="Components: Copy To Clipboard | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Copy To Clipboard"
            links={[
              { name: 'Components', href: PATH_PAGE.components },
              { name: 'Copy To Clipboard' },
            ]}
            moreLink="https://www.npmjs.com/package/react-copy-to-clipboard"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <CopyClipboard value="https://www.npmjs.com/package/react-copy-to-clipboard" />
          </CardContent>
        </Card>
      </Container>
    </RootStyle>
  );
}
