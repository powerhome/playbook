import React, { useState } from "react"
import { Dialog, FixedConfirmationToast, PbReactPopover, Tooltip, Drawer, Button, ButtonToolbar, CircleIconButton, Map, Table, AdvancedTable, List, Filter, DistributionBar, Legend, Gauge, BarGraph, CircleChart, GanttChart, LineGraph, TreemapChart, Date, DateRangeInline, DateRangeStacked, DateStacked, DateTime, DateTimeStacked, DateYearStacked, Time, TimeRangeInline, TimeStacked, Timestamp, WeekdayStacked, Contact, Currency, HomeAddressStreet, LabelPill, LabelValue, Person, PersonContact, Source, DashboardValue, StatChange, StatValue, TitleCount, TitleDetail, FileUpload, Toggle, FormPill, FormGroup, Passphrase, PhoneNumberInput, TextInput, RichTextEditor, Textarea, Typeahead, DatePicker, Dropdown, MultiLevelSelect, Select, SelectableCard, SelectableCardIcon, SelectableIcon, Radio, Checkbox, SelectableList, Icon, IconCircle, IconStatValue, IconValue, UserBadge, Image, Lightbox, StarRating, Flex, Layout, Card, SectionSeparator, Background, Collapsible, Overlay, Draggable, Highlight, Message, BreadCrumbs, Nav, Pagination, LoadingInline, ProgressPills, ProgressSimple, ProgressStep, Walkthrough, Timeline, Badge, OnlineStatus, Pill, Hashtag, Body, Caption, Detail, Title, Avatar, AvatarActionButton, MultipleUsers, MultipleUsersStacked, User } from 'playbook-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const kitResponse = ({ response }) => {
  const [editorDisabled, setEditorDisabled] = useState(true);

  // const handleEditorEditable = () => { 
  //   setEditorDisabled(!editorDisabled);
  // }
  // Use a regular expression to extract the content inside the return statement
  const extractJSX = (code) => {
    const match = code.match(/return\s*\(([\s\S]*?)\n\s*\)/);
    return match ? match[1].trim() : null;
  };

  const jsxCode = extractJSX(response);

  return (
    <>
      <LiveProvider code={jsxCode} scope={{ Dialog, FixedConfirmationToast, PbReactPopover, Tooltip, Drawer, Button, ButtonToolbar, CircleIconButton, Map, Table, AdvancedTable, List, Filter, DistributionBar, Legend, Gauge, BarGraph, CircleChart, GanttChart, LineGraph, TreemapChart, Date, DateRangeInline, DateRangeStacked, DateStacked, DateTime, DateTimeStacked, DateYearStacked, Time, TimeRangeInline, TimeStacked, Timestamp, WeekdayStacked, Contact, Currency, HomeAddressStreet, LabelPill, LabelValue, Person, PersonContact, Source, DashboardValue, StatChange, StatValue, TitleCount, TitleDetail, FileUpload, Toggle, FormPill, FormGroup, Passphrase, PhoneNumberInput, TextInput, RichTextEditor, Textarea, Typeahead, DatePicker, Dropdown, MultiLevelSelect, Select, SelectableCard, SelectableCardIcon, SelectableIcon, Radio, Checkbox, SelectableList, Icon, IconCircle, IconStatValue, IconValue, UserBadge, Image, Lightbox, StarRating, Flex, Layout, Card, SectionSeparator, Background, Collapsible, Overlay, Draggable, Highlight, Message, BreadCrumbs, Nav, Pagination, LoadingInline, ProgressPills, ProgressSimple, ProgressStep, Walkthrough, Timeline, Badge, OnlineStatus, Pill, Hashtag, Body, Caption, Detail, Title, Avatar, AvatarActionButton, MultipleUsers, MultipleUsersStacked, User }}>
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </>
  );
};

export default kitResponse;