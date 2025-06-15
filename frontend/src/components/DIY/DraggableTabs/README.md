# Draggable Tabs Component

A React component that provides draggable tabs functionality with integrated Dashboard components using Ant Design and react-dnd.

## Features

- ✅ **Drag & Drop**: Reorder tabs by dragging them
- ✅ **Add/Remove Tabs**: Add new dashboard tabs or close existing ones
- ✅ **Editable Titles**: Click on tab titles to edit them
- ✅ **Dashboard Integration**: Each tab contains a separate Dashboard instance
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Modern UI**: Beautiful styling with hover effects and animations

## Installation

The component requires the following dependencies:

```bash
npm install react-dnd react-dnd-html5-backend antd
```

## Usage

### Basic Usage

```jsx
import DraggableTabs from "./components/DIY/DraggableTabs";

function App() {
  return (
    <div className="App">
      <DraggableTabs />
    </div>
  );
}
```

### Integration with Layout

```jsx
import DraggableTabs from "./DraggableTabs";

const LayoutView = () => {
  return (
    <Layout>
      <Content>
        <DraggableTabs />
      </Content>
    </Layout>
  );
};
```

## Component Structure

```
DraggableTabs/
├── DraggableTabs.jsx          # Main component
├── DraggableTabs.css          # Styles
├── DraggableTabsExample.jsx   # Usage example
├── README.md                  # This file
└── index.js                   # Export file
```

## Key Components

### DraggableTabs

The main component that manages tab state and drag-and-drop functionality.

### DraggableTabNode

Individual draggable tab wrapper that handles drag/drop events.

### Dashboard

The content component rendered inside each tab.

## Props

The `DraggableTabs` component doesn't require any props and manages its own state internally.

## Customization

### Styling

Modify `DraggableTabs.css` to customize the appearance:

```css
.draggable-tabs {
  /* Custom styles for the tabs container */
}

.draggable-tab {
  /* Custom styles for individual tabs */
}

.add-tab-button {
  /* Custom styles for the add button */
}
```

### Dashboard Content

Each tab renders a `Dashboard` component with a unique `dashboardId` prop. You can customize the Dashboard component to suit your needs.

## API

### Tab Management

- **Add Tab**: Click the "Add Dashboard" button
- **Remove Tab**: Click the X icon on any tab (except the first one)
- **Reorder Tabs**: Drag and drop tabs to new positions
- **Edit Title**: Click on a tab title to edit it inline

### State Management

The component maintains its own internal state for:

- `tabs`: Array of tab objects with `key`, `title`, and `closable` properties
- `activeKey`: Currently active tab key
- `moveTab`: Function to handle tab reordering

## Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Dependencies

- React 16.8+
- Ant Design 4.0+
- react-dnd 16.0+
- react-dnd-html5-backend 16.0+

## Examples

### Adding Custom Content

```jsx
// Modify the TabPane content to add custom components
<TabPane key={tab.key}>
  <YourCustomComponent id={tab.key} />
</TabPane>
```

### Custom Tab Titles

```jsx
// Modify the tab prop to customize title rendering
tab={
  <div className="custom-tab-title">
    <Icon type="dashboard" />
    <span>{tab.title}</span>
  </div>
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This component is part of the React-Python project and follows the same licensing terms.
