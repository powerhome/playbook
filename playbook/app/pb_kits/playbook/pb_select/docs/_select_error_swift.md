![select-error](https://github.com/powerhome/playbook/assets/54749071/c02e365b-c3a1-446b-b9f2-47db11315786)

```swift
let defaultOptions = [
    (value: "1", text: "Burgers"),
    (value: "2", text: "Pizza"),
    (value: "3", text: "Tacos")
  ]
@State private var errorState = ""

 PBSelect(
            title: "Favorite Food",
            options: defaultOptions,
            style: .error("Please make a valid selection")
          ) { selected in
            errorState = selected
          }
```
