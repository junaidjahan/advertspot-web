import { FormProvider } from 'react-hook-form';

export const BaseForm = ({ form, onSubmit, children, ...props }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
