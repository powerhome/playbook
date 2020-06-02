export { default as AvatarActionButtonDefault } from './_avatar_action_button_default.jsx'
export { default as AvatarActionButtonPlacement } from './_avatar_action_button_placement.jsx'
export { default as AvatarActionButtonActions } from './_avatar_action_button_actions.jsx'
export { default as AvatarActionButtonOnClick } from './_avatar_action_button_on_click.jsx'

if (document.querySelector('#clickable')) {
  document.querySelector('#clickable').addEventListener('click', () => alert('clickable clicked!'))
}
