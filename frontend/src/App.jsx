import { useState } from 'react'
import './App.css'
import FetchDropdown from './components/FetchDropdown';

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

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
      <h3>Select a query from the dropdown below</h3>
      <div className='container'>
        <FetchDropdown onSelect={onQueryChange}/>
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
    </>
  );
}

export default App;
