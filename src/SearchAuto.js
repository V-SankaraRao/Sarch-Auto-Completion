import { useEffect, useState } from "react";
import Drop from "./Drop";
import './App.css'
export default function SearchAuto() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); 
  const [filter, setFilter] = useState([]);
  const [showDrop, setShowDrop] = useState(false);

  function handleChange(e) {
    const q = e.target.value.toLowerCase(); 
    if (q.length > 1) {
      const fd = data.filter(item => item.toLowerCase().includes(q)); // 
      setFilter(fd);
      
      setShowDrop(true);
    } else {
      setShowDrop(false);
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/users");
      const dt = await res.json();
      
      if (dt && dt.users && dt.users.length) {
        setData(dt.users.map(item => item.firstName));
        console.log(data);
      }
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <input onChange={handleChange} placeholder="Search..." />
      {showDrop && filter.length > 0 && (
        <div>
          {filter.map((item, index) => 
          
             <Drop key={index} item={item} />

          )}
        </div>
      )}
    </div>
  );
}
