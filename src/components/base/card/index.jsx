import { Card, CardContent } from '@mui/material';

/**
 * @param {import('@mui/material').CardProps}
 */
export const BaseCard = ({ children, variant = 'outlined', sx, ...props }) => {
  return (
    <Card variant={variant} sx={{ borderRadius: 4, ...sx }} {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
