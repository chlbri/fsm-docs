import { createFileRoute } from '@tanstack/solid-router';
import { Link } from '@tanstack/solid-router';

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div class='w-full flex flex-col items-center space-y-12 py-12'>
        {/* Hero Section */}
        <section class='text-center space-y-6 max-w-4xl'>
          <h1 class='text-6xl font-bold text-gray-900'>@bemedev/app-ts</h1>
          <p class='text-2xl text-gray-600'>
            Type-safe state machines for modern TypeScript applications
          </p>
          <p class='text-lg text-gray-500 max-w-2xl mx-auto'>
            Build predictable, maintainable applications with finite state
            machines. Fully typed, tested, and production-ready.
          </p>

          <div class='flex gap-4 justify-center mt-8'>
            <Link
              to='/docs/introduction'
              class='px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              Get Started
            </Link>
            <Link
              to='/docs/examples/traffic-light'
              class='px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors'
            >
              View Examples
            </Link>
          </div>
        </section>

        {/* Code Example */}
        <section class='w-full max-w-4xl'>
          <div class='bg-gray-900 text-gray-100 p-6 rounded-lg'>
            <pre class='text-sm overflow-x-auto'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const toggleMachine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

const service = interpret(toggleMachine, {
  context: { count: 0 },
});

service.send({ type: 'TOGGLE' });
console.log(service.value); // 'active'`}</code>
            </pre>
          </div>
        </section>

        {/* Features */}
        <section class='w-full max-w-6xl grid md:grid-cols-3 gap-8 px-4'>
          <div class='p-6 border border-gray-200 rounded-lg'>
            <h3 class='text-xl font-semibold text-gray-900 mb-3'>
              Fully Typed
            </h3>
            <p class='text-gray-600'>
              Built with TypeScript for complete type safety and excellent
              IDE support with auto-completion.
            </p>
          </div>

          <div class='p-6 border border-gray-200 rounded-lg'>
            <h3 class='text-xl font-semibold text-gray-900 mb-3'>
              Predictable
            </h3>
            <p class='text-gray-600'>
              Make state transitions explicit and testable. No more hidden
              state or race conditions.
            </p>
          </div>

          <div class='p-6 border border-gray-200 rounded-lg'>
            <h3 class='text-xl font-semibold text-gray-900 mb-3'>
              Powerful
            </h3>
            <p class='text-gray-600'>
              Support for guards, actions, delays, nested machines, and
              reactive subscriptions.
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section class='w-full max-w-4xl text-center'>
          <h2 class='text-3xl font-bold text-gray-900 mb-8'>
            Explore the Documentation
          </h2>
          <div class='grid md:grid-cols-2 gap-6'>
            <Link
              to='/docs/installation'
              class='p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left'
            >
              <h3 class='text-xl font-semibold text-gray-900 mb-2'>
                Installation →
              </h3>
              <p class='text-gray-600'>
                Get up and running with @bemedev/app-ts in minutes
              </p>
            </Link>

            <Link
              to='/docs/quick-start'
              class='p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left'
            >
              <h3 class='text-xl font-semibold text-gray-900 mb-2'>
                Quick Start →
              </h3>
              <p class='text-gray-600'>Build your first state machine</p>
            </Link>

            <Link
              to='/docs/concepts/state-machines'
              class='p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left'
            >
              <h3 class='text-xl font-semibold text-gray-900 mb-2'>
                Core Concepts →
              </h3>
              <p class='text-gray-600'>
                Learn the fundamentals of state machines
              </p>
            </Link>

            <Link
              to='/docs/api/create-config'
              class='p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left'
            >
              <h3 class='text-xl font-semibold text-gray-900 mb-2'>
                API Reference →
              </h3>
              <p class='text-gray-600'>
                Complete API documentation and type definitions
              </p>
            </Link>
          </div>
        </section>
      </div>
    );
  },
});
