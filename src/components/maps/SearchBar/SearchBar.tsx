import React, { useState, useEffect } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  Chip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Location } from '../types';

interface SearchBarProps {
  locations: Location[];
  categories: string[];
  activeCategories: { [key: string]: boolean };
  onSearch: (query: string, filteredLocations: Location[]) => void;
  onCategoryToggle: (category: string) => void;
  getMarkerIcon?: (category: string) => React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  categories,
  activeCategories,
  onSearch,
  onCategoryToggle,
  getMarkerIcon,
}) => {
  const { isMobile } = useDeviceDetect();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  // Filter locations based on search query and active categories
  useEffect(() => {
    const filtered = locations.filter(location => {
      // Filter by active categories
      if (!activeCategories[location.category]) {
        return false;
      }

      // If no search query, include all locations with active categories
      if (!searchQuery.trim()) {
        return true;
      }

      // Search in name, description, and address
      const searchLower = searchQuery.toLowerCase();
      return (
        location.name.toLowerCase().includes(searchLower) ||
        (location.description && location.description.toLowerCase().includes(searchLower)) ||
        (location.address && location.address.toLowerCase().includes(searchLower))
      );
    });

    setFilteredLocations(filtered);
    onSearch(searchQuery, filtered);
  }, [searchQuery, locations, activeCategories, onSearch]);

  // Handle filter button click
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle filter popover close
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search locations..."
          inputProps={{ 'aria-label': 'search locations' }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <IconButton sx={{ p: '10px' }} aria-label="clear" onClick={handleClearSearch}>
            <ClearIcon />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Filter by category">
          <IconButton
            component="button"
            color="primary"
            sx={{ p: '10px' }}
            aria-label="filter"
            onClick={handleFilterClick}
            aria-describedby={id}
          >
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Display search results count */}
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {filteredLocations.length} {filteredLocations.length === 1 ? 'result' : 'results'} found
        </Typography>

        {/* Display active filters as chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {categories
            .filter(category => activeCategories[category])
            .slice(0, isMobile ? 2 : 3)
            .map(category => (
              <Chip
                key={category}
                label={category}
                size="small"
                onDelete={() => onCategoryToggle(category)}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          {categories.filter(category => activeCategories[category]).length > (isMobile ? 2 : 3) && (
            <Chip
              component="div"
              label={`+${categories.filter(category => activeCategories[category]).length - (isMobile ? 2 : 3)}`}
              size="small"
              onClick={handleFilterClick}
            />
          )}
        </Box>
      </Box>

      {/* Filter popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: isMobile ? 250 : 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Filter by Category
          </Typography>
          <List dense>
            {categories.map(category => (
              <ListItem
                key={category}
                dense
                button
                onClick={() => onCategoryToggle(category)}
                sx={{ py: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    edge="start"
                    checked={activeCategories[category] || false}
                    tabIndex={-1}
                    disableRipple
                    size="small"
                  />
                </ListItemIcon>
                {getMarkerIcon && (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    {getMarkerIcon(category)}
                  </Box>
                )}
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {category}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default SearchBar;
