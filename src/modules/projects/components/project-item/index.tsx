import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  Divider,
  styled,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { fCurrency } from '@/utils/formatNumber';

import { ProjectModel } from '../../types/project';

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export default function ProjectItem({
  image,
  projectName,
  funded,
  areaName,
  status,
  projectId,
}: ProjectModel) {
  const navigate = useNavigate();
  const StatusChip = useMemo(() => {
    if (status === 'Pending') {
      return (
        <Chip label={status} variant="filled" size="small" color="warning" />
      );
    }
    if (status === 'Approved') {
      return (
        <Chip label={status} variant="filled" size="small" color="success" />
      );
    }
    if (status === 'Rejected') {
      return (
        <Chip label={status} variant="filled" size="small" color="error" />
      );
    }
  }, [status]);

  const openProject = () => {
    navigate(`/po/project/${projectId}`);
  };

  return (
    <TableRow onClick={openProject}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThumbImgStyle alt="product image" src={image} />
          <Box>
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
              {projectName}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  brand:&nbsp;
                </Typography>
                {projectName}
              </Typography>
              <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
              <Typography variant="body2">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  area:&nbsp;
                </Typography>
                {areaName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>

      <TableCell align="left">{fCurrency(funded)}</TableCell>

      <TableCell align="right">{StatusChip}</TableCell>

      {/* <TableCell align="right">
        <MIconButton onClick={() => {}}>
          <Icon icon={trash2Fill} width={20} height={20} />
        </MIconButton>
      </TableCell> */}
    </TableRow>
  );
}
