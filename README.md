# Playbook Design System

Playbook is the first design system built for both Rails & React interfaces. Inspired by [Velocity](https://www.invisionapp.com/inside-design/design-resources/design-system-dashboard-ui-kit/), Playbook takes a modern design approach, and applies it in a way that makes it easy to support bleeding edge, or legacy systems. Playbook is built & maintained by the User Experience & Development teams at Power Home Remodeling, the largest home remodeler in the US.

## Requirements

- Docker 17.09 or later
- Docker Compose 1.17.1 or later

## Getting started

1. Run `make install`
1. Run `make start`
1. Install overcommit hooks `bin/overcommit`
1. open [http://localhost:8089](http://localhost:8089)

To clean up this project from your local machine, run `make stop`, which will drop all containers and networks associated with this project. To purge all resources, do `make clean`, which also removes images and volumes for a blank slate.


<details><summary>Making changes to the Gemfile:</summary>
<p>

* Stop the `make start` process
* Run `make bundle` to (un-)install gems and update the `Gemfile.lock`
* Re-start the server with `make start`

To run the tests, do `bin/test`. To launch a shell in the container run `make shell`, or to launch a Rails console run `make console`

</p>
</details>

## Additional resources

### Upgrading between versions

See [docs/upgrade-guide](./docs/upgrade-guide)

### Nitro & Releases

* [Integrating Playbook Kits into Nitro Components](https://github.com/powerhome/playbook/wiki/Integrating-Playbook-Kits-into-Nitro-Components)
* [Creating Releases](https://github.com/powerhome/playbook/wiki/Releasing-a-New-Version)

### Development Environment

* [Common Errors & Solutions](https://github.com/powerhome/playbook/wiki/Common-Errors-&-Solutions)

### Building Playbook Kits

* [Generating a Kit](https://github.com/powerhome/playbook/wiki/Generating-a-Kit)
* [Rails Kit](https://github.com/powerhome/playbook/wiki/Rails-Kit)
* [Rails Kit Helpers](https://github.com/powerhome/playbook/wiki/Rails-Kit-Helpers)
* [Using a Kit within a Kit](https://github.com/powerhome/playbook/wiki/Using-a-Kit-within-a-Kit)
* [Understanding Rails Kit HTML Wrapper](https://github.com/powerhome/playbook/wiki/Understanding-Rails-Kit-HTML-Wrapper)
* [Kit Stylesheet](https://github.com/powerhome/playbook/wiki/Kit-Stylesheet)

### Testing Playbook Kits Locally

#### Testing React Kits locally
1.  Inside of your Playbook repository, run `yarn link`. 
2.  Inside of the directory you want to test with playbook, run `yarn link playbook-ui`.
3.  Run `yarn hmr` in your directory you want to test with playbook, and hard refresh (command + shift + R) your browser.
4.  Test all the things!
5.  When finished, inside of the directory you want to test with playbook, run `yarn unlink playbook-ui`.
6.  Inside of your Playbook repository, run `yarn unlink`. 

Keep in mind: Styles are brought in from playbook through the rails gem, so you will not be able to test scss updates with yarn linking.