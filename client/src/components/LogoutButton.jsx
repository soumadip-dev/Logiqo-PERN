import { useAuthStore } from '../store/useAuthStore';

const LogoutButton = ({ children, className = '', onLogout }) => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button className={className} onClick={handleLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
