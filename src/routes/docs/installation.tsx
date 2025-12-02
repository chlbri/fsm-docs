import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/installation')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Installation</h1>

        <p class='text-lg text-gray-700 mb-6'>
          Get started with @bemedev/app-ts by installing it in your
          project.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Requirements
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>Node.js version 22 or higher</li>
            <li>TypeScript 5.0 or higher (recommended)</li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Package Manager Installation
          </h2>

          <h3 class='text-xl font-semibold text-gray-900 mb-2 mt-4'>
            npm
          </h3>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg mb-4'>
            <pre class='text-sm'>
              <code>npm install @bemedev/app-ts</code>
            </pre>
          </div>

          <h3 class='text-xl font-semibold text-gray-900 mb-2 mt-4'>
            yarn
          </h3>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg mb-4'>
            <pre class='text-sm'>
              <code>yarn add @bemedev/app-ts</code>
            </pre>
          </div>

          <h3 class='text-xl font-semibold text-gray-900 mb-2 mt-4'>
            pnpm
          </h3>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg mb-4'>
            <pre class='text-sm'>
              <code>pnpm add @bemedev/app-ts</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            TypeScript Configuration
          </h2>
          <p class='text-gray-700 mb-4'>
            For the best development experience, ensure your{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              tsconfig.json
            </code>{' '}
            includes these settings:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Verify Installation
          </h2>
          <p class='text-gray-700 mb-4'>
            Create a simple file to verify the installation works:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig } from '@bemedev/app-ts';

const config = createConfig({
  initial: 'idle',
  states: {
    idle: {},
  },
});

console.log('Installation successful!', config);`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Next Steps
          </h2>
          <p class='text-gray-700 mb-4'>
            Now that you've installed @bemedev/app-ts, you're ready to
            start building:
          </p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/quick-start'
                class='text-blue-600 hover:underline'
              >
                Quick Start Guide
              </a>{' '}
              - Build your first state machine
            </li>
            <li>
              <a
                href='/docs/concepts/state-machines'
                class='text-blue-600 hover:underline'
              >
                State Machines
              </a>{' '}
              - Learn the core concepts
            </li>
            <li>
              <a
                href='/docs/examples/traffic-light'
                class='text-blue-600 hover:underline'
              >
                Examples
              </a>{' '}
              - See real-world implementations
            </li>
          </ul>
        </section>
      </div>
    );
  },
});
