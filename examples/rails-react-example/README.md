# Rails React Stack

Rails gives us many options when it comes to configuring the frontend of our application, and if you wish you use React as the frontend, [react-rails](https://github.com/reactjs/react-rails) is the easiest way to go about it. This example project has been spun up using react-rails with Rails 7 and the following documentation will outline how you can integrate Playbook into such an app.

## Getting Started

First create a new rails app by using the following command:

```
rails new my-app

```

## Add React-Rails  to your Gemfile:
```
gem 'react-rails'
```

## Run the Installers: 

```
$ bundle install
$ rails webpacker:install         
$ rails webpacker:install:react   
$ rails generate react:install
```

If  *rails webpacker:install*  throws an error, you may have to add  *gem ‘webpacker’* to your Gemfile and run *bundle install*.

You App should now include:

* *app/javascript/components/* directory for your React components
*  [ReactRailsUJS](https://github.com/reactjs/react-rails#ujs)  setup in *app/javascript/packs/application.js*
* *app/javascript/packs/server_rendering.js* for  server-side rendering [server-side rendering](https://github.com/reactjs/react-rails#server-side-rendering)

## Create Your First Component:
Within the javascript/components folder, create a new file called HelloWorld.jsx.

Write React code within it. To display this file in the  Rails view, first generate a rails controller and View. You can use the following command:

```
bin/rails generate controller Pages index
```

In the newly created views/pages/index.html.erb file, paste the following to see your react component:

```
<%= react_component("HelloWorld") %>
```

Make sure the route in your routes.rb file is correct:

```
  get 'pages', to: 'pages#index'

```
Also add the following to the head of your views/layouts/application.html.erb file. 

```
<%= javascript_pack_tag 'application' %>

```

Start your servers using ``` bin/rails s``` and navigate to http://localhost:3000/pages to see your react component rendered on the screen!

## Add Playbook to your App

To add Playbook to yuor newly created app, you must install the Playbook NPM package.

```
yarn add "playbook-ui"
```
After installation is complete, import Playbook styles into your top level app component. For the purposes of this example, we will import into HelloWorld.jsx

```
import 'playbook-ui/dist/playbook.css';
```

### Install Fontawesome:

Our Icon kits make use of fontawesome. To install fontawesome free, follow the instructions on the [fontawesome website](https://fontawesome.com/v6/docs/web/use-with/react/). Commands to run:

```
yarn add @fortawesome/fontawesome-free
```

Include fontawesome CSS import to your top level app component (in this example, the HelloWorld.jsx file)

```
import '@fortawesome/fontawesome-free/css/all.css';
```

Free Users: currently only Free Regular is supported in our icon component structure. To gain access to Solid, etc Icons, you can use the Pro version of fontawesome. To set it up follow the instructions [here](https://fontawesome.com/v6/docs/web/setup/packages#set-up-npm-token-for-a-specific-project).


