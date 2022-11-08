import { TextFields } from '@mui/icons-material';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * @param {import('@mui/material').AutocompleteProps}
 */
export const BaseAutocomplete = ({ name, options, label, required, ...props }) => {
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
          <FormControl required={required} fullWidth size='small'>
            <Autocomplete
              {...field}
              color='primary'
              options={options}
              label={label}
              {...props}
              error={!!errors[name]}
              renderInput={params => <TextFields {...params} label={label} />}
            ></Autocomplete>
          </FormControl>
        </>
      )}
    />
  );
};
