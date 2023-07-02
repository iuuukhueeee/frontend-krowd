import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import ProjectItem from '../../components/project-item';

import { projects } from './mock';

export default function POProjectManagement() {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell align="left">Funded</TableCell>
            <TableCell align="right">Status</TableCell>
            {/* <TableCell align="right">Total Price</TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {projects.map((project) => (
            <ProjectItem key={project.projectId} {...project} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
