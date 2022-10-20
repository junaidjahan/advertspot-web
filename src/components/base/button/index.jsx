import { Button, CircularProgress } from '@mui/material';

/**
 * @param {import('@mui/material').ButtonProps & {loading: boolean}}
 */
export const BaseButton = ({ variant, loading, children, disabled, ...props }) => {
  return (
    <Button
      variant={variant ?? 'text'}
      sx={{ borderRadius: 1 }}
      disableElevation
      {...props}
      disabled={loading || disabled}
    >
      {loading && <CircularProgress size={20} sx={{ marginRight: '10px' }} color='primary' />} {children}
    </Button>
  );
};
