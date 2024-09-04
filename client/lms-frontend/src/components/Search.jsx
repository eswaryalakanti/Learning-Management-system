import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/AxiosInstance';


const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
            const res=axiosInstance.get(`/search?title=${query}`)
         const response=await response;
          setResults(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
