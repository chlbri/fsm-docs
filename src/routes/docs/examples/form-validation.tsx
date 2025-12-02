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
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const formMachine = createMachine({
  initial: 'editing',
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

// Create the service with initial context
const service = interpret(formMachine, {
  context: {
    email: '',
    password: '',
    errors: {},
  },
});

// Define actions using provideOptions
service.provideOptions(({ assign }) => ({
  actions: {
    updateEmail: assign('context.email', ({ event }) => event.value),
    updatePassword: assign('context.password', ({ event }) => event.value),
    clearErrors: assign('context.errors', () => ({})),
    validate: assign('context.errors', ({ context }) => {
      const errors: any = {};
      if (!context.email.includes('@')) {
        errors.email = 'Invalid email';
      }
      if (context.password.length < 8) {
        errors.password = 'Password too short';
      }
      return errors;
    }),
  },
}));`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});
