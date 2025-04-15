import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  AlertTitle,
  Paper,
  Link,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Security as SecurityIcon,
  LocalPolice as PoliceIcon,
  LocalHospital as HospitalIcon,
  Translate as TranslateIcon,
  AttachMoney as MoneyIcon,
  ElectricBolt as PowerIcon,
  WifiPassword as WifiIcon,
  Luggage as LuggageIcon,
  Checklist as ChecklistIcon,
  HealthAndSafety as HealthIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  DirectionsWalk as WalkingIcon,
  DirectionsCar as DrivingIcon,
  Vaccines as VaccineIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader, Section } from '../components/common';

// Define interfaces for our data
interface EmergencyContact {
  name: string;
  phone: string;
  address?: string;
  description?: string;
  icon: React.ReactNode;
}

interface SafetyTip {
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface ChecklistItem {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

// Sample data for emergency contacts
const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Emergency Services',
    phone: '911',
    description: 'For life-threatening emergencies, fire, or crime in progress',
    icon: <PoliceIcon color="error" />,
  },
  {
    name: 'Houston Police (Non-Emergency)',
    phone: '(713) 884-3131',
    address: '1200 Travis St, Houston, TX 77002',
    description: 'For non-emergency police assistance',
    icon: <PoliceIcon color="primary" />,
  },
  {
    name: 'Houston Fire Department (Non-Emergency)',
    phone: '(713) 247-8574',
    description: 'For non-emergency fire department inquiries',
    icon: <HospitalIcon color="error" />,
  },
  {
    name: 'Houston Methodist Hospital',
    phone: '(713) 790-3311',
    address: '6565 Fannin St, Houston, TX 77030',
    description: 'Major hospital near the convention center',
    icon: <HospitalIcon color="primary" />,
  },
  {
    name: 'FIRST Championship Security Office',
    phone: '(713) 853-8000',
    address: 'George R. Brown Convention Center',
    description: 'On-site security for the FIRST Championship event',
    icon: <SecurityIcon color="primary" />,
  },
  {
    name: 'U.S. Consulate General (for foreign visitors)',
    phone: '(713) 520-5570',
    address: '1330 Post Oak Blvd, Houston, TX 77056',
    description: 'For foreign visitors requiring consular assistance',
    icon: <TranslateIcon color="primary" />,
  },
];

// Sample data for safety tips
const safetyTips: SafetyTip[] = [
  {
    title: 'Stay in groups',
    description:
      'Always travel in groups, especially at night. Avoid walking alone in unfamiliar areas.',
    icon: <WalkingIcon />,
    severity: 'warning',
  },
  {
    title: 'Keep valuables secure',
    description:
      'Keep wallets, phones, and other valuables secure and out of sight. Consider using a money belt or hidden pouch.',
    icon: <MoneyIcon />,
    severity: 'warning',
  },
  {
    title: 'Be aware of your surroundings',
    description:
      'Stay alert and be aware of your surroundings at all times. Avoid distractions like looking at your phone while walking.',
    icon: <SecurityIcon />,
    severity: 'warning',
  },
  {
    title: 'Use official transportation',
    description:
      'Use official taxis, ride-sharing services, or public transportation. Avoid unmarked vehicles.',
    icon: <DrivingIcon />,
    severity: 'info',
  },
  {
    title: 'Keep emergency contacts handy',
    description: 'Save emergency contact numbers in your phone and keep a printed copy with you.',
    icon: <PhoneIcon />,
    severity: 'info',
  },
  {
    title: 'Stay hydrated',
    description:
      "Houston can be hot and humid. Drink plenty of water, especially if you're outside.",
    icon: <HealthIcon />,
    severity: 'info',
  },
  {
    title: 'COVID-19 precautions',
    description: 'Follow current COVID-19 guidelines. Consider wearing masks in crowded indoor spaces.',
    icon: <VaccineIcon />,
    severity: 'info',
  },
];

