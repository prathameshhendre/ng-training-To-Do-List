import React from 'react';
import TaskList from './components/TaskList';
// The SLDS CSS import is in main.jsx, so you don't need it here unless you want to confirm.

function App() {
  return (
    // Apply slds-scope here to ensure all child components inherit SLDS styling
    <div className="slds-scope">
      <TaskList />
    </div>
  );
}

export default App;