![select-default](https://github.com/powerhome/playbook/assets/54749071/ead0e074-46ae-425a-ab32-d9c4418a0783)


```swift
let defaultOptions = [
    (value: "1", text: "Burgers"),
    (value: "2", text: "Pizza"),
    (value: "3", text: "Tacos")
  ]
@State private var defaultState = ""

 PBSelect(title: "Favorite Food", options: defaultOptions, style: .default) { selected in
            defaultState = selected
          }
```
