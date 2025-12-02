import { createFileRoute, Outlet } from '@tanstack/solid-router';
import { Component, For } from 'solid-js';
import { Link as _Link } from '@tanstack/solid-router';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', to: '/docs/introduction' },
      { label: 'Installation', to: '/docs/installation' },
      { label: 'Quick Start', to: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'State Machines', to: '/docs/concepts/state-machines' },
      { label: 'Events', to: '/docs/concepts/events' },
      { label: 'Actions', to: '/docs/concepts/actions' },
      { label: 'Guards', to: '/docs/concepts/guards' },
      { label: 'Delays', to: '/docs/concepts/delays' },
      { label: 'Context', to: '/docs/concepts/context' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'createConfig', to: '/docs/api/create-config' },
      { label: 'createChildS', to: '/docs/api/create-child' },
      { label: 'Interpreter', to: '/docs/api/interpreter' },
      { label: 'Types', to: '/docs/api/types' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { label: 'Traffic Light', to: '/docs/examples/traffic-light' },
      { label: 'Form Validation', to: '/docs/examples/form-validation' },
      { label: 'Async Operations', to: '/docs/examples/async-operations' },
    ],
  },
];

const NavLink: Component<{ label: string; to: string }> = props => {
  return (
    <_Link
      to={props.to}
      class='block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
      activeProps={{
        class:
          'block px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md',
      }}
    >
      {props.label}
    </_Link>
  );
};

export const Route = createFileRoute('/docs')({
  component: () => {
    return (
      <div class='flex min-h-screen'>
        {/* Sidebar */}
        <aside class='w-64 border-r border-gray-200 bg-white p-6 overflow-y-auto'>
          <div class='mb-6'>
            <h2 class='text-xl font-bold text-gray-900'>
              @bemedev/app-ts
            </h2>
            <p class='text-sm text-gray-600 mt-1'>State Machine Library</p>
          </div>

          <nav class='space-y-6'>
            <For each={navigation}>
              {section => (
                <div>
                  <h3 class='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                    {section.title}
                  </h3>
                  <div class='space-y-1'>
                    <For each={section.items}>
                      {item => <NavLink label={item.label} to={item.to} />}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </nav>
        </aside>

        {/* Main content */}
        <main class='flex-1 p-8 max-w-4xl'>
          <Outlet />
        </main>
      </div>
    );
  },
});
