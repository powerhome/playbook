# Playbook for Swift 
### Table of Contents
	* [Folder Structure](bear://x-callback-url/open-note?id=05A5108D-03BF-4652-B3EE-33A2ABC7DF4C-497-0000E555E8E0C1FB&header=Folder%20Structure)
	* [Package Manager](bear://x-callback-url/open-note?id=05A5108D-03BF-4652-B3EE-33A2ABC7DF4C-497-0000E555E8E0C1FB&header=Package%20Manager)
	* [Release Process](bear://x-callback-url/open-note?id=05A5108D-03BF-4652-B3EE-33A2ABC7DF4C-497-0000E555E8E0C1FB&header=Release%20Process)
	* [Extraction Plan](bear://x-callback-url/open-note?id=05A5108D-03BF-4652-B3EE-33A2ABC7DF4C-497-0000E555E8E0C1FB&header=Extraction%20Plan)


---

## Folder Structure
The Playbook repo currently contains the following directories
```
/playbook
/playbook-website
```

We will be following a monorepo approach when it comes to adding Swift UI Playbook Kits to this repo. The example below will be how our future folder structure will look like

```
/playbook
/playbook-website
/playbook-swift
--/Sources/Playbook/
--/Tests/PlaybookTests/
--/package.swift
/playbook-swift-app
```

* **Sources/Playbook/** will be where we store our Playbook Kits & Tokens
* **Tests/PlaybookTests/** will be where we store our visual tests for our kits

---
## Package Manager
We will be using [Swift Package Manager](https://developer.apple.com/documentation/swift_packages) to package up and utilize our library.

We would only need to set up a manifest file in the root directory /playbook-swift

How do we release a test/alpha version?


---
## Release Process
**What is the most ideal release process?**
	1. Create a new version branch 
	2. Clone/build/update kits
	3. Test branch in the demo app also connect
	4. Test docs/playbook site
	5. Playbook Admin merges into master

**Who are the ones set as reviewers on PRs / target teams?**
	- Reviewers can be anyone on the playbook release team as well as the ios Dev team (Rogue One)

**Who releases new versions of Playbook for Swift UI?**
	- The release should only be done by playbook admins

**What level of testing should be done?**
	 - For each swift UI playbook kit we should follow the same process we use for the web:
		 - Ninja Test kits in a demo environment/alpha version
		 - Make sure changes to kits do not break other kits 
		 - Testing should take place in the demo app (if possible) as well as the Connect app
		 - Spec and unit tests should be written for each kit 
		 - Sync with Stephen on kits that need spec coverage to sync the web with swift kits
		 - 

**How will we handle versioning?**
	- We will follow the same semantic version format we use for playbook web
	- The current version of playbook-swift should begin at  0.1.0




Test New Kits on Demo App, what does that look like
Pre/Alpha Releases?

How do we deal with 
New kits
Additions to existing
Changes/Deprecation


---
## Extraction Plan
**Where are the SwiftUI kits currently located?**
	
	- The swift UI kits are currently located in the connect repo. The plan is to extract them from [here into the playbook repo](https://github.com/powerhome/connect-apple/tree/main/Playbook).

**What does the extraction process look like?**

	 - The plan is to turn on/test/change one kit at a time from the existing starting point from Rogue One.

	1. Pick a kit from the connect repo library
	2. Clone kit to the playbook-swift repo
	3. Test kit in playbook-swift demo app if available
	4. Release a new version of the Playbook Swift Package
	5. Pair with iOS dev team Rogue One to import/update the library and remove the cloned kit from their internal library

The Kits hosted on Playbook would not be included in the Connect Repo

These kits are considered beta.
