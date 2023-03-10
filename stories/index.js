import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import 'styles/index.scss';

import Button from 'components/Button';
import DayList from 'components/DayList';
import DayListItem from 'components/DayListItem';
import InterviewerList from 'components/InterviewerList';
import InterviewerListItem from 'components/InterviewerListItem';
import { days, interviewer, interviewers } from './storyData.js';

import Appointment from 'components/Appointment';
import Confirm from 'components/Appointment/Confirm';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Status from 'components/Appointment/Status';

storiesOf('Button', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
  })
  .add('Base', () => <Button>Base</Button>)
  .add('Confirm', () => <Button confirm>Confirm</Button>)
  .add('Danger', () => <Button danger>Cancel</Button>)
  .add('Clickable', () => (
    <Button onClick={action('button-clicked')}>Clickable</Button>
  ))
  .add('Disabled', () => (
    <Button disabled onClick={action('button-clicked')}>
      Disabled
    </Button>
  ));

storiesOf('DayListItem', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
  })
  .add('Unselected', () => <DayListItem name="Monday" spots={5} />)
  .add('Selected', () => <DayListItem name="Monday" spots={5} selected />)
  .add('Full', () => <DayListItem name="Monday" spots={0} />)
  .add('Clickable', () => (
    <DayListItem name="Tuesday" setDay={action('setDay')} spots={5} />
  ));

storiesOf('DayList', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
  })
  .add('Monday', () => (
    <DayList days={days} value={'Monday'} onChange={action('setDay')} />
  ))
  .add('Tuesday', () => (
    <DayList days={days} value={'Tuesday'} onChange={action('setDay')} />
  ))
  .add('Wednesday', () => (
    <DayList days={days} value={'Wednesday'} onChange={action('setDay')} />
  ));

storiesOf('InterviewerListItem', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
  })
  .add('Unselected', () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add('Selected', () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add('Clickable', () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action('setInterviewer')(interviewer.id)}
    />
  ));

storiesOf('InterviewerList', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
  })
  .add('Initial', () => <InterviewerList interviewers={interviewers} />)
  .add('Selected', () => (
    <InterviewerList interviewers={interviewers} value={3} />
  ))
  .add('Clickable', () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action('setInterviewer')}
    />
  ));

storiesOf('Appointment', module)
  .addParameters({
    backgrounds: [{ name: 'white', value: '#fff', default: true }],
  })
  .add('Appointment', () => <Appointment />)
  .add('Appointment w/ Time', () => <Appointment time="12pm" />)
  .add('Header', () => <Header time="12pm" />)
  .add('Empty', () => <Empty onAdd={action('onAdd')} />)
  .add('Show', () => (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action('onEdit')}
      onDelete={action('onDelete')}
    />
  ))
  .add('Confirm', () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action('onConfirm')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Status', () => <Status message="Deleting" />)
  .add('Error', () => (
    <Error
      message="Could not delete appointment."
      onClose={action('onClose')}
    />
  ))
  .add('Form Edit', () => (
    <Form
      student="Justin Bennett"
      interviewer={2}
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Form Create', () => (
    <Form
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Appointment Empty', () => (
    <>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </>
  ))
  .add('Appointment Booked', () => (
    <>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: 'Lydia Miller-Jones', interviewer }}
      />
      <Appointment time="5pm" />
    </>
  ));
