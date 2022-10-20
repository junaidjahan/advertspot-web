import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

/**
 *
 * @param {import('react-hook-form').UseFormProps & { schema: object }}
 */
export const useForm = ({ schema, ...formConfig }) => {
  return useHookForm({
    mode: 'onChange',
    ...formConfig,
    resolver: zodResolver(schema)
  });
};
