import { useState } from 'react'
import './App.css'
import FetchDropdown from './components/FetchDropdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const onQueryChange = async (newQuery) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${newQuery}`);
    if (!response.ok) {
      setList([]);
      setError(response);
    } else {
      const data = await response.json();
      setError(null);
      setList(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('attempting to submit with formData', formData);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createNewUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
        }),
      });
      if (!response.ok) {
        throw response;
      }
      
      setFormData({ name: '', email: '', age: '' });
      onQueryChange('fetchAllUsers');
    } catch (err) {
      setError(err);
    }
  };

  const getTableHeaders = () => {
    if (list.length === 0) return [];
    const allKeys = new Set();
    list.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys);
  };

  return (
    <>
      <h1>SUPER EPIC QUERY SELECTOR EXAMPLE</h1>
      <div className='container'>
        <div className='left'>
          <h3>Create New User Below!</h3>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '35ch' }, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Name" 
              variant="outlined" 
              required
            />
            <TextField 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email" 
              variant="outlined"
              type="email" 
              required
            />
            <TextField 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              label="Age" 
              variant="outlined"
              type="number"
              required
            />
            <Button type='submit' variant='outlined'>Submit</Button>
          </Box>
        </div>
        <div className='right'>
          <h3>Select a query from the dropdown below</h3>
          <FetchDropdown onSelect={onQueryChange}/>
          {list.length === 0 && (
            <h3>No Results :(, try a diff query?</h3>
          )}
          {list.length > 0 && (
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    {getTableHeaders().map(header => (
                      <th key={header}>{header.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr key={item.id || index}>
                      {getTableHeaders().map(header => (
                        <td key={`${item.id || index}-${header}`}>
                          {item[header]?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {error != null && (
            <h3 className='error-text'>{error.url} {error.statusText}</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
