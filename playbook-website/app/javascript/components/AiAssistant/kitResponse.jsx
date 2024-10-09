import React, { useState } from "react"
import { Dialog, FixedConfirmationToast, PbReactPopover, Tooltip, Drawer, Button, ButtonToolbar, CircleIconButton, Map, Table, AdvancedTable, List, Filter, DistributionBar, Legend, Gauge, BarGraph, CircleChart, GanttChart, LineGraph, TreemapChart, Date, DateRangeInline, DateRangeStacked, DateStacked, DateTime, DateTimeStacked, DateYearStacked, Time, TimeRangeInline, TimeStacked, Timestamp, WeekdayStacked, Contact, Currency, HomeAddressStreet, LabelPill, LabelValue, Person, PersonContact, Source, DashboardValue, StatChange, StatValue, TitleCount, TitleDetail, FileUpload, Toggle, FormPill, FormGroup, Passphrase, PhoneNumberInput, TextInput, RichTextEditor, Textarea, Typeahead, DatePicker, Dropdown, MultiLevelSelect, Select, SelectableCard, SelectableCardIcon, SelectableIcon, Radio, Checkbox, SelectableList, Icon, IconCircle, IconStatValue, IconValue, UserBadge, Image, Lightbox, StarRating, Flex, Layout, Card, SectionSeparator, Background, Collapsible, Overlay, Draggable, Highlight, Message, BreadCrumbs, Nav, Pagination, LoadingInline, ProgressPills, ProgressSimple, ProgressStep, Walkthrough, Timeline, Badge, OnlineStatus, Pill, Hashtag, Body, Caption, Detail, Title, Avatar, AvatarActionButton, MultipleUsers, MultipleUsersStacked, User } from 'playbook-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const kitResponse = ({ response }) => {
  const [editorDisabled, setEditorDisabled] = useState(true);

  const transformComponent = (code) => {
    // Step 0: Remove triple backticks if present
    const codeWithoutBackticks = code.replace(/```[\s\S]*?```/g, '');
  
    // Step 1: Remove all import statements
    const codeWithoutImports = codeWithoutBackticks.replace(/import\s+[\s\S]+?['"].+?['"]\s*;?/g, '');
  
    // Step 2: Remove export default at the bottom
    const codeWithoutExports = codeWithoutImports.replace(/export\s+default\s+\w+\s*;?/g, '');
  
    // Step 3: Convert arrow function components to regular function components
    const updatedComponent = codeWithoutExports.replace(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/g, 'function $1() {');
  
    // Step 4: Move any const declarations inside the function component
    const movedConstsInside = updatedComponent.replace(/(const\s+\w+\s*=\s*\[[\s\S]*?\];?)/g, (match, p1) => {
      return p1;
    });
  
    // Step 5: Add a render statement at the bottom
    const componentNameMatch = movedConstsInside.match(/function\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Component';
    const renderStatement = `${movedConstsInside}\n\nrender(<${componentName} />);`;
  
    return renderStatement.trim();
  };
    // Define the example code as a string - note the removal of template literals
  const example = `function FrogLifeExpectancy() {
  const frogData = [
    {
      name: "Common Frog",
      data: [10]
    },
    {
      name: "Tree Frog",
      data: [6]
    },
    {
      name: "Bullfrog",
      data: [8]
    },
    {
      name: "African Clawed Frog",
      data: [15]
    },
    {
      name: "Poison Dart Frog",
      data: [4]
    }
  ];

  return (
    <div>
      <BarGraph
        align="center"
        axisTitle="Life Expectancy (years)"
        chartData={frogData}
        id="frog-life-expectancy-graph"
        pointStart={1}
        subTitle="Source: Various studies on amphibians"
        title="Life Expectancy of Various Frog Species"
      />
    </div>
  );
}

render(<FrogLifeExpectancy />);`;


const jsxCode = transformComponent(response);

console.log(jsxCode);
  return (
      <LiveProvider code={jsxCode} noInline={true} scope={{ Dialog, FixedConfirmationToast, PbReactPopover, Tooltip, Drawer, Button, ButtonToolbar, CircleIconButton, Map, Table, AdvancedTable, List, Filter, DistributionBar, Legend, Gauge, BarGraph, CircleChart, GanttChart, LineGraph, TreemapChart, Date, DateRangeInline, DateRangeStacked, DateStacked, DateTime, DateTimeStacked, DateYearStacked, Time, TimeRangeInline, TimeStacked, Timestamp, WeekdayStacked, Contact, Currency, HomeAddressStreet, LabelPill, LabelValue, Person, PersonContact, Source, DashboardValue, StatChange, StatValue, TitleCount, TitleDetail, FileUpload, Toggle, FormPill, FormGroup, Passphrase, PhoneNumberInput, TextInput, RichTextEditor, Textarea, Typeahead, DatePicker, Dropdown, MultiLevelSelect, Select, SelectableCard, SelectableCardIcon, SelectableIcon, Radio, Checkbox, SelectableList, Icon, IconCircle, IconStatValue, IconValue, UserBadge, Image, Lightbox, StarRating, Flex, Layout, Card, SectionSeparator, Background, Collapsible, Overlay, Draggable, Highlight, Message, BreadCrumbs, Nav, Pagination, LoadingInline, ProgressPills, ProgressSimple, ProgressStep, Walkthrough, Timeline, Badge, OnlineStatus, Pill, Hashtag, Body, Caption, Detail, Title, Avatar, AvatarActionButton, MultipleUsers, MultipleUsersStacked, User }}>
        <LiveError />
        <LivePreview />
      </LiveProvider>
  );
};

export default kitResponse;