import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import 'styles/index.scss';

import Button from 'components/Button';
import DayListItem from 'components/DayListItem';

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
  // To define our stories, we call add() once for each of our test states to generate a story.
  .add('Unselected', () => <DayListItem name="Monday" spots={5} />)
  .add('Selected', () => <DayListItem name="Monday" spots={5} selected />)
  .add('Full', () => <DayListItem name="Monday" spots={0} />)
  .add('Clickable', () => (
    <DayListItem name="Tuesday" setDay={action('setDay')} spots={5} />
    // action() allows us to create a callback that appears in the actions panel when clicked.
  ));
