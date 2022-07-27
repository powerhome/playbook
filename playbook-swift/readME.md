# Playbook

SwiftUI version of [https://playbook.powerapp.cloud/](Playbook) components.


##Running the package to be able to make edits and see previews:

1. Make sure you have the Playbook repo (clone it if you do not).
2. To open the package in Xcode, there are 2 ways to go about this. EITHER:
    1) Go to the playbook-swift directory in terminal and type:  xed .
    or 
    2) Drag the playbook-swift to the Xcode icon

3. Right click (or ctrl click) on "Package Dependencies" on file navigation area (left side). 
    Click "resolve package versions"
4. Build the package (command b). 
    
    IF build fails:
        go to the top left: Xcode -> Preferences -> click the tiny arrow next to /Xcode/DerivedData ->
        completely delete DerivedData folder. Then go back to step 3 (resolve package versions).
    
5. Once build is successful, to see previews, be sure that the build target is on an iPhone:
    - To the left of "Build Succeeded" at the top of the window, there may be 
        Playbook->My Mac.   My Mac is the default, so click it and choose an iPhone of your choice.
        (You can always change this later). 
