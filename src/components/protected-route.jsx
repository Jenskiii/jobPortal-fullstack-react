import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }) {
  // import cleck functions
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  // if user not logged in return to home page with adjusted url
  // will show login screen based on url
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  // check onboarding status
  // did user pick a role of recruiter or candidate
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
}
