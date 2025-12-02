import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/state-machines')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          State Machines
        </h1>

        <p class='text-lg text-gray-700 mb-6'>
          Understand the fundamental concepts of finite state machines and
          how to use them effectively with @bemedev/app-ts.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            What is a Finite State Machine?
          </h2>
          <p class='text-gray-700 mb-4'>
            A finite state machine (FSM) is a mathematical model of
            computation that can be in exactly one of a finite number of
            states at any given time. The machine changes from one state to
            another in response to events, following predefined rules
            called transitions.
          </p>
          <p class='text-gray-700 mb-4'>
            Key components of a state machine:
          </p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <strong>States</strong> - The possible conditions the machine
              can be in
            </li>
            <li>
              <strong>Events</strong> - Triggers that cause state
              transitions
            </li>
            <li>
              <strong>Transitions</strong> - Rules defining how events
              change states
            </li>
            <li>
              <strong>Initial State</strong> - The starting state of the
              machine
            </li>
            <li>
              <strong>Context</strong> - Data associated with the machine
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Creating a State Machine
          </h2>
          <p class='text-gray-700 mb-4'>
            Use the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              createConfig
            </code>{' '}
            function to define a state machine configuration:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig } from '@bemedev/app-ts';

const trafficLightConfig = createConfig({
  // Initial state when machine starts
  initial: 'green',
  
  // Define all possible states
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      },
    },
    yellow: {
      on: {
        TIMER: 'red',
      },
    },
    red: {
      on: {
        TIMER: 'green',
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            State Configuration
          </h2>
          <p class='text-gray-700 mb-4'>
            Each state can have various properties:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const config = createConfig({
  initial: 'idle',
  states: {
    idle: {
      // Entry actions execute when entering this state
      entry: 'logEntry',
      
      // Exit actions execute when leaving this state
      exit: 'logExit',
      
      // Event handlers define transitions
      on: {
        START: {
          target: 'running',
          actions: 'startTimer',
          guard: 'canStart',
        },
      },
      
      // After delays trigger after specified time
      after: {
        5000: 'timeout',
      },
    },
    running: {
      on: {
        STOP: 'idle',
        PAUSE: 'paused',
      },
    },
    paused: {
      on: {
        RESUME: 'running',
        STOP: 'idle',
      },
    },
    timeout: {
      type: 'final',
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Hierarchical States
          </h2>
          <p class='text-gray-700 mb-4'>
            States can be nested to create hierarchical state machines:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const playerConfig = createConfig({
  initial: 'stopped',
  states: {
    stopped: {
      on: {
        PLAY: 'playing',
      },
    },
    playing: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            SPEED_UP: 'fast',
          },
        },
        fast: {
          on: {
            SLOW_DOWN: 'normal',
          },
        },
      },
      on: {
        PAUSE: 'paused',
        STOP: 'stopped',
      },
    },
    paused: {
      on: {
        PLAY: 'playing',
        STOP: 'stopped',
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Parallel States
          </h2>
          <p class='text-gray-700 mb-4'>
            State machines can have multiple concurrent states using the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              parallel
            </code>{' '}
            type:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const appConfig = createConfig({
  type: 'parallel',
  states: {
    // Audio subsystem
    audio: {
      initial: 'muted',
      states: {
        muted: {
          on: { UNMUTE: 'playing' },
        },
        playing: {
          on: { MUTE: 'muted' },
        },
      },
    },
    // Video subsystem
    video: {
      initial: 'paused',
      states: {
        paused: {
          on: { PLAY: 'playing' },
        },
        playing: {
          on: { PAUSE: 'paused' },
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
            Best Practices
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>Keep states simple and focused on a single concern</li>
            <li>Use descriptive names for states and events</li>
            <li>Avoid deeply nested state hierarchies when possible</li>
            <li>
              Define all possible states explicitly - avoid implicit states
            </li>
            <li>
              Use guards to prevent invalid transitions rather than relying
              on state checks
            </li>
            <li>
              Document complex state machines with diagrams or state tables
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Learn More
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/concepts/events'
                class='text-blue-600 hover:underline'
              >
                Events
              </a>{' '}
              - Understanding event handling
            </li>
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
                href='/docs/examples/traffic-light'
                class='text-blue-600 hover:underline'
              >
                Traffic Light Example
              </a>{' '}
              - Complete implementation
            </li>
          </ul>
        </section>
      </div>
    );
  },
});
