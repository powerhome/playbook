//
//  PBCheckbox.swift
//  
//
//  Created by Everton Cunha on 15/06/22.
//

import SwiftUI

public struct PBCheckboxButtonStyle: ButtonStyle {
  
  let isSelected: Bool
  
  // MARK: - Computed properties
  
  private var borderColor: Color {
    isSelected ? Color.pbPrimary : Color.pbBorder
  }
  
  var backgroundColor: Color {
    isSelected ? Color.pbPrimary : Color.clear
  }
  
  // MARK: -
  
  public init(isSelected: Bool) {
    
    self.isSelected = isSelected
  }
  
  // MARK: -
  
  public func makeBody(configuration: Configuration) -> some View {
    HStack(alignment: .top) {
      
      ZStack {
        RoundedRectangle(cornerRadius: 4)
          .strokeBorder(borderColor, lineWidth: 2)
          .background(backgroundColor)
          .clipShape(RoundedRectangle(cornerRadius: 4))
          .frame(width: 22, height: 22)
        PBIcon.fontAwesome(.check, size: .small)
          .foregroundColor(Color.white)
      }// :ZSTACK
      
      VStack(alignment: .leading, spacing: 4) {
        configuration.label
          .foregroundColor(.pbTextDefault)
          .pbFont(.body)
          .frame(minHeight: 22)
      }// : VSTACK
    }// : HSTACK
    .frame(minWidth: 44, minHeight: 44)
    .contentShape(Rectangle())
  }
}

struct PBCheckbox_Previews: PreviewProvider {
  static var previews: some View {
    registerFonts()
    return VStack {
      
      Button("Checkbox example") {
        
      }
      .buttonStyle(PBCheckboxButtonStyle(isSelected: false))
      
      Button("Marked example") {
        
      }
      .buttonStyle(PBCheckboxButtonStyle(isSelected: true))
    }.preferredColorScheme(.light)
  }
}
