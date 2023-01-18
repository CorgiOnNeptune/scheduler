import React from 'react';
import axios from 'axios';

import {
  cleanup,
  render,
  fireEvent,
  prettyDOM,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  within,
  queryByText,
  queryByAltText,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, /add/i));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });

    // Click the first interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    // Check that saving text is displayed
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // Check that the confirmation message is shown.
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // Wait until the element with the 'Add' button is displayed
    await waitForElement(() => getByAltText(appointment, /add/i));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, edits an interview and keep the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    // Change student name value to 'Lydia Miller-Jones'.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });

    // Click the second interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));

    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // Wait for edited appointment with new student name to appear
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, /add/i));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // Set the axios request to reject when pressing save
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, 'Save'));

    // Check that it tries saving before the mock axios errors
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, 'Could not save appointment.')
    );

    // Check that the close button goes back to the form input screen
    fireEvent.click(getByAltText(appointment, /close/i));
    expect(
      getByPlaceholderText(appointment, 'Enter Student Name')
    ).toBeInTheDocument();

    // Check that spots has not been altered by failed save.
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // Check that the confirmation message is shown.
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();

    // Set the axios request to reject when deleting
    axios.delete.mockRejectedValueOnce();
    fireEvent.click(queryByText(appointment, 'Confirm'));

    // Check that it tries deleting before the mock axios errors
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, 'Could not cancel appointment.')
    );

    // Check that the close button goes back to the main screen
    fireEvent.click(getByAltText(appointment, /close/i));
    expect(getByText(container, 'Archie Cohen')).toBeInTheDocument();

    // Check that spots has not been altered by failed delete.
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('returns out of save form on press of the cancel button', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, /add/i));

    fireEvent.click(getByText(appointment, /cancel/i));

    // Check appointment is still empty
    expect(getByAltText(appointment, /add/i)).toBeInTheDocument();

    // Check spots was unaltered
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
});
