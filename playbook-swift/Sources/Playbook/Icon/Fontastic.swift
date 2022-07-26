//
//  Fontastic.swift
//  
//
//  Created by Alexandre da Silva on 18/01/22.
//

import SwiftUI

public enum Fontastic: String, PlaybookGenericIcon, CaseIterable {
    case smilePlus = "smile-plus"

    public var unicodeString: String {
        switch self {
        case .smilePlus: return "\u{0072}"
        }
    }

    public var fontFamily: String {
        "untitled-font-1"
    }
}

extension PBIcon {
    public static func fontastic(_ icon: Fontastic, size: Size = .medium) -> PBIcon {
        PBIcon(icon, size: size)
    }
}
