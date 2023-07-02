interface CustomShapeOptions {
  borderRadius: number | string;
  borderRadiusSm: number | string;
  borderRadiusMd: number | string;
}

declare module '@mui/material/styles' {
  interface Theme {
    shape: CustomShapeOptions;
  }
}

const shape = {
  borderRadius: 8,
  borderRadiusSm: 12,
  borderRadiusMd: 16,
};

export default shape;
