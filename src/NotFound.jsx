import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404: Page Not Found</h2>
      <p>Sorry, that url does not exist.</p>
      <Link to='/'>Back to the homepage</Link>
    </div>
  )
}