import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface DividerWithTextProps {
  text: string;
}

export function DividerWithText({ text }: DividerWithTextProps) {
  return (
    <Box display="flex" alignItems="center" textAlign="center">
      <Box flex={1} borderBottom={1} borderColor="divider" />
      <Box px={2}>
        <Typography variant="caption" component="span">
          {text}
        </Typography>
      </Box>
      <Box flex={1} borderBottom={1} borderColor="divider" />
    </Box>
  );
}
