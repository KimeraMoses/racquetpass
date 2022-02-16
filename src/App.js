import React from 'react';
import Routers from './web/pages/app';
import { useErrorBoundary } from 'use-error-boundary';
import ErrorPage from './web/pages/error-page';
import './lang/i18n';

function App() {
  const { ErrorBoundary } = useErrorBoundary();
  return (
    <ErrorBoundary
      render={() => <Routers />}
      renderError={({ error }) => {
        console.log(error);
        return <ErrorPage />;
      }}
    >
      <Routers />
    </ErrorBoundary>
  );
}

export default App;
