import React, { useState } from 'react';
import LoginPage from './Patron/Library Visitor/LoginPage';
import SignUp from './Patron/Library Visitor/SignUp';

export default function Index() {
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignUp) {
    return <SignUp onCancel={() => setShowSignUp(false)} />;
  }

  return (
    <LoginPage
      onSignUpPress={() => {
        setShowSignUp(true);
      }}
    />
  );
}
