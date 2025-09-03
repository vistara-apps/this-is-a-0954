import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TemplateGallery from './components/TemplateGallery';
import CodeEditor from './components/CodeEditor';
import DeploymentPanel from './components/DeploymentPanel';
import Settings from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'templates':
        return <TemplateGallery />;
      case 'editor':
        return <CodeEditor />;
      case 'deployment':
        return <DeploymentPanel />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 ml-64">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;