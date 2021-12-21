import { act, renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line import/no-unresolved
import { createQueryClientWrapper } from 'test-utils';

import { useStaff } from '../hooks/useStaff';

test('filter staff', async () => {
  // the magic happens here
  const { result, waitFor } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the staff to populate
  await waitFor(() => result.current.staff.length === 4);

  // Set to filter only staff who give message
  act(() => result.current.setFilter('facial'));

  // wait for the staff list to display 3

  await waitFor(() => result.current.staff.length === 3);
});
