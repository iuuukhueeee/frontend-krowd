import { ReactNode, useMemo } from 'react';
import { alpha, createTheme, ThemeProvider, useTheme } from '@mui/material';

import useSettings from '../hooks/use-settings';

import ComponentsOverrides from './overrides';

type ThemePrimaryColorProps = {
  children: ReactNode;
};

export default function ThemePrimaryColor({
  children,
}: ThemePrimaryColorProps) {
  const defaultTheme = useTheme();
  const { setColor } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: setColor,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`,
      },
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