// Sample data for checklists
const checklists: ChecklistItem[] = [
  {
    title: 'Before Departure',
    icon: <ChecklistIcon />,
    items: [
      "Check passport/ID validity (ensure it's valid for at least 6 months beyond your stay)",
      'Make copies of important documents (passport, ID, insurance)',
      'Arrange travel insurance',
      'Check weather forecast for Houston',
      'Notify your bank of travel plans to avoid card blocks',
      'Download offline maps of Houston',
      'Pack appropriate clothing for Houston weather',
      'Prepare any required medications with prescriptions',
    ],
  },
  {
    title: 'Packing Essentials',
    icon: <LuggageIcon />,
    items: [
      'Travel documents (passport, ID, tickets, hotel reservations)',
      'Medications and prescriptions',
      'Power adapters (US uses 110V with Type A/B plugs)',
      'Phone and charger',
      'Comfortable walking shoes',
      'Light jacket (convention centers can be cold)',
      'Reusable water bottle',
      'Hand sanitizer and masks',
      'Small backpack for daily use',
    ],
  },
  {
    title: 'Technology Preparation',
    icon: <WifiIcon />,
    items: [
      'Check your mobile plan for US coverage or get a local SIM card',
      'Download useful apps (maps, translation, ride-sharing, event app)',
      'Backup your devices before traveling',
      'Set up a VPN if needed for secure connections',
      'Download entertainment for the flight',
      'Ensure you have cloud backup enabled for photos',
      'Bring portable charger/power bank',
    ],
  },
  {
    title: 'Upon Arrival',
    icon: <SecurityIcon />,
    items: [
      'Get local currency (USD) or confirm your cards work',
      'Purchase a local SIM card if needed',
      'Locate the nearest pharmacy and grocery store to your accommodation',
      'Familiarize yourself with public transportation options',
      'Locate the nearest hospital or medical facility',
      "Register your stay with your country's embassy if applicable",
      'Confirm FIRST Championship registration details',
    ],
  },
];

// Sample data for logistics information
const logisticsInfo = [
  {
    title: 'Electricity',
    icon: <PowerIcon />,
    content:
      'The United States uses 120V, 60Hz electricity with Type A (two flat parallel pins) and Type B (two flat parallel pins and a grounding pin) outlets. Visitors from countries with different standards will need adapters and possibly voltage converters.',
  },
  {
    title: 'Internet & Connectivity',
    icon: <WifiIcon />,
    content:
      'Free Wi-Fi is available at most hotels, restaurants, and the convention center. Major cellular providers in the US include AT&T, Verizon, and T-Mobile. International visitors should check with their providers about roaming charges or consider purchasing a local SIM card upon arrival.',
  },
  {
    title: 'Currency & Payments',
    icon: <MoneyIcon />,
    content:
      'The US dollar (USD) is the local currency. Credit cards are widely accepted, with Visa and Mastercard having the highest acceptance rate. ATMs are readily available throughout Houston. Notify your bank of your travel plans to avoid card blocks. Tipping is customary in the US (15-20% at restaurants).',
  },
  {
    title: 'Language',
    icon: <TranslateIcon />,
    content:
      'English is the primary language spoken in Houston. Spanish is also widely spoken. Major tourist areas and the convention center will have staff who can assist international visitors. Consider downloading a translation app if English is not your first language.',
  },
  {
    title: 'Health & Medical',
    icon: <HealthIcon />,
    content:
      'Healthcare in the US can be expensive. Ensure you have adequate travel insurance that covers medical expenses. Pharmacies like CVS and Walgreens are widely available for over-the-counter medications. For emergencies, dial 911. The nearest major hospital to the convention center is Houston Methodist Hospital.',
  },
];

const SafetyLogisticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Safety & Logistics"
        subtitle="Important information to ensure a safe and smooth experience during your visit to Houston."
        data-testid="page-title"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Safety & Logistics' }]}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="safety and logistics tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SecurityIcon />} label="Safety Tips" id="tab-0" aria-controls="tabpanel-0" />
          <Tab
            icon={<PhoneIcon />}
            label="Emergency Contacts"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={<ChecklistIcon />}
            label="Travel Checklists"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<LuggageIcon />}
            label="Logistics Info"
            id="tab-3"
            aria-controls="tabpanel-3"
          />
        </Tabs>
      </Box>

      {/* Safety Tips Tab */}
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section
            title="Safety Tips for Houston"
            titleIcon={<SecurityIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              Houston is generally a safe city for visitors, but like any major urban area, it's
              important to take precautions. Here are some safety tips to help ensure a safe and
              enjoyable visit.
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <AlertTitle>Important Safety Notice</AlertTitle>
              In case of emergency, dial <strong>911</strong> for police, fire, or medical
              emergencies. Save the FIRST Championship security number in your phone:{' '}
              <strong>(713) 853-8000</strong>.
            </Alert>

            <Grid container spacing={3}>
              {safetyTips.map((tip, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Alert severity={tip.severity} icon={tip.icon} sx={{ height: '100%' }}>
                    <AlertTitle>{tip.title}</AlertTitle>
                    {tip.description}
                  </Alert>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Area Safety Information
              </Typography>
              <Typography variant="body1" paragraph>
                The George R. Brown Convention Center and surrounding areas are generally safe and
                well-patrolled. However, as with any urban area, be cautious when walking at night
                and stay in well-lit, populated areas.
              </Typography>
              <Typography variant="body1">
                For more detailed safety information, visit the{' '}
                <Link
                  href="https://www.houstontx.gov/police/pdfs/brochures/english/Tourist_Safety_brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Houston Police Department's Tourist Safety Guide
                </Link>
                .
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/annexes/emergency-contacts"
                startIcon={<PhoneIcon />}
              >
                View Detailed Emergency Contacts
              </Button>
            </Box>
          </Section>
        )}
      </Box>

      {/* Emergency Contacts Tab */}
      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <Section title="Emergency Contacts" titleIcon={<PhoneIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Keep these important emergency contacts handy during your stay in Houston. We
              recommend saving these numbers in your phone and keeping a printed copy with you.
            </Typography>
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Emergency Number</AlertTitle>
              For all emergencies (police, fire, medical), dial <strong>911</strong>.
            </Alert>
            <Grid container spacing={3}>
              {emergencyContacts.map((contact, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ mr: 2 }}>{contact.icon}</Box>
                      <Typography variant="h6">{contact.name}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {contact.phone}
                    </Typography>
                    {contact.address && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {contact.address}
                      </Typography>
                    )}
                    {contact.description && (
                      <Typography variant="body2">{contact.description}</Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Travel Checklists Tab */}
      <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
        {activeTab === 2 && (
          <Section title="Travel Checklists" titleIcon={<ChecklistIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Use these checklists to prepare for your trip to Houston and the FIRST Championship.
              Being well-prepared will help ensure a smooth and enjoyable experience.
            </Typography>

            {checklists.map((checklist, index) => (
              <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`checklist-${index}-content`}
                  id={`checklist-${index}-header`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}>{checklist.icon}</Box>
                    <Typography variant="h6">{checklist.title}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {checklist.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex}>
                        <ListItemIcon>
                          <ChecklistIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}

            <Box sx={{ mt: 3 }}>
              <Alert severity="info">
                <AlertTitle>Printable Checklist</AlertTitle>
                You can download a printable version of these checklists to help with your trip
                planning.
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ChecklistIcon />}
                    href="/assets/documents/houston-travel-checklist.pdf"
                    target="_blank"
                  >
                    Download Printable Checklist
                  </Button>
                </Box>
              </Alert>
            </Box>
          </Section>
        )}
      </Box>

      {/* Logistics Info Tab */}
      <Box role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3" aria-labelledby="tab-3">
        {activeTab === 3 && (
          <Section
            title="Logistics Information"
            titleIcon={<LuggageIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              Important logistical information to help you navigate your stay in Houston. This
              information is particularly useful for international visitors.
            </Typography>

            {logisticsInfo.map((info, index) => (
              <Paper key={index} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2 }}>{info.icon}</Box>
                  <Typography variant="h6">{info.title}</Typography>
                </Box>
                <Typography variant="body1">{info.content}</Typography>
              </Paper>
            ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Transportation Information
              </Typography>
              <Typography variant="body1" paragraph>
                Houston has several transportation options, including:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DrivingIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ride-sharing services (Uber, Lyft)"
                    secondary="Widely available throughout Houston"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DrivingIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Taxis"
                    secondary="Available at designated taxi stands at airports, hotels, and the convention center"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DrivingIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Public Transportation"
                    secondary="Houston's METRORail and bus system connect major areas of the city"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WalkingIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Walking"
                    secondary="Downtown Houston is relatively walkable, with many attractions within walking distance of the convention center"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/annexes/transport-maps"
                  startIcon={<DrivingIcon />}
                >
                  View Detailed Transportation Information
                </Button>
              </Box>
            </Box>
          </Section>
        )}
      </Box>
    </Container>
  );
};

export default SafetyLogisticsPage;
