import { useCallback, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Choice {
  value: string;
  onSelect: () => void;
}

interface MultiToggleProps {
  choices: Choice[];
}

export function MultiToggle({ choices }: MultiToggleProps) {
  const [alignment, setAlignment] = useState<Choice>(choices[0]);

  const handleAlignment = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newAlignment: Choice) => {
      setAlignment(newAlignment);
      newAlignment.onSelect();
    },
    [setAlignment],
  );

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {choices.map((choice) => (
        <ToggleButton key={choice.value} value={choice}>
          {choice.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
