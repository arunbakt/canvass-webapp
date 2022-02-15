import { useEffect, useState } from "react";

export default function AddCanvassNote() {
  const [personName, setPersonName] = useState("");
  const [notes, setNotes] = useState("");
  const [saveSuccessful, setSaveSuccessful] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const saveCanvassNote = (e) => {
    e.preventDefault();
    const newCanvassNote = { person_name: personName, notes: notes };
    const postUrl = `${process.env.REACT_APP_API_HOST}canvass_notes`;
    fetch(postUrl, { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCanvassNote),
    })
    .then(res => {
      if (res.status == 201) {
        setSaveSuccessful(true);
      }
      return res.json()
    })
    .then(res => {
      if (res.code && res.code == 422){
        setSaveSuccessful(false);
        setErrorMessage(res.message);
      }
    })
    .catch(err=> {
      setSaveSuccessful(false);
      setErrorMessage('Server error occurred');
    });
  }

  return (
    <main>
      <h2>Add Canvass Note</h2>
      { saveSuccessful ? 
          <div style={{color:'green'}}>Canvass note saved for { personName }</div>
          : saveSuccessful === false ? 
            <div style={{color:'red'}}>Error saving note: { errorMessage }</div>
             : "" 
      }
      <form onSubmit={saveCanvassNote}>
        <div>
          <label>Person Name:</label>{" "}
          <input
            id="personName"
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
        </div>
        <div>
          <label>Enter field notes below:</label><br/>
          <textarea
            id="notes"
            type="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="25"
            cols="50"
          />
        </div>
        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
    </main>
  );
}
