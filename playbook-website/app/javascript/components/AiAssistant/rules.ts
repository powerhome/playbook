const designRules = {
    Button: [
        "Limit a design to have only one primary button on a page or within a design for clarity and focus.",
        "Secondary buttons are used for less important actions.",
        "Button links are used for actions needing low attention.",
        "Button text should not exceed three words (three words or fewer).",
        "Button text should be clear, concise, and start with verbs.",
        "If limited space for a button, use a circle icon button or consolidate actions within an ellipsis menu.",
        "Use icons to clarify ambiguous button text when necessary."
    ],
    ButtonToolbar: [
        "Group related actions in dropdown menus to avoid toolbar clutter.",
        "Use icons instead of text when space is limited."
    ],
    Filter: [
        "Use 'Filter' and 'Defaults' as button labels in filter interfaces, rather than 'Apply' and 'Cancel.'",
        "Ensure the label in the filter matches the header name in the table.",
        "If no filters are selected, the filter interface should display microcopy indicating no filters are active.",
        "Use an empty state message when no data is available or filtered data has no matches."
    ],
    Pagination: [
        "Paginate a table after 20 rows.",
        "Place pagination components above and underneath the table, and align them to the left of the container.",
        "Group pagination and table components together with a card."
    ],
    Pill: [
        "Pill text should be title case; avoid all lowercase or all uppercase.",
        "Use pill variants to communicate status to the user."
    ],
    Table: [
        "To indicate an empty value in a table cell, use double hyphen (--).",
        "If a table row has only one clickable action, make the entire row clickable to improve usability.",
        "Left-align Dates, Zip/Postal Codes, and Phone Numbers in a table.",
        "Right-align Numbers, Money, Measurements, and Percentages in a table.",
        "Tabular spacing should be applied to numerical values: Money, Measurements, Percentages."
    ],
}

const territories = [
    { id: 1, name: "Philadelphia", abbreviation: "PHL" },
    { id: 2, name: "New Jersey", abbreviation: "NJ" },
    { id: 3, name: "Maryland", abbreviation: "MD" },
    { id: 4, name: "Connecticut", abbreviation: "CT" },
    { id: 5, name: "Long Island", abbreviation: "LI" },
    { id: 6, name: "Boston", abbreviation: "BOS" },
    { id: 7, name: "Atlanta", abbreviation: "ATL" },
    { id: 8, name: "Chicago", abbreviation: "CHI" },
    { id: 9, name: "Detroit", abbreviation: "DET" },
    { id: 10, name: "Houston", abbreviation: "HOU" },
    { id: 11, name: "Dallas", abbreviation: "DAL" },
    { id: 12, name: "Denver", abbreviation: "DEN" },
    { id: 13, name: "Tampa", abbreviation: "TPA" },
    { id: 14, name: "Austin", abbreviation: "AUS" },
    { id: 15, name: "Charlotte", abbreviation: "CLT" },
    { id: 16, name: "Nashville", abbreviation: "NSH" },
    { id: 17, name: "Phoenix", abbreviation: "PHX" },
    { id: 18, name: "Pittsburgh", abbreviation: "PIT" },
    { id: 19, name: "San Antonio", abbreviation: "SAO" },
    { id: 20, name: "Fort Lauderdale", abbreviation: "FLL" },
    { id: 21, name: "Las Vegas", abbreviation: "LVS" },
    { id: 22, name: "Orlando", abbreviation: "ORL" }
]

const genericInfo = {
    territories: [
        "Each territory has a territory_id, territory_name, and territory_abbreviation.",
        "Territories should always be listed in sequential territory id order."
    ],
    PhoneNumbers: [
        "Phone numbers should be displayed in this format: (XXX) XXX-XXXX."
    ]
}

const tableGuidelines = [
    { section: "Table Title", description: "Title should be in Title case size 3; Title should be located above the table and left aligned on the page" },
    { section: "Table Filter", description: "The order of options in the filter should follow the order of the table columns; The primary button confirming filter selections should be entitled 'Filter' and the secondary button resetting the filter options should be entitled 'Defaults'" },
    { section: "Table Pagination", description: "Tables should paginate at 20 rows or more; Pagination bars should be located above and below the table (if there is a filter above the table, the pagination bar should be in between the filter and the table); Pagination bars should be left aligned on the page" },
    { section: "Table itself", description: "The last column on a table should be right aligned; A column that contains numbers should be right aligned; A column that uses numbers should display them as tabular using the numberSpacing global prop; A column that displays dates should be right aligned; A column that displays dates should use the date kit; A column that displays status should use pills and display text in title case; A column that displays status should use pills with corresponding variant options (e.g. 'Active' is variant 'success' and 'Canceled' is variant 'error'); A table with one button on each row should place the button in the last column and use the secondary button variant; A table with two buttons on each row should show a link variant button and a secondary variant button and display the secondary button last; A table with one action on each row that must fall in a middle column should use the link variant" },
    { section: "Description of code for Table Template in full", description: "A table template contains a Title, then a Card and a Table with a Table.Header with column headers and Table.Body with the following constraints: the rightmost column is right aligned with prop textAlign='right', if any columns contain numbers those numbers are set to tabular spacing with prop numberSpacing='tabular', if any columns exhibit Statuses they utilize the Pill component with prop textTransform='none'" },
    { section: "Description of code for Table with Filter Template in full", description: "A table template contains a Title, then a Card which contains a Filter with filter labels that correspond to table columns (in page and order), a SectionSeparator, a Table with a Table.Header with column headers and Table.Body with the following constraints: the rightmost column is right aligned with prop textAlign='right', if any columns contain numbers those numbers are set to tabular spacing with prop numberSpacing='tabular', if any columns exhibit Statuses they utilize the Pill component with prop textTransform='none'" }
]

const newsLayout = [
    { section: "News Magazine Template", description: "The news magazine template uses a Collection detail layout which displays a sidebar on the left and repeating cards on the right like a collection. The Layout component encompasses the entire page, while a Layout.Body subcomponent surrounds the section with repeating cards." },
    { section: "Card in Collection Detail", description: "A card in a collection detail may contain a card with content." },
    { section: "Card Component", description: "A card in a collection detail may contain a Card component with both a Card.Header and Card.Body that each contain a Body component inside to display content." },
    { section: "Card Body Content", description: "A card body may contain just text, or may contain other components within it such as Image, Title, SectionSeparator, Flex, FlexItem, and IconValue." },
    { section: "Sidebar Composition", description: "Sidebars are composed of a Nav with orientation='vertical' containing several NavItem components." },
    { section: "Description of Code for News Magazine", description: "A news magazine style collection is created with the following (in the described order): a Layout component with prop layout='collection_detail', a Card that contains a Caption where the text is the desired page name, a SectionSeparator, a Nav with prop orientation='vertical' containing nested NavItems making up the sidebar for the page, a Layout.Body subcomponent containing the information for the collection of cards, where each Card contains a Card.Header subcomponent with Caption and a Card.Body subcomponent with the card content as text or a more complex presentation with Image, Title, SectionSeparator, Flex, FlexItem, IconValue." }
]
export { designRules, genericInfo, newsLayout, tableGuidelines, territories }