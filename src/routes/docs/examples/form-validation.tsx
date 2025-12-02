import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/examples/form-validation')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Form Validation Example
        </h1>
        <p class='text-lg text-gray-700 mb-6'>
          A practical example of using state machines for form validation
          with guards and context updates.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Implementation
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig, createChildS } from '@bemedev/app-ts';

const formConfig = createConfig({
  initial: 'editing',
  context: {
    email: '',
    password: '',
    errors: {},
  },
  pContext: {},
  states: {
    editing: {
      on: {
        UPDATE_EMAIL: {
          target: 'editing',
          actions: 'updateEmail',
        },
        UPDATE_PASSWORD: {
          target: 'editing',
          actions: 'updatePassword',
        },
        SUBMIT: {
          target: 'validating',
          actions: 'clearErrors',
        },
      },
    },
    validating: {
      entry: 'validate',
      on: {
        VALIDATION_SUCCESS: 'submitting',
        VALIDATION_ERROR: 'editing',
      },
    },
    submitting: {
      entry: 'submitForm',
      on: {
        SUBMIT_SUCCESS: 'success',
        SUBMIT_ERROR: 'error',
      },
    },
    success: {
      type: 'final',
    },
    error: {
      on: {
        RETRY: 'validating',
        EDIT: 'editing',
      },
    },
  },
});

const actions = {
  updateEmail: (context: any, event: any) => ({
    ...context,
    email: event.value,
  }),
  
  updatePassword: (context: any, event: any) => ({
    ...context,
    password: event.value,
  }),
  
  clearErrors: (context: any) => ({
    ...context,
    errors: {},
  }),
  
  validate: (context: any) => {
    const errors: any = {};
    
    if (!context.email.includes('@')) {
      errors.email = 'Invalid email';
    }
    
    if (context.password.length < 8) {
      errors.password = 'Password too short';
    }
    
    return { ...context, errors };
  },
  
  submitForm: async (context: any) => {
    try {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          email: context.email,
          password: context.password,
        }),
      });
      return context;
    } catch (error) {
      return { ...context, errors: { submit: 'Failed to submit' } };
    }
  },
};`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});
