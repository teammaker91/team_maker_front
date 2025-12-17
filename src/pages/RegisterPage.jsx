import "./LoginPage.css";

function RegisterPage({ onClose }) {

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("login-overlay")) {
      onClose();
    }
  };

  return (
    <div className="login-overlay" onClick={handleClickOutside}>
      <div className="login-wrapper" onClick={e => e.stopPropagation()}>

        <div className="login-modal">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="login-btn">Sign Up</button>

          <button onClick={onClose} className="close-btn">
            Stay as guest
          </button>
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;
