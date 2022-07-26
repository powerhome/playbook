//
//  PBTextArea.swift
//  
//
//  Created by Everton Cunha on 04/03/22.
//

import SwiftUI

public struct PBTextArea: View {

  var title: String

  @Binding var text: String

  // MARK: -

  public init(_ title: String, text: Binding<String>) {
    self.title = title
    self._text = text
  }

  // MARK: -

  public var body: some View {
    VStack(alignment: .leading, spacing: 4) {
      Text(title)
        .pbFont(.title4, color: .pbTextLight)
      PBCard(padding: 0) {
        TextEditor(text: $text)
          .padding(.top, 4)
          .padding(.horizontal, 12)
          .frame(height: 88)
          .foregroundColor(.pbTextDefault)
          .pbFont(.body)
      }
    }
  }
}

struct PBTextArea_Previews: PreviewProvider {
    static var previews: some View {
      PBTextArea("Title", text: .constant("Text"))
        .padding(16)
        .preferredColorScheme(.light)

      PBTextArea("Title", text: .constant("Text"))
        .padding(16)
        .preferredColorScheme(.dark)
    }
}
