import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';

import '../global.scss';

// UI
import AddPage from '../components/UI/AddPage';
import Proportional from '../components/UI/MapviewDot'

storiesOf('UI', module).addDecorator(StoryRouter()).addDecorator(withKnobs)
  .add('AddPage', () => (
    <AddPage
    title={ text('Title',"Untitled")}
    API={ text('API',"TTO7CfG")}
    slug={ text('Slug',"https://libds.nus.edu.sg/arfandi_project/")}
    />
  ) )
  .add('Proportional', () => (
    <Proportional
    title={ text('Title',"Untitled")}
    API={ text('API',"TTO7CfG")}
    slug={ text('Slug',"https://libds.nus.edu.sg/arfandi_project/")}
    />
  ) )