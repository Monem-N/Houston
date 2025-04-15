import { StoryFn as Story, Meta } from '@storybook/react';
import PageHeader from './PageHeader';
import { Button } from '@mui/material';

export default {
  title: 'Common/PageHeader',
  component: PageHeader,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Page Title',
    },
    subtitle: {
      control: 'text',
    },
  },
} as Meta<typeof PageHeader>;

const Template: Story<typeof PageHeader> = (args: any) => <PageHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Page Title',
  subtitle: 'This is a subtitle for the page that provides additional context.',
};

export const WithAction = Template.bind({});
WithAction.args = {
  title: 'Page with Action',
  subtitle: 'This page header includes an action button.',
  action: (
    <Button variant="contained" color="primary">
      Action
    </Button>
  ),
};

export const WithBreadcrumbs = Template.bind({});
WithBreadcrumbs.args = {
  title: 'Page with Breadcrumbs',
  subtitle: 'This page header includes breadcrumb navigation.',
  breadcrumbs: [
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Current Page' },
  ],
};

export const FullExample = Template.bind({});
FullExample.args = {
  title: 'Attractions',
  subtitle: 'Discover the best attractions and things to do in Houston during your visit.',
  breadcrumbs: [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'Attractions' },
  ],
  action: (
    <Button variant="contained" color="primary">
      View Map
    </Button>
  ),
};
