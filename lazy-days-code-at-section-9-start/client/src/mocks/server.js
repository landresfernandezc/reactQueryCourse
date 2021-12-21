import { setupServer } from 'msw/node';

import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
// eslint-disable-next-line no-undef
export const server = setupServer(...handlers);
