import { Link, Outlet } from 'react-router-dom';

export default function Wrapper() {
  return (
    <>
      <header>
        <Link to="/stores">View all stores</Link>
        <br></br>
        <Link to="/stores/new">Create a new store</Link>
      </header>

      <Outlet />
    </>
  );
}