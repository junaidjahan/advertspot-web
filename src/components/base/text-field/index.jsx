import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * @param {import('@mui/material').TextFieldProps}
 */
export const BaseTextField = ({ name, label, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          variant='outlined'
          color='primary'
          size='small'
          label={label}
          {...props}
          sx={{
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              font: 'revert'
            },
            '& .MuiInputLabel-root': {
              font: 'revert'
            }
          }}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message : ''}
        />
      )}
    />
  );
};
