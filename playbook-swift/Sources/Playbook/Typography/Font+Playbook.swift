//
//  Fonts.swift
//  
//
//  Created by Lucas C. Feijo on 14/07/21.
//

import SwiftUI

public extension Font {
  /** ProximaNova.light, size: 16 */
  static let pbBody = PBTextStyle.body.font
  /** ProximaNova.bold size: 16 */
  static let pbTitle4 = PBTextStyle.title4.font
}

public enum PBTextStyle {
    case title1
    case title2
    case title3
    case title4
    case body
    case buttonText
    case largeCaption
    case caption
    case subcaption

    var font: Font {
        switch self {
        case .title1:       return Font.custom(ProximaNova.light.rawValue, size: 48, relativeTo: .largeTitle)
        case .title2:       return Font.custom(ProximaNova.light.rawValue, size: 34, relativeTo: .title)
        case .title3:       return Font.custom(ProximaNova.light.rawValue, size: 28, relativeTo: .title2)
        case .title4:       return Font.custom(ProximaNova.bold.rawValue, size: 16, relativeTo: .title3)
        case .body:         return Font.custom(ProximaNova.light.rawValue, size: 16, relativeTo: .body)
        case .buttonText:   return Font.custom(ProximaNova.bold.rawValue, size: 14, relativeTo: .body)
        case .largeCaption: return Font.custom(ProximaNova.regular.rawValue, size: 20, relativeTo: .caption)
        case .caption:      return Font.custom(ProximaNova.semibold.rawValue, size: 12, relativeTo: .caption2)
        case .subcaption:   return Font.custom(ProximaNova.regular.rawValue, size: 12, relativeTo: .caption2)
        }
    }
}

extension Font {
  
  public static func pb(_ style: PBTextStyle) -> Font {
    return style.font
  }
}
