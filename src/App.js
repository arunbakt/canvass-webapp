import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from 'react-router-dom';

const style = {
  borderBottom: 'solid 1px',
  paddingBottom: '1rem'
}
function App() {
  return (
    <div>
      <h1>Canvass Notes</h1>
      <nav style={style}>
        <Link to='/view_notes'>View Canvassing Notes</Link>| {" "}
        <Link to='/add_notes'>Add Canvassing Note</Link>'
      </nav>
      <Outlet/>
    </div>
  );
}

export default App;
