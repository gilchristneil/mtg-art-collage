"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

interface ArtSearchBarProps {
  onSearchChange?: (searchParams: SearchParams) => void;
}

export interface SearchParams {
  query: string;
  sortBy: 'date' | 'title' | 'relevance';
  style?: string;
  medium?: string;
}

const ArtSearchBar = ({ onSearchChange }: ArtSearchBarProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    sortBy: 'relevance',
    style: undefined,
    medium: undefined
  });

  const handleChange = (field: keyof SearchParams) => (event: any) => {
    const newParams = {
      ...searchParams,
      [field]: event.target.value
    };
    setSearchParams(newParams);
    onSearchChange?.(newParams);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Search artwork"
          variant="outlined"
          value={searchParams.query}
          onChange={handleChange('query')}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={searchParams.sortBy}
            label="Sort By"
            onChange={handleChange('sortBy')}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>

       
      </Stack>
    </Box>
  );
};

export default ArtSearchBar;
