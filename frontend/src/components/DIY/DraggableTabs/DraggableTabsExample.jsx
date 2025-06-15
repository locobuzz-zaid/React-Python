import React from 'react';
import DraggableTabs from './DraggableTabs';

/**
 * Example usage of DraggableTabs component
 * 
 * Features:
 * 1. Drag and drop tabs to reorder them
 * 2. Add new dashboard tabs with the "Add Dashboard" button
 * 3. Close tabs (except the first one) by clicking the X icon
 * 4. Edit tab titles by clicking on them
 * 5. Each tab contains a separate Dashboard instance
 * 
 * The component automatically handles:
 * - Tab state management
 * - Drag and drop functionality
 * - Tab creation and deletion
 * - Dashboard instance management
 */

const DraggableTabsExample = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DraggableTabs />
    </div>
  );
};

export default DraggableTabsExample;
