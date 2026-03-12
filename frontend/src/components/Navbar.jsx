const users=JSON.parse(localStorage.getItem("users")) || [];
const handlelogout=()=>{
  localStorage.removeItem("currentUser");
  window.location.href="/login";
}

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Workout Listings</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-workout">Add Workout</Link>
        <span>Welcome {users.length>0 && users[users.length-1].name}</span>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <button onClick={handlelogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
