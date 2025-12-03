/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import { HydrationScript } from 'solid-js/web';
import seo from '~seo';
import appCss from '../../tailwind.css?url';

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: '@bemedev/app-ts - TypeScript State Machine Library',
        description: `Type-safe state machines for modern TypeScript applications. Build predictable, maintainable apps with finite state machines.`,
      }),
    ],
  }),

  component: () => {
    return (
      <html>
        <head>
          <HydrationScript />
        </head>
        <body>
          <HeadContent />
          <main class='w-full min-h-screen bg-white'>
            {/* <HeadLinks /> */}
            <Outlet />
          </main>
          <TanStackRouterDevtools />
          <Scripts />
        </body>
      </html>
    );
  },
});
