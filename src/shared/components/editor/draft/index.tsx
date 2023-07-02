import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { BoxProps } from '@mui/material';

import DraftEditorStyle from './DraftEditorStyle';
import { editorToolbar } from './DraftEditorToolbar';

interface DraftEditorProps extends EditorProps {
  sx?: BoxProps;
}

export default function DraftEditor({ sx, ...other }: DraftEditorProps) {
  return (
    <DraftEditorStyle sx={sx}>
      <Editor
        toolbar={editorToolbar}
        placeholder="Write something awesome..."
        {...other}
      />
    </DraftEditorStyle>
  );
}
