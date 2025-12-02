import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/actions')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Actions</h1>

        <p class='text-lg text-gray-700 mb-6'>
          Actions are side effects that occur during state transitions.
          They can update context, call external APIs, or perform any other
          operation.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            What are Actions?
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions are functions that execute during transitions or when
            entering/exiting states. They have access to the current
            context and event data, and can modify the context.
          </p>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Defining Actions
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions are referenced by name in your configuration and
            implemented in the machine options:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig } from '@bemedev/app-ts';

const config = createConfig({
  initial: 'idle',
  context: { count: 0 },
  states: {
    idle: {
      on: {
        INCREMENT: {
          target: 'idle',
          actions: 'incrementCount',
        },
        DECREMENT: {
          target: 'idle',
          actions: 'decrementCount',
        },
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Entry and Exit Actions
          </h2>
          <p class='text-gray-700 mb-4'>
            Execute actions when entering or exiting a state:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const config = createConfig({
  initial: 'idle',
  states: {
    idle: {
      entry: 'logEntry',
      exit: 'logExit',
      on: {
        START: 'running',
      },
    },
    running: {
      entry: ['startTimer', 'notifyUser'],
      exit: 'stopTimer',
      on: {
        STOP: 'idle',
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Multiple Actions
          </h2>
          <p class='text-gray-700 mb-4'>
            Execute multiple actions in sequence:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const config = createConfig({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'loading',
          // Actions execute in order
          actions: ['validateInput', 'logSubmit', 'sendRequest'],
        },
      },
    },
    loading: {
      on: {
        SUCCESS: {
          target: 'success',
          actions: ['storeResult', 'notifyUser'],
        },
        ERROR: {
          target: 'error',
          actions: ['logError', 'showErrorMessage'],
        },
      },
    },
    success: {},
    error: {},
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Action Parameters
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions receive context and event data:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`type Context = {
  count: number;
  history: number[];
};

const actions = {
  increment: (context: Context, event: any) => {
    return {
      ...context,
      count: context.count + 1,
      history: [...context.history, context.count + 1],
    };
  },
  
  addValue: (context: Context, event: { type: 'ADD'; value: number }) => {
    return {
      ...context,
      count: context.count + event.value,
    };
  },
};`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Assign Action
          </h2>
          <p class='text-gray-700 mb-4'>
            Update specific context properties without replacing the entire
            context:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const actions = {
  updateUser: (context, event) => ({
    ...context,
    user: {
      ...context.user,
      name: event.name,
      email: event.email,
    },
  }),
  
  resetCount: (context) => ({
    ...context,
    count: 0,
  }),
};`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Side Effects
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions can perform side effects like API calls or logging:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const actions = {
  logState: (context, event) => {
    console.log('State transition:', event.type);
    return context;
  },
  
  async fetchData(context, event) {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      return { ...context, data };
    } catch (error) {
      return { ...context, error };
    }
  },
  
  notifyUser: (context) => {
    alert('Operation completed!');
    return context;
  },
};`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Best Practices
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>Keep actions pure when possible - avoid side effects</li>
            <li>
              Use descriptive action names that indicate what they do
            </li>
            <li>
              Always return a new context object - don't mutate the
              existing one
            </li>
            <li>
              Group related actions together (e.g., logging actions, API
              actions)
            </li>
            <li>
              Handle errors within actions rather than letting them
              propagate
            </li>
            <li>Use TypeScript to type your context and events</li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Learn More
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/concepts/context'
                class='text-blue-600 hover:underline'
              >
                Context
              </a>{' '}
              - Managing state data
            </li>
            <li>
              <a
                href='/docs/concepts/guards'
                class='text-blue-600 hover:underline'
              >
                Guards
              </a>{' '}
              - Conditional transitions
            </li>
            <li>
              <a
                href='/docs/examples/form-validation'
                class='text-blue-600 hover:underline'
              >
                Form Validation Example
              </a>{' '}
              - See actions in practice
            </li>
          </ul>
        </section>
      </div>
    );
  },
});
