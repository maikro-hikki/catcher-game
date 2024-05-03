import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div>not found</div>
      <NavLink to="/">Back to Homepage</NavLink>
    </>
  );
}
