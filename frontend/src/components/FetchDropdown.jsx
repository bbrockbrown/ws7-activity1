import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ onSelect }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    console.log('new query', newQuery);
    setQuery(newQuery);
    if (onSelect) onSelect(newQuery);
  };

  return (
  <div className='dropdown'>
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-autowidth-label">Query</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={query}
        onChange={handleChange}
        autoWidth
        label="Select a query"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'fetchAllUsers'}>fetchAllUsers</MenuItem>
        <MenuItem value={'fetchAllNames'}>fetchAllNames</MenuItem>
        <MenuItem value={'fetchAllAges'}>fetchAllAges</MenuItem>
      </Select>
    </FormControl>
  </div>
  );
}
