// Modern component registry to replace Webpacker React
import React from 'react'
import ReactDOM from 'react-dom/client'

class ComponentRegistry {
  constructor() {
    this.components = new Map();
    this.mountedComponents = new Set();
  }

  // Register a component with a name
  register(name, component) {
    this.components.set(name, component);
    
    // Also register with kebab-case for Rails compatibility
    const kebabName = this.toKebabCase(name);
    if (kebabName !== name) {
      this.components.set(kebabName, component);
    }
  }

  // Register multiple components at once
  registerComponents(components) {
    Object.entries(components).forEach(([name, component]) => {
      this.register(name, component);
    });
  }

  // Get a component by name
  get(name) {
    return this.components.get(name);
  }

  // Mount all components on the page
  mountComponents() {
    document.querySelectorAll('[data-react-component]').forEach(element => {
      const componentName = element.getAttribute('data-react-component');
      const component = this.get(componentName);
      
      if (component && !this.mountedComponents.has(element)) {
        this.mountComponent(element, component);
      }
    });
  }

  // Mount a specific component
  mountComponent(element, component) {
    if (this.mountedComponents.has(element)) {
      return; // Already mounted
    }

    try {
      const props = this.extractProps(element);
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(component, props));
      
      this.mountedComponents.add(element);
    } catch (error) {
      console.error('Failed to mount component:', error);
    }
  }

  // Unmount all components
  unmountComponents() {
    this.mountedComponents.forEach(element => {
      if (element._reactRoot) {
        element._reactRoot.unmount();
      }
    });
    this.mountedComponents.clear();
  }

  // Extract props from data attributes
  extractProps(element) {
    const props = {};
    
    // Extract data-react-props if present
    const propsData = element.getAttribute('data-react-props');
    if (propsData) {
      try {
        Object.assign(props, JSON.parse(propsData));
      } catch (e) {
        console.warn('Failed to parse react props:', e);
      }
    }

    // Extract individual data attributes
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-') && attr.name !== 'data-react-component') {
        const key = attr.name.replace('data-', '');
        props[key] = attr.value;
      }
    });

    return props;
  }

  // Convert PascalCase to kebab-case
  toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
      .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
      .toLowerCase();
  }
}

// Create global instance
window.ComponentRegistry = new ComponentRegistry();

// Export for ES modules
export default window.ComponentRegistry;
