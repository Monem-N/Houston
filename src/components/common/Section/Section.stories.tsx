import { StoryFn, Meta } from '@storybook/react';
import Section from './Section';
import { Typography, Grid, Paper } from '@mui/material';
import { InfoOutlined, AttractionsOutlined } from '@mui/icons-material';

export default {
  title: 'Common/Section',
  component: Section,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Section Title',
    },
    subtitle: {
      control: 'text',
    },
    divider: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta<typeof Section>;

const Template: StoryFn<typeof Section> = args => <Section {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Section Title',
  subtitle: 'This is a subtitle for the section that provides additional context.',
  children: (
    <Typography variant="body1">
      This is the content of the section. It can contain any React components or HTML elements.
    </Typography>
  ),
};

export const WithDivider = Template.bind({});
WithDivider.args = {
  title: 'Section with Divider',
  subtitle: 'This section includes a divider below the title and subtitle.',
  divider: true,
  children: (
    <Typography variant="body1">
      This is the content of the section. The divider helps to visually separate the title from the
      content.
    </Typography>
  ),
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'Section with Icon',
  subtitle: 'This section includes an icon next to the title.',
  titleIcon: <InfoOutlined color="primary" />,
  children: (
    <Typography variant="body1">
      This is the content of the section. The icon helps to visually identify the purpose of the
      section.
    </Typography>
  ),
};

export const ComplexContent = Template.bind({});
ComplexContent.args = {
  title: 'Attractions',
  subtitle: 'Popular attractions in Houston',
  titleIcon: <AttractionsOutlined color="primary" />,
  divider: true,
  children: (
    <Grid container spacing={3}>
      {[1, 2, 3].map(item => (
        <Grid item xs={12} sm={4} key={item}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Attraction {item}</Typography>
            <Typography variant="body2">
              This is a description of attraction {item}. It includes information about what
              visitors can expect.
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  ),
};
