import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * @param {import('@mui/material').SelectProps}
 */
export const BaseSelect = ({ name, options, label, ...props }) => {
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
        <>
          <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              {...field}
              color='primary'
              label={label}
              {...props}
              error={!!errors[name]}
            >
              {options.map((opt, index) => {
                return (
                  <MenuItem key={index} value={opt.value}>
                    {' '}
                    {opt.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>
      )}
    />
  );
};
