import React from 'react';

export const CurrentUserContext = React.createContext({
  username: 'guest',
  email: 'guest@example.com',
});
