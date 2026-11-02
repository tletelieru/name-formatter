import { IconButton, Tooltip } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useMessages } from '../messages';
import { CheckIcon, CopyIcon } from './icons';

export default function CopyButton({ text, label }: { text: string; label?: string }) {
  const t = useMessages();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  }, [text]);

  const title = copied ? t.copied : t.copy;

  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          size="small"
          aria-label={label ? `${t.copy}: ${label}` : t.copy}
          disabled={!text}
          onClick={copy}
          sx={{ color: copied ? 'success.main' : 'text.secondary' }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
        </IconButton>
      </span>
    </Tooltip>
  );
}
