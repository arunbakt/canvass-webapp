import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function ViewCanvassNotes() {
  const [canvassNotes, setCanvassNotes] = useState([]);

  useEffect(() => {
      const url = `${process.env.REACT_APP_API_HOST}canvass_notes`
      fetch(url)
      .then(res => res.json())
      .then(res => {
          setCanvassNotes(res);
      })
      .catch(err =>{
         console.log(`Error fetching canvass notes ${err}`);
       })
    }, []);

  return (
    <div>
      <main>
        <h2>List of Canvass Notes</h2>
        {canvassNotes.map((canvassNote, index) => (
        <div key={ index }>
            <h3>{canvassNote.person_name}</h3>
            <p>{canvassNote.notes}</p>
            <label>created at:</label>{" "}<time>{canvassNote.created_at}</time>
        </div>
        ))}
      </main>
    </div>
  );
}
