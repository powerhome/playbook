const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;

// Set the path to your component library's root directory
const libraryPath = '../../';

const allowedFilenames = [
    'avatar',
    'avatar_action_button',
    'multiple_users',
    'multiple_users_stacked',
    'user',
    'background',
    'bread_crumbs',
    'button',
    'button_toolbar',
    'circle_icon_button',
    'card',
    'collapsible',
    'bar_graph',
    'circle_chart',
    'distribution_bar',
    'gauge',
    'legend',
    'line_graph',
    'treemap_chart',
    'dialog',
    'filter',
    'fixed_confirmation_toast',
    'checkbox',
    'date_picker',
    'file_upload',
    'form',
    'form_group',
    'form_pill',
    'multi_level_select',
    'passphrase',
    'phone_number_input',
    'radio',
    'rich_text_editor',
    'select',
    'selectable_card',
    'selectable_card_icon',
    'selectable_icon',
    'selectable_list',
    'text_input',
    'textarea',
    'toggle',
    'typeahead',
    'highlight',
    'icon',
    'icon_circle',
    'icon_stat_value',
    'icon_value',
    'image',
    'flex',
    'layout',
    'lightbox',
    'list',
    'loading_inline',
    'map',
    'nav',
    'badge',
    'hashtag',
    'pill',
    'pagination',
    'popover',
    'progress_pills',
    'progress_simple',
    'progress_step',
    'section_separator',
    'star_rating',
    'table',
    'timeline',
    'date',
    'date_range_inline',
    'date_range_stacked',
    'date_stacked',
    'date_time',
    'date_time_stacked',
    'date_year_stacked',
    'time',
    'time_range_inline',
    'time_stacked',
    'timestamp',
    'weekday_stacked',
    'tooltip',
    'body',
    'caption',
    'title',
    'contact',
    'currency',
    'dashboard_value',
    'home_address_street',
    'label_pill',
    'label_value',
    'message',
    'person',
    'person_contact',
    'source',
    'stat_change',
    'stat_value',
    'title_count',
    'title_detail',
    'user_badge',
    'walkthrough',
];


// Helper function to parse a JavaScript file using Babel
function parseFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return babel.parseSync(fileContent, {
        presets: ['@babel/preset-react', "@babel/preset-flow", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-syntax-typescript"],
        configFile: false,
        sourceType: 'module',
        filename: filePath,
    });
}

// Helper function to count props in a component
function countProps(componentAST) {
    let propCount = 0;

    traverse(componentAST, {
        JSXOpeningElement(path) {
            const attributes = path.node.attributes;
            propCount += attributes.length;
        },
    });

    return propCount;
}

// Initialize counts
let componentTotal = 0;
let propsTotal = 0;
let variantTotal = 0;

// Traverse the component library directory recursively
function traverseDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);
  
    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;
      const stat = fs.statSync(filePath);
  
      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.startsWith('_') && file.endsWith('.tsx')) {
        const fileName = file.slice(1, -4); // Remove the leading "_" and ".tsx" extension
        if (allowedFilenames.includes(fileName)) {
          const componentAST = parseFile(filePath);
          const propCount = countProps(componentAST);
  
          componentTotal++;
          propsTotal += propCount;
  
          traverse(componentAST, {
            JSXAttribute(path) {
              if (path.node.name.name === 'variant') {
                variantTotal++;
              }
            },
          });
        }
      }
    }
  }

// Start traversing the component library
traverseDirectory(libraryPath);

// Display the statistics
console.log('Components Total:', componentTotal);
console.log('Props Total on All Components:', propsTotal);
console.log('Props called "variant" Total:', variantTotal);
