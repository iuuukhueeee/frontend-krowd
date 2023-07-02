import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandCircleDownIcon,
      },

      styleOverrides: {
        root: {},
      },
    },
  };
}
