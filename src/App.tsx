import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Feed } from './components/Feed';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Feed />
      </div>
    </AppProvider>
  );
}

export default App;