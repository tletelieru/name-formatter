import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { MONO } from '../theme';

type Props<T extends string> = {
  label: string;
  value: T;
  options: readonly { value: T; label: string; code?: boolean }[];
  onChange: (value: T) => void;
  fullWidth?: boolean;
};

export default function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  fullWidth,
}: Props<T>) {
  return (
    <Stack spacing={0.75}>
      <Typography variant="caption" component="p" sx={{ color: 'text.secondary', fontWeight: 600 }}>
        {label}
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        color="primary"
        aria-label={label}
        value={value}
        fullWidth={fullWidth}
        onChange={(_, next: T | null) => {
          if (next !== null) onChange(next);
        }}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            sx={{
              px: 1.25,
              py: 0.5,
              fontFamily: option.code ? MONO : undefined,
              fontSize: option.code ? '0.8rem' : '0.8125rem',
            }}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
