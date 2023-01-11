import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import 'styles/index.scss';

import Button from 'components/Button';

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
