import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={styles.nav}>
      <h2 style={{ color: "white" }}>MERN Shop</h2>

      <div>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    backgroundColor: "#222",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px"
  }
};

export default Navbar;