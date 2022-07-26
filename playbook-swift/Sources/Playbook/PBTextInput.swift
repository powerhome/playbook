//
//  PBTextInput.swift
//  
//
//  Created by Everton Cunha on 04/03/22.
//

import SwiftUI

public struct PBTextInputStyle: TextFieldStyle {

  public let title: String?

  public let style: PBCardStyle

  public init(_ title: String? = nil, style: PBCardStyle = .default) {
    self.title = title
    self.style = style
  }

  public func _body(configuration: TextField<Self._Label>) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      if let title = title {
        Text(title)
          .pbFont(.title4, color: .pbTextLight)
      }
      PBCard(padding: 0, style: style) {
        configuration
          .padding(.leading, 16)
          .frame(height: 44)
          .foregroundColor(.pbTextDefault)
          .pbFont(.body)
          .textFieldStyle(PlainTextFieldStyle())
      }
    }
  }
}

// MARK: -

struct PBTextInput_Previews: PreviewProvider {
    static var previews: some View {
      VStack {
        TextField("", text: .constant("text"))
          .textFieldStyle(PBTextInputStyle("default"))
        TextField("", text: .constant("text"))
          .textFieldStyle(PBTextInputStyle("selected", style: .selected))
        TextField("", text: .constant("text"))
          .textFieldStyle(PBTextInputStyle("error", style: .error))
      }
      .padding(24)
    }
}
