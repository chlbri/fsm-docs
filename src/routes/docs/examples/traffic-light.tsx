import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/examples/traffic-light')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Traffic Light Example
        </h1>
        <p class='text-lg text-gray-700 mb-6'>
          A complete example of a traffic light state machine with
          automatic transitions and emergency override.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Overview
          </h2>
          <p class='text-gray-700 mb-4'>This example demonstrates:</p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>Time-based automatic transitions</li>
            <li>Entry and exit actions</li>
            <li>Emergency event handling</li>
            <li>Context management for timing</li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Implementation
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig, createChildS } from '@bemedev/app-ts';

// Define the traffic light configuration
const trafficLightConfig = createConfig({
  initial: 'green',
  context: {
    lastChange: Date.now(),
    emergencyActive: false,
  },
  pContext: {},
  states: {
    green: {
      entry: 'logGreenEntry',
      exit: 'logGreenExit',
      after: {
        10000: 'yellow', // Transition after 10 seconds
      },
      on: {
        EMERGENCY: 'red',
      },
    },
    yellow: {
      entry: 'logYellowEntry',
      after: {
        3000: 'red', // Transition after 3 seconds
      },
      on: {
        EMERGENCY: 'red',
      },
    },
    red: {
      entry: 'logRedEntry',
      after: {
        12000: 'green', // Transition after 12 seconds
      },
      on: {
        EMERGENCY_CLEAR: 'green',
      },
    },
  },
});

// Define actions
const actions = {
  logGreenEntry: (context: any) => {
    console.log('🟢 Green light - GO');
    return {
      ...context,
      lastChange: Date.now(),
      emergencyActive: false,
    };
  },
  
  logGreenExit: (context: any) => {
    console.log('Leaving green light');
    return context;
  },
  
  logYellowEntry: (context: any) => {
    console.log('🟡 Yellow light - CAUTION');
    return {
      ...context,
      lastChange: Date.now(),
    };
  },
  
  logRedEntry: (context: any, event: any) => {
    const isEmergency = event.type === 'EMERGENCY';
    console.log(
      isEmergency
        ? '🔴 Red light - EMERGENCY STOP'
        : '🔴 Red light - STOP'
    );
    return {
      ...context,
      lastChange: Date.now(),
      emergencyActive: isEmergency,
    };
  },
};

// Create the machine instance
const trafficLight = createChildS(
  trafficLightConfig,
  {
    context: {
      lastChange: Date.now(),
      emergencyActive: false,
    },
    pContext: {},
  }
);

// Example usage
console.log('Initial state:', trafficLight.state); // 'green'

// Simulate emergency
setTimeout(() => {
  trafficLight.send({ type: 'EMERGENCY' });
  console.log('After emergency:', trafficLight.state); // 'red'
}, 5000);

// Clear emergency after some time
setTimeout(() => {
  trafficLight.send({ type: 'EMERGENCY_CLEAR' });
  console.log('After clear:', trafficLight.state); // 'green'
}, 8000);`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            State Diagram
          </h2>
          <p class='text-gray-700 mb-4'>
            The traffic light cycles through three states:
          </p>
          <div class='border border-gray-300 rounded-lg p-6 bg-gray-50'>
            <div class='flex items-center justify-around'>
              <div class='text-center'>
                <div class='w-16 h-16 bg-green-500 rounded-full mx-auto mb-2'></div>
                <p class='font-semibold'>Green (10s)</p>
              </div>
              <div class='text-2xl'>→</div>
              <div class='text-center'>
                <div class='w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-2'></div>
                <p class='font-semibold'>Yellow (3s)</p>
              </div>
              <div class='text-2xl'>→</div>
              <div class='text-center'>
                <div class='w-16 h-16 bg-red-500 rounded-full mx-auto mb-2'></div>
                <p class='font-semibold'>Red (12s)</p>
              </div>
            </div>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Key Concepts
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <strong>Delayed Transitions</strong> - Using{' '}
              <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
                after
              </code>{' '}
              for automatic state changes
            </li>
            <li>
              <strong>Entry Actions</strong> - Logging and context updates
              when entering states
            </li>
            <li>
              <strong>Event Overrides</strong> - Emergency events can
              interrupt the normal cycle
            </li>
            <li>
              <strong>Context Tracking</strong> - Maintaining timestamps
              and emergency status
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Try It Yourself
          </h2>
          <p class='text-gray-700 mb-4'>Extend this example by adding:</p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              A pedestrian crossing button that triggers yellow immediately
            </li>
            <li>Night mode with flashing yellow light</li>
            <li>Counter for number of cycles completed</li>
            <li>Different timing for rush hour vs. normal hours</li>
          </ul>
        </section>
      </div>
    );
  },
});
