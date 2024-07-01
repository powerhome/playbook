import { Controller } from "@hotwired/stimulus"

// Connects with data-controller="hello"
export default class extends Controller {
  static targets = ["name", "output"]

  greet() {
    this.outputTarget.innerHTML = `Hello, ${this.nameTarget.value}!`
  }
}
