# Components Folder

The `components` folder contains all shared React components for the website (e.g. `HomepageHero`, `GlobalPropsAndTokens`, `Icons`, `AvailableProps`, `KitSearch`). Each component is a reusable and self-contained element with its own logic. Components can range from small UI elements like buttons and inputs to complex parts of the app like user profile cards, navigation bars, etc. When placing something inside of this folder, the question you can ask yourself is will it be used in multiple places? If the answer is yes, then it should be a component and live in this folder. 

If a component needs multiple files, a folder can also be built inside of this components folder containing an index.tsx and any relevant files that encapsulate that complex component. 
