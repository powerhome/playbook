//
//  PBSelect.swift
//  
//
//  Created by Everton Cunha on 14/06/22.
//

import SwiftUI

public struct PBSelect: ButtonStyle {
  
  let title: String
  
  let style: PBCardStyle
  
  public init(_ title: String, style: PBCardStyle) {
    self.title = title
    self.style = style
  }
  
  public func makeBody(configuration: Configuration) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      if let title = title {
        Text(title)
          .pbFont(.caption, color: .pbTextLight)
      }
      PBCard(padding: 0, style: style) {
        HStack {
          configuration.label
            .frame(height: 44)
            .pbFont(.body)
          Spacer()
          PBIcon.fontAwesome(.chevronDown)
            .foregroundColor(.pbTextDefault)
        }
        .padding(.horizontal, .pbSmall)
      }
    }
  }
}

struct PBSelect_Previews: PreviewProvider {
  static var previews: some View {
    registerFonts()
    return Group {
      Button("Burguers") {
        
      }
      .buttonStyle(PBSelect("FAVORITE FOOD", style: .default))
      .preferredColorScheme(.light)
      .padding(24)
    }
  }
}
