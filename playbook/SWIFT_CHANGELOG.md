# 🚀 Playbook Swift 6.6.2: Adjustments and Fixes! 🚀
##### Jan 17, 2025

### Bug Fixes
- **[PBIOS-662]** Modify PBReactionButton to Use Binding by [@RachelRadford21](https://github.com/RachelRadford21) in [#485](https://github.com/Power/Playbook/pull/485)
- **[PBIOS-659]** Update PBSelect Kit Dynamic Select by [@RachelRadford21](https://github.com/RachelRadford21) in [#484](https://github.com/Power/Playbook/pull/484)
- **[PBIOS-655]** pbIcon Clipping Fix by [@RachelRadford21](https://github.com/RachelRadford21) in [#480](https://github.com/Power/Playbook/pull/480)
- **[PBIOS-668]** Section list fix for connect by [@isismsilva](https://github.com/isismsilva) in [#486](https://github.com/Power/Playbook/pull/486)

[Full Changelog](https://github.com/Power/Playbook/compare/6.6.1...6.6.2)

---

# 🚀 Playbook Swift 6.6.1: Typeahead improvements! 🚀
##### Jan 07, 2025

This release introduces fixes and improvements that refine user experience, optimize component behavior, and expand functionality across platforms.

#### Full List of Changes

**Bug Fixes**
- **[PBIOS-656]** Typeahead presentation fix by [@isismsilva](https://github.com/isismsilva) in [#482](https://github.com/Power/Playbook/pull/482)

[Full Changelog](https://github.com/Power/Playbook/compare/6.6.0...6.6.1)

---

# 🚀 Playbook Swift 6.6.0: Enhanced Reaction Button! 🚀
##### Dec 18, 2024

This release introduces fixes and improvements that refine user experience, optimize component behavior, and expand functionality across platforms.

#### Full List of Changes

**Bug Fixes**
- Fix Popover Closing on Scroll: Resolved issues with popovers unexpectedly closing when scrolling. [#469](https://github.com/Power/Playbook/pull/469) (Isis Silva)
- Fix Popover Leak: Addressed a memory leak associated with popover components. [#478](https://github.com/Power/Playbook/pull/478) (Alexandre Hauber)
- Fix Typeahead Dropdown Scroll on Key Pressed: Improved dropdown behavior for a smoother scrolling experience when using the keyboard. [#476](https://github.com/Power/Playbook/pull/476)

**Kit Enhancements**
- Update Padding Prop to PBNavItem: Introduced a new padding property for PBNavItem to allow greater customization. [#475](https://github.com/Power/Playbook/pull/475) (Rachel Radford)
- Add Action to Reaction Button: Enabled new actions to enhance interactivity with the Reaction Button kit. [#474](https://github.com/Power/Playbook/pull/474) (Rachel Radford)

**Platform Updates**
- Upgrade iOS and macOS Versions: Updated supported versions for iOS and macOS to ensure compatibility with the latest platforms. [#477](https://github.com/Power/Playbook/pull/477)




# 🚀 Playbook Swift 6.5.1: Adjustments and Fixes! 🚀
##### Dec 04, 2024

This release includes adjustments and necessary fixes for release 6.5.0

Adjustments and Fixes 6.5.0: This update includes essential changes and tweaks following our last major release to ensure everything runs. [#1665](https://github.com/powerhome/playbook-swift/pull/472) [(Everton Cunha)](https://github.com/evertoncunha)

🔗 [Full Changelog](https://github.com/powerhome/playbook-swift/compare/6.5.0...6.5.1)



# 🚀 Playbook Swift 6.5.0: Enhanced Dynamic Typeahead! 🚀
##### Nov 12, 2024

Dive into our latest release, Playbook Swift 6.5.0, where we've introduced some exciting enhancements to improve your development experience. Here’s a quick look at what’s new:

[6.5.0 Full List of Changes](https://github.com/powerhome/playbook-swift/compare/6.4.1...6.5.0)

### Playbook Changes 

#### Kit Enhancements 
- **Make Reaction Button Public**: We've made the Reaction Button accessible for all users, expanding its potential applications across different projects. [#625](https://github.com/powerhome/playbook-swift/pull/470) [(Rachel Radford)](https://github.com/RachelRadford21)

#### Bug Fixes 
- **Fix Single Selection Highlight**: We've addressed an issue where highlights were not behaving as expected in single selection modes. [#598](https://github.com/powerhome/playbook-swift/pull/466) [(Isis Silva)](https://github.com/isismsilva)
- **Fix Focus on Backspace**: This fix ensures that focus behavior is consistent across various use cases when backspacing through inputs. [#590](https://github.com/powerhome/playbook-swift/pull/467) [(Isis Silva)](https://github.com/isismsilva)

🔗 [Full Changelog](https://github.com/powerhome/playbook-swift/compare/6.4.1...6.5.0)



# 🚀 Playbook Swift 6.4.0: Enhanced Buttons, Truncations, and Dynamic Typeahead! 🚀
##### Oct 18, 2024
![image](https://github.com/user-attachments/assets/875ae784-bb68-47e1-ae67-3d25e90f427e)

The latest release, Playbook Swift 6.4.0, brings new enhancements focused on flexibility, user experience, and seamless integrations. Key highlights include the new **Destructive Button**, adjustments to **Typeahead** for height and list display, and improved truncation in the User Kit for a cleaner, more responsive UI.

[6.4.0](https://github.com/powerhome/playbook-swift/tree/6.4.0) full list of changes:

### Playbook Changes

#### Kit Enhancements
- **Destructive Button**: A new button style designed for critical actions. (#457)
- **Height Adjusted Dropdown**: Improved dropdown to better fit varied content heights. (#450)
- **User Kit Truncation**: Tighter, more dynamic user name displays. (#458)
- **Add Props to PBMessage**: Additional properties to further customize PBMessage. (#456)
- **Typeahead Enhancements**:
  - **Show No Option**: Now includes messaging when no options are available. (#455)
  - **Section List**: Categorized options for a more organized typeahead. (#459)
  - **Initial Value Support**: Set a starting value in PBSwift Typeahead.
  - **Truncated User Name Support**: Cleaner user name display in User Kit.

#### Bug Fixes
- **Message Component Cursor Fix**: Improved cursor behavior for smooth typing experiences. (#454)

### Documentation Updates
- **Typeahead Enhancements**: Documented updates for scrollable lists, dropdown height adjustments, conversation name display, and improved conversation management options.

### Connect-Specific
- **Conditional Popover Handler**: Fixed the “Close” button issue with a new conditional handler. (#565)

🔗 **Full Changelog**: https://github.com/powerhome/playbook-swift/compare/6.3.1...6.4.0



# ✨ Dynamic Status Indicators & Interactive Messaging! ✨
##### Sept 20, 2024
![image](https://github.com/user-attachments/assets/84b6e16c-9fa4-45ba-b00f-6ffa223dbbb4)

We’re excited to introduce Playbook Swift 6.3.0, featuring two key updates: a customizable PBAvatar status indicator size and new interactivity for the message kit, delivering more responsive, intuitive user experiences. Here’s what’s new:

[6.3.0](https://github.com/powerhome/playbook-swift/tree/6.3.0) full list of changes:

**Kit Enhancements**
- **PBAvatar Status Indicator Size**: Adjust and style status indicators with more control for a sharper, polished look. #525
- **Handle Click on Message Kit**: Respond to user interactions seamlessly, elevating message engagement. #526
- **Dark Mode Reaction Button Improvements**: Enhanced visibility with border and button refinements for Dark Mode. #508, #528

### Bug Fix
- **Online Status Color**: Ensuring accurate color representation for improved visual clarity. #566
  

🔗 **Full Changelog**: https://github.com/powerhome/playbook-swift/compare/6.2.0...6.3.0

# ✨ Enhance, Customize, and Expand! ✨
##### Aug 28, 2024

![Image](https://github.com/user-attachments/assets/5af10f97-fee0-4574-9adc-b50111fad45b)

We're thrilled to introduce version 6.2.0, packed with enhancements to elevate your design experience. This release brings improved color options for progress components, a new variant for the progress tracker, and full-width navigation, all designed to boost visual consistency and maximize screen space. We can’t wait for you to explore all the great updates in this release.

[6.2.0](https://github.com/powerhome/playbook-swift/tree/6.2.0) full list of changes:

**Kit Enhancement:**
- Progress Simple Colors [#458](https://github.com/powerhome/playbook-swift/pull/428) [(Rachel Radford)](https://github.com/RachelRadford21)
- Multiple User Bubble Sizes [#466](https://github.com/powerhome/playbook-swift/pull/433) [(Rachel Radford)](https://github.com/RachelRadford21)
- Progress Tracker Variant [#455](https://github.com/powerhome/playbook-swift/pull/418) [(Rachel Radford)](https://github.com/RachelRadford21)
- Full Width Nav [#469](https://github.com/powerhome/playbook-swift/pull/435) [(Rachel Radford)](https://github.com/RachelRadford21)
- Multi User Dark Mode [#481](https://github.com/powerhome/playbook-swift/pull/437) [(Rachel Radford)](https://github.com/RachelRadford21)
- Fix Typeahead on Connect [#317](https://runway.powerhrg.com/backlog_items/PBIOS-317) [(Isis)](https://github.com/isismsilva)

**Fixed Bugs:**
- Dark Mode Card Fix [#430](https://github.com/powerhome/playbook-swift/pull/426) [(Rachel Radford)](https://github.com/RachelRadford21)
- Dialog Cursor macOS [#474](https://github.com/powerhome/playbook-swift/pull/434) [(Rachel Radford)](https://github.com/RachelRadford21)
- Dark Mode Status Avatar Fix [#476](https://github.com/powerhome/playbook-swift/pull/436) [(Rachel Radford)](https://github.com/RachelRadford21)
- Dark Mode Checkbox Outline Fix [#483](https://github.com/powerhome/playbook-swift/pull/438) [(Rachel Radford)](https://github.com/RachelRadford21)
- Warning Color Validation [#477](https://github.com/powerhome/playbook-swift/pull/439) [(Rachel Radford)](https://github.com/RachelRadford21)
- Dark Mode Button Fix [#427](https://github.com/powerhome/playbook-swift/pull/440) [(Rachel Radford)](https://github.com/RachelRadford21)

**New Kits:**
- Online Status Kit [#468](https://github.com/powerhome/playbook-swift/pull/422) [(Rachel Radford)](https://github.com/RachelRadford21)

🔗 Full Changelog: [6.1.0 to 6.2.0](https://github.com/powerhome/playbook-swift/compare/6.1.0...6.2.0)



# Spot Everyone at a Glance: Meet the New Multiple Users Component
##### August 26, 2024
 
![Image](https://github.com/user-attachments/assets/97773730-cccf-44f9-b2f1-0f047eeee171)


We've added a fresh option to our Multiple Users component with the new bubble variant. This update showcases full user avatars in a sleek, Apple-inspired grid layout, enhancing recognition and clarity. It's a versatile addition to your toolkit, offering a refined way to display multiple users.

[6.1.0](https://github.com/powerhome/playbook-swift/tree/6.1.0) full list of changes:

**Enhancements:** 
- Progress Simple Width [#457](https://github.com/powerhome/playbook-swift/pull/457) ([Rachel Radford](https://github.com/RachelRadford21))
- Section Separator Color [#437](https://github.com/powerhome/playbook-swift/pull/437) ([Rachel Radford](https://github.com/RachelRadford21)) 

**Improvements:**
- Update Multi User Indicator [#446](https://github.com/powerhome/playbook-swift/pull/446) ([Rachel Radford](https://github.com/RachelRadford21))

**Fixed Bugs:**
- macOS Dialog Sizes [#473](https://github.com/powerhome/playbook-swift/pull/473) ([Rachel Radford](https://github.com/RachelRadford21))
- Dark mode color exception handling [#432](https://github.com/powerhome/playbook-swift/pull/432) ([Isis Silva](https://github.com/isismsilva)) 
- Fix typeahead rendering position for iOS [#436](https://github.com/powerhome/playbook-swift/pull/436) ([Isis Silva](https://github.com/isismsilva)) 
- Fixed Confirmation Toast Children Fix [#472](https://github.com/powerhome/playbook-swift/pull/472) ([Rachel Radford](https://github.com/RachelRadford21))
 - Typeahead manager fix [#467](https://github.com/powerhome/playbook-swift/pull/467) ([Isis Silva](https://github.com/isismsilva))

**New Kits:**
- Progress Simple Kit [#456](https://github.com/powerhome/playbook-swift/pull/456) ([Rachel Radford](https://github.com/RachelRadford21)) 
- Progress Step Kit [#453](https://github.com/powerhome/playbook-swift/pull/453) ([Rachel Radford](https://github.com/RachelRadford21))
- Multiple Users Small Bubble Variant [#448](https://github.com/powerhome/playbook-swift/pull/448) ([Rachel Radford](https://github.com/RachelRadford21))

[Full Changelog](https://github.com/powerhome/playbook-swift/compare/6.0.2...6.1.0)


# 6.0.2
##### July 17, 2024

**Improvements:**

- Update Neutral Color [#461](https://github.com/powerhome/playbook-swift/pull/461) ([Rachel Radford](https://github.com/RachelRadford21))
- Fix user kit name fonts [#460](https://github.com/powerhome/playbook-swift/pull/460) ([Isis Silva](https://github.com/isismsilva))
- Fixed Confirmation Icon [#443](https://github.com/powerhome/playbook-swift/pull/443) ([Rachel Radford](https://github.com/RachelRadford21))

[Full Changelog](https://github.com/powerhome/playbook-swift/compare/6.0.1...6.0.2)

# 6.0.1
##### June 28, 2024

**New Features:**

- macOS Dialog Kit Catalog Fix [#444](https://github.com/powerhome/playbook-swift/pull/444) ([Rachel Radford](https://github.com/RachelRadford21))
- Update Runway comment endpoint [#447](https://github.com/powerhome/playbook-swift/pull/447) ([Stephen Greer](https://github.com/stephenagreer))

[Full Changelog](https://github.com/powerhome/playbook-swift/compare/6.0.0...6.0.1)


# 6.0.0
##### June 21, 2024

**New Features:**

- Selectable Card Input Variant [#383](https://github.com/powerhome/playbook-swift/pull/383) ([Rachel Radford](https://github.com/RachelRadford21))
- Expose button variants on dialog kit [#395](https://github.com/powerhome/playbook-swift/pull/395) ([Isis Silva](https://github.com/isismsilva))
- Label Pill Kit [#400](https://github.com/powerhome/playbook-swift/pull/400) ([Rachel Radford](https://github.com/RachelRadford21))
- Progress Pill Kit [#401](https://github.com/powerhome/playbook-swift/pull/401) ([Rachel Radford](https://github.com/RachelRadford21))

**Improvements & Fixes:**

- Removes Unnecessary Print Statements [#399](https://github.com/powerhome/playbook-swift/pull/399) ([Rachel Radford](https://github.com/RachelRadford21))
- User Kit Spacing Fix [#402](https://github.com/powerhome/playbook-swift/pull/402) ([Rachel Radford](https://github.com/RachelRadford21))
- Pill Kit Color Validation [#404](https://github.com/powerhome/playbook-swift/pull/404) ([Rachel Radford](https://github.com/RachelRadford21))
- Typeahead validation [#403](https://github.com/powerhome/playbook-swift/pull/403) ([Isis Silva](https://github.com/isismsilva))
- Add swift fonts package to power-fonts [#394](https://github.com/powerhome/playbook-swift/pull/394) ([Isis Silva](https://github.com/isismsilva))

**Documentation Updates:**
- User Docs [#391](https://github.com/powerhome/playbook-swift/pull/391) ([Rachel Radford](https://github.com/RachelRadford21))

[Full Changelog](https://github.com/powerhome/playbook-swift/compare/5.1.0...6.0.0)
