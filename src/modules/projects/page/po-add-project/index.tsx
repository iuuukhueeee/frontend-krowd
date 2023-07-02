import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import Page from '@/shared/components/page';
import useSettings from '@/shared/hooks/use-settings';

import ProductNewForm from '../../components/create-project';

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  return (
    <Page title="Ecommerce: Create a new product | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ProductNewForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
