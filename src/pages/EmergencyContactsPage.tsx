import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Button,
  Card as MuiCard,
  CardContent,
  CardActions,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  LocalPolice as PoliceIcon,
  LocalFireDepartment as FireIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as WebsiteIcon,
  Info as InfoIcon,
  Flag as FlagIcon,
  Translate as TranslateIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  ContactPhone as ContactPhoneIcon,
  ContactEmergency as ContactEmergencyIcon,
  MedicalServices as MedicalIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { PageHeader, Section } from '../components/common';

// Define emergency contact types
interface EmergencyContact {
  name: string;
  phone: string;
  address?: string;
  website?: string;
  notes?: string;
  icon: React.ReactNode;
  category: 'emergency' | 'medical' | 'police' | 'consulate' | 'other';
}

// Define emergency contacts data
const emergencyContacts: EmergencyContact[] = [
  // Emergency Services
  {
    name: 'Emergency Services (Police, Fire, Ambulance)',
    phone: '911',
    notes: 'For life-threatening emergencies only',
    icon: <ContactEmergencyIcon color="error" />,
    category: 'emergency',
  },
  {
    name: 'Houston Police Department (Non-Emergency)',
    phone: '713-884-3131',
    address: '1200 Travis St, Houston, TX 77002',
    website: 'https://www.houstontx.gov/police/',
    icon: <PoliceIcon color="primary" />,
    category: 'police',
  },
  {
    name: 'Houston Fire Department (Non-Emergency)',
    phone: '713-884-3143',
    address: '1801 Smith St, Houston, TX 77002',
    website: 'https://www.houstontx.gov/fire/',
    icon: <FireIcon color="error" />,
    category: 'emergency',
  },
  {
    name: 'Poison Control Center',
    phone: '800-222-1222',
    website: 'https://www.poisoncontrol.org/',
    icon: <MedicalIcon color="error" />,
    category: 'emergency',
  },

  // Medical Facilities
  {
    name: 'Houston Methodist Hospital',
    phone: '713-790-3311',
    address: '6565 Fannin St, Houston, TX 77030',
    website: 'https://www.houstonmethodist.org/',
    notes: 'Level I trauma center',
    icon: <HospitalIcon color="primary" />,
    category: 'medical',
  },
  {
    name: 'Memorial Hermann Hospital',
    phone: '713-704-4000',
    address: '6411 Fannin St, Houston, TX 77030',
    website: 'https://www.memorialhermann.org/',
    notes: 'Level I trauma center',
    icon: <HospitalIcon color="primary" />,
    category: 'medical',
  },
  {
    name: 'Ben Taub Hospital',
    phone: '713-873-2000',
    address: '1504 Taub Loop, Houston, TX 77030',
    website: 'https://www.harrishealth.org/locations-hh/Pages/ben-taub.aspx',
    notes: 'Level I trauma center',
    icon: <HospitalIcon color="primary" />,
    category: 'medical',
  },
  {
    name: "Texas Children's Hospital",
    phone: '832-824-1000',
    address: '6621 Fannin St, Houston, TX 77030',
    website: 'https://www.texaschildrens.org/',
    notes: 'Pediatric hospital',
    icon: <HospitalIcon color="primary" />,
    category: 'medical',
  },

  // Consulates
  {
    name: 'U.S. Department of State (Overseas Citizens Services)',
    phone: '1-888-407-4747 (from US) or +1-202-501-4444 (from overseas)',
    website: 'https://travel.state.gov',
    icon: <FlagIcon />,
    category: 'consulate',
  },
  {
    name: 'French Consulate in Houston',
    phone: '713-528-3285',
    address: '777 Post Oak Blvd, Suite 600, Houston, TX 77056',
    website: 'https://houston.consulfrance.org/',
    icon: <FlagIcon />,
    category: 'consulate',
  },
  {
    name: 'Canadian Consulate in Dallas',
    phone: '214-922-9806',
    address: '500 N Akard St #2900, Dallas, TX 75201',
    website: 'https://www.international.gc.ca/country-pays/us-eu/dallas.aspx?lang=eng',
    notes: 'Serves Texas residents',
    icon: <FlagIcon />,
    category: 'consulate',
  },
  {
    name: 'British Consulate in Houston',
    phone: '713-659-6270',
    address: '1301 Fannin St #2400, Houston, TX 77002',
    website: 'https://www.gov.uk/world/organisations/british-consulate-general-houston',
    icon: <FlagIcon />,
    category: 'consulate',
  },

  // Other Important Contacts
  {
    name: 'Houston Airport System',
    phone: '281-230-3000',
    website: 'https://www.fly2houston.com/',
    icon: <InfoIcon />,
    category: 'other',
  },
  {
    name: 'METRO Transit Information',
    phone: '713-635-4000',
    website: 'https://www.ridemetro.org/',
    icon: <InfoIcon />,
    category: 'other',
  },
  {
    name: 'Houston Visitor Center',
    phone: '713-437-5200',
    address: '1300 Avenida de las Americas, Houston, TX 77010',
    website: 'https://www.visithoustontexas.com/',
    icon: <InfoIcon />,
    category: 'other',
  },
  {
    name: 'FIRST Championship Help Desk',
    phone: 'TBD for 2025 event',
    notes: 'Located at the George R. Brown Convention Center during the event',
    icon: <InfoIcon />,
    category: 'other',
  },
];

