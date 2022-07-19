import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MyButton(props) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={props.variant}>{props.title}</Button>
    </Stack>
  );
}
