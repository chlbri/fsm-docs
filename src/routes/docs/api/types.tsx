import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/api/types')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Type Definitions
        </h1>
        <p class='text-lg text-gray-700 mb-6'>
          TypeScript type definitions provided by @bemedev/app-ts.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>Config</h2>
          <p class='text-gray-700 mb-4'>
            The main configuration type for state machines
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`interface Config {
  initial: string;
  context?: any;
  pContext?: any;
  states: Record<string, StateNode>;
  type?: 'parallel';
}`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            StateNode
          </h2>
          <p class='text-gray-700 mb-4'>
            Configuration for a single state
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`interface StateNode {
  on?: Record<string, string | TransitionConfig>;
  entry?: string | string[];
  exit?: string | string[];
  after?: Record<number, string>;
  type?: 'final';
  states?: Record<string, StateNode>;
  initial?: string;
}`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            TransitionConfig
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`interface TransitionConfig {
  target: string;
  actions?: string | string[];
  guard?: string;
}`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            EventsMap
          </h2>
          <p class='text-gray-700 mb-4'>Type for defining event types</p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`type EventsMap = Record<string, any>;

// Example usage
type MyEvents = {
  START: { type: 'START' };
  STOP: { type: 'STOP' };
  UPDATE: { type: 'UPDATE'; value: number };
};`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Helper Types
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`// Extract context type from config
type ContextFrom<T> = T extends { context: infer C } ? C : never;

// Extract private context type from config
type PrivateContextFrom<T> = T extends { pContext: infer PC } ? PC : never;

// Extract events type from config
type EventsMapFrom<T> = T extends { events: infer E } ? E : EventsMap;`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Usage Example
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig, type ContextFrom } from '@bemedev/app-ts';

const config = createConfig({
  initial: 'idle',
  context: { count: 0, name: '' },
  pContext: {},
  states: {
    idle: {},
  },
});

// Extract the context type
type MyContext = ContextFrom<typeof config>;
// MyContext = { count: number; name: string }`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});