// Define emergency phrases in multiple languages
const emergencyPhrases = [
  {
    language: 'English',
    phrases: [
      { phrase: 'Help!', translation: 'Help!' },
      { phrase: 'I need a doctor.', translation: 'I need a doctor.' },
      { phrase: 'Call an ambulance.', translation: 'Call an ambulance.' },
      { phrase: 'Call the police.', translation: 'Call the police.' },
      { phrase: "There's been an accident.", translation: "There's been an accident." },
      { phrase: "I'm lost.", translation: "I'm lost." },
      { phrase: 'I need help.', translation: 'I need help.' },
      { phrase: "It's an emergency.", translation: "It's an emergency." },
    ],
  },
  {
    language: 'Spanish',
    phrases: [
      { phrase: 'Help!', translation: '¡Ayuda!' },
      { phrase: 'I need a doctor.', translation: 'Necesito un médico.' },
      { phrase: 'Call an ambulance.', translation: 'Llame a una ambulancia.' },
      { phrase: 'Call the police.', translation: 'Llame a la policía.' },
      { phrase: "There's been an accident.", translation: 'Ha habido un accidente.' },
      { phrase: "I'm lost.", translation: 'Estoy perdido/a.' },
      { phrase: 'I need help.', translation: 'Necesito ayuda.' },
      { phrase: "It's an emergency.", translation: 'Es una emergencia.' },
    ],
  },
  {
    language: 'French',
    phrases: [
      { phrase: 'Help!', translation: 'Au secours !' },
      { phrase: 'I need a doctor.', translation: "J'ai besoin d'un médecin." },
      { phrase: 'Call an ambulance.', translation: 'Appelez une ambulance.' },
      { phrase: 'Call the police.', translation: 'Appelez la police.' },
      { phrase: "There's been an accident.", translation: 'Il y a eu un accident.' },
      { phrase: "I'm lost.", translation: 'Je suis perdu(e).' },
      { phrase: 'I need help.', translation: "J'ai besoin d'aide." },
      { phrase: "It's an emergency.", translation: "C'est une urgence." },
    ],
  },
];

// Define safety tips
const safetyTips = [
  {
    title: 'General Safety',
    tips: [
      'Keep your personal belongings secure and within sight at all times',
      'Be aware of your surroundings, especially in crowded areas',
      'Avoid displaying large amounts of cash or expensive items',
      'Keep a copy of your passport and important documents separate from the originals',
      'Program emergency numbers into your phone',
      'Share your itinerary with someone you trust',
    ],
  },
  {
    title: 'Transportation Safety',
    tips: [
      'Use licensed taxis or rideshare services',
      'Avoid walking alone at night in unfamiliar areas',
      'Keep hotel address and phone number with you',
      'If using public transportation, be aware of your stop and surroundings',
      'When driving, keep doors locked and windows up in unfamiliar areas',
      'Park in well-lit, designated areas',
    ],
  },
  {
    title: 'Health Safety',
    tips: [
      'Carry any necessary medications with you',
      'Know the location of the nearest hospital or urgent care facility',
      'Stay hydrated, especially during hot weather',
      'Wash hands frequently to prevent illness',
      'Wear sunscreen and appropriate clothing for the weather',
      'Have a basic first aid kit available',
    ],
  },
  {
    title: 'Event Safety',
    tips: [
      'Familiarize yourself with emergency exits at the FIRST Championship venue',
      'Establish a meeting point in case your group gets separated',
      'Follow all safety instructions from event staff',
      'Report any suspicious activity to security personnel',
      'Keep your event credentials visible when required',
      'Stay with your group, especially if you are a student',
    ],
  },
];

const EmergencyContactsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  // Filter contacts based on search term
  const filteredContacts = emergencyContacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.address && contact.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.notes && contact.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get phrases for selected language
  const selectedLanguagePhrases =
    emergencyPhrases.find(lang => lang.language === selectedLanguage)?.phrases || [];

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Emergency Contacts"
        subtitle="Important contacts and safety information for your visit to Houston"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Annexes', path: '#' },
          { label: 'Emergency Contacts' },
        ]}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="emergency tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<ContactPhoneIcon />}
            label="Emergency Contacts"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab icon={<SecurityIcon />} label="Safety Tips" id="tab-1" aria-controls="tabpanel-1" />
          <Tab
            icon={<TranslateIcon />}
            label="Emergency Phrases"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* Emergency Contacts Tab */}
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section
            title="Emergency Contacts"
            titleIcon={<ContactPhoneIcon color="primary" />}
            divider
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>In case of emergency</AlertTitle>
              For any life-threatening emergency in the United States, dial <strong>911</strong> to
              reach police, fire, or ambulance services.
            </Alert>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={clearSearch} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {filteredContacts.map((contact, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <MuiCard
                    elevation={2}
                    sx={{
                      height: '100%',
                      borderLeft: 4,
                      borderColor:
                        contact.category === 'emergency'
                          ? 'error.main'
                          : contact.category === 'medical'
                            ? 'info.main'
                            : contact.category === 'police'
                              ? 'primary.main'
                              : contact.category === 'consulate'
                                ? 'success.main'
                                : 'grey.500',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 1 }}>{contact.icon}</Box>
                        <Typography variant="h6">{contact.name}</Typography>
                      </Box>

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Phone"
                            secondary={
                              <Link href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}>
                                {contact.phone}
                              </Link>
                            }
                          />
                        </ListItem>

                        {contact.address && (
                          <ListItem>
                            <ListItemIcon>
                              <LocationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Address" secondary={contact.address} />
                          </ListItem>
                        )}

                        {contact.notes && (
                          <ListItem>
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notes" secondary={contact.notes} />
                          </ListItem>
                        )}
                      </List>
                    </CardContent>

                    {contact.website && (
                      <CardActions>
                        <Button
                          startIcon={<WebsiteIcon />}
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </Button>
                      </CardActions>
                    )}
                  </MuiCard>
                </Grid>
              ))}

              {filteredContacts.length === 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                      No contacts found matching "{searchTerm}". Please try a different search term.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Safety Tips Tab */}
      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <Section title="Safety Tips" titleIcon={<SecurityIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Here are some important safety tips to keep in mind during your visit to Houston.
              These tips will help ensure a safe and enjoyable experience.
            </Typography>

            <Grid container spacing={3}>
              {safetyTips.map((category, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <MuiCard elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {category.title}
                      </Typography>
                      <List>
                        {category.tips.map((tip, tipIndex) => (
                          <ListItem key={tipIndex}>
                            <ListItemIcon>
                              <InfoIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={tip} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </MuiCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Alert severity="info">
                <AlertTitle>Stay Informed</AlertTitle>
                <Typography variant="body2">During your stay, it's a good idea to:</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Check local weather forecasts regularly" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sign up for emergency alerts from the City of Houston" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Follow official FIRST Championship social media accounts for event updates" />
                  </ListItem>
                </List>
              </Alert>
            </Box>
          </Section>
        )}
      </Box>

      {/* Emergency Phrases Tab */}
      <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
        {activeTab === 2 && (
          <Section title="Emergency Phrases" titleIcon={<TranslateIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Below are some useful emergency phrases in different languages. These can help you
              communicate in case of an emergency when traveling in Houston.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Select Language:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {emergencyPhrases.map(lang => (
                  <Button
                    key={lang.language}
                    variant={selectedLanguage === lang.language ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange(lang.language)}
                    startIcon={<TranslateIcon />}
                    sx={{ mb: 1 }}
                  >
                    {lang.language}
                  </Button>
                ))}
              </Box>
            </Box>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selectedLanguage} Emergency Phrases
              </Typography>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <thead>
                    <tr>
                      <th>English</th>
                      <th>{selectedLanguage === 'English' ? 'Pronunciation' : selectedLanguage}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLanguagePhrases.map((item, index) => (
                      <tr key={index}>
                        <td>{item.phrase}</td>
                        <td>{item.translation}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </Paper>

            <Box sx={{ mt: 4 }}>
              <Alert severity="info">
                <AlertTitle>Translation Apps</AlertTitle>
                Consider downloading a translation app like Google Translate or Microsoft Translator
                before your trip. These apps can help with real-time translation in emergency
                situations.
              </Alert>
            </Box>
          </Section>
        )}
      </Box>
    </Container>
  );
};

// Define the TableContainer and Table components
const TableContainer: React.FC<{
  component: React.ElementType;
  variant?: string;
  children: React.ReactNode;
}> = ({ component: Component, variant, children }) => (
  <Component sx={{ mb: 3, overflow: 'auto' }} variant={variant}>
    {children}
  </Component>
);

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>
);

export default EmergencyContactsPage;
