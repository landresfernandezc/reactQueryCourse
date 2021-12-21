import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper, createWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';

test('filter appointments by availability', async () => {
  // test goes here
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });
  // wait for the apporintementes to populate
  await waitFor(() => result.current.appointments !== {});
  const filteredAppointmentsLenght = Object.keys(result.current.appointments)
    .length;
  // set show all
  act(() => result.current.setShowAll(true));
  // wait for the appointment
  await waitFor(
    () =>
      Object.keys(result.current.appointments).length >
      filteredAppointmentsLenght,
  );
});
