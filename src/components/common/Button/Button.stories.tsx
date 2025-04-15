// React is used implicitly by JSX
// import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'text'],
      },
      defaultValue: 'contained',
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      },
      defaultValue: 'primary',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    children: {
      control: 'text',
      defaultValue: 'Button',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  variant: 'contained',
  color: 'primary',
  loading: true,
  children: 'Loading Button',
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  children: 'Secondary Button',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  color: 'primary',
  children: 'Outlined Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  color: 'primary',
  children: 'Text Button',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  children: 'Small Button',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'contained',
  color: 'primary',
  size: 'large',
  children: 'Large Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'contained',
  color: 'primary',
  disabled: true,
  children: 'Disabled Button',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  variant: 'contained',
  color: 'primary',
  fullWidth: true,
  children: 'Full Width Button',
};
