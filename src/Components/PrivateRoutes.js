import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = getTokenFromCookie();
  function getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      if (name === "token") {
        return value;
      }
    }

    return null; // Return null if the token cookie is not found
  }
  // const token = "abcd";
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default PrivateRoute;
