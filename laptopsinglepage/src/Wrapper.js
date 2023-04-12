import { Link, Outlet } from 'react-router-dom';

export default function Wrapper() {
  return (
    <>
      <header>
        <Link to="/todo">View all todos</Link>
        <br></br>
        <Link to="/todo/new">Create a new Todo</Link>
      </header>

      <Outlet />
    </>
  );
}