// This is a custom component registry to replace Webpacker React
// NOTE: When we go to React 18, we will need to update this to use createRoot instead of render.
// Namespaced to Playbook's data-pb-react-* attributes to avoid conflicts with other React usage on the page.
import React from 'react'
import ReactDOM from 'react-dom'

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

  // Mount all components on the page (namespaced to Playbook)
  mountComponents() {
    document.querySelectorAll('[data-pb-react-component]').forEach(element => {
      const componentName = element.getAttribute('data-pb-react-component');
      const component = this.get(componentName);

      if (component && !this.mountedComponents.has(element)) {
        this.mountComponent(element, component);
      }
    });
  }

  // Mount a specific component
  mountComponent(element, component) {
    if (this.mountedComponents.has(element)) {
      return;
    }

    try {
      const props = this.extractProps(element);
      ReactDOM.render(React.createElement(component, props), element);
      this.mountedComponents.add(element);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to mount component:', error);
    }
  }

  // Unmount all components (skip if element already detached)
  unmountComponents() {
    this.mountedComponents.forEach(element => {
      if (!element.isConnected) return;
      try {
        ReactDOM.unmountComponentAtNode(element);
      } catch (_) {
        // Ignore unmount errors
      }
    });
    this.mountedComponents.clear();
  }

  // Extract props from data attributes (namespaced)
  extractProps(element) {
    const props = {};

    const propsData = element.getAttribute('data-pb-react-props');
    if (propsData) {
      try {
        Object.assign(props, JSON.parse(propsData));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Failed to parse data-pb-react-props JSON:', e);
      }
    }

    // 2) Extract individual data-pb-* attributes (ignore control attrs)
    Array.from(element.attributes).forEach(attr => {
      const name = attr.name;
      if (!name.startsWith('data-pb-')) return;
      if (name === 'data-pb-react-component' || name === 'data-pb-react-props') return;

      const key = name.replace('data-pb-', '');
      props[key] = attr.value;
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
window.ComponentRegistry = window.ComponentRegistry || new ComponentRegistry();

export default window.ComponentRegistry;