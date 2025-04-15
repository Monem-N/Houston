import { StoryFn, Meta } from '@storybook/react';
import Card from './Card';
import { Button } from '@mui/material';

export default {
  title: 'Common/Card',
  component: Card,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Card Title',
    },
    subtitle: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
    imageAlt: {
      control: 'text',
    },
    imageHeight: {
      control: { type: 'number', min: 100, max: 500, step: 10 },
      defaultValue: 200,
    },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = args => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  description:
    'This is a description of the card content. It can be a few sentences long to describe what this card is about.',
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Card with Image',
  subtitle: 'Card Subtitle',
  description: 'This card includes an image at the top.',
  image: 'https://source.unsplash.com/random/800x600/?houston',
  imageAlt: 'Random image of Houston',
};

export const WithAction = Template.bind({});
WithAction.args = {
  title: 'Card with Action',
  subtitle: 'Card Subtitle',
  description: 'This card includes an action button at the bottom.',
  image: 'https://source.unsplash.com/random/800x600/?houston',
  imageAlt: 'Random image of Houston',
  action: (
    <Button variant="contained" color="primary">
      Learn More
    </Button>
  ),
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  title: 'Card with Children',
  subtitle: 'Card Subtitle',
  children: (
    <>
      <p>This is custom content passed as children to the Card component.</p>
      <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
        Custom Button
      </Button>
    </>
  ),
};

export const FullExample = Template.bind({});
FullExample.args = {
  title: 'Space Center Houston',
  subtitle: 'Popular Attraction',
  description:
    'The official visitor center of NASA Johnson Space Center in Houston. It features more than 400 space artifacts, exhibits, and experiences.',
  image: 'https://source.unsplash.com/random/800x600/?space,nasa',
  imageAlt: 'Space Center Houston',
  action: (
    <Button variant="contained" color="primary">
      Buy Tickets
    </Button>
  ),
};
