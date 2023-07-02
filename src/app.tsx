import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const baseTheme = createTheme();

import ThemeConfig from './shared/theme';
import ThemePrimaryColor from './shared/theme/ThemePrimaryColor';
import { browserRouter } from './router';

import 'react-quill/dist/quill.snow.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <HelmetProvider>
          <RouterProvider router={browserRouter} />
        </HelmetProvider>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

export default App;
