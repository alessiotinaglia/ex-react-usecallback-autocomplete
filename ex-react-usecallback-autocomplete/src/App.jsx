import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 
  const [suggestion, setSuggestion] = useState([]);

  const DEBOUNCE_DELAY = 300; 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId); 
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestion([]);
      return;
    }

    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => setSuggestion(data))
      .catch(err => console.error("Errore nella richiesta API:", err));
  }, [debouncedQuery]);

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Cerca prodotto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />

      {suggestion.length > 0 && (
        <div className="dropdown" style={{ border: '1px solid #ccc', marginTop: '8px', width: '300px', backgroundColor: '#fff' }}>
          {suggestion.map((product) => (
            <p key={product.id} style={{ margin: '0', padding: '8px', borderBottom: '1px solid #eee' }}>
              {product.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
