# Rails React Stack

Rails gives us many options when it comes to configuring the frontend of our application, and if you wish you use React as the frontend, [react-rails](https://github.com/reactjs/react-rails) is the easiest way to go about it. This example project has been spun up using react-rails with Rails 7 and the following documentation will outline how you can integrate Playbook into such an app.

## Getting Started

Now we can get started installing and running the application. Carefully review each step below then proceed to the next section.

### Dependencies

1. [Install asdf version manager](https://asdf-vm.com/guide/getting-started.html) (Bash & Git instructions)
1. Run `asdf install` to install dependencies
1. Confirm you are running `ruby` version `3.3.0` by running `ruby -v`
1. Confirm you are running `bundler` version `2.3.14` by running `bundle -v`
1. Confirm you are running `yarn` version `1.22.15` by running `yarn -v`
1. Install gem dependencies `bundle`
1. Install yarn dependencies `yarn`

### Run the Application

1. `yarn watch` will take care of any React component changes
1. `bin/rails s` will start the Rails application
1. Navigate to [localhost:3000](http://localhost:3000)

## Creating React UI Components

There are multiple ways to create React UI components in the app. You can choose to make a full React application by continuing to develop from `app/javascript/components/App.tsx` or you could choose to only make individual React components for certain portions of the page.

### React Components Location:

All React components are transpiled by Webpack via the Rails [Webpacker](https://github.com/rails/webpacker) gem which is already setup for you.

With this in place, you should know that any new components you create will need to live inside of `app/javascript/components` and any *packs* you may need to create will need to live inside of `app/javascript/packs`.

Follow this link to learn more about [Webpacker](https://github.com/rails/webpacker).

#### Working with WebpackerReact (webpacker-react)

This library is a simple container for use with Rails which provides a view helper that can allow you to easily add React components to any Rails ERB template (`.html.erb`). If you view `app/views/pages/index.html.erb`, you will see that we were able to render the `app/javascript/components/App.tsx` React component into the `pages#index` view with a simple ERB tag like so:

```erb
<%= react_component("App") %>
```

Follow this link to learn more about [`webpacker-react`](https://github.com/renchap/webpacker-react).

