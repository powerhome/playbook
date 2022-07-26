//
//  Font+ProximaNova.swift
//  
//
//  Created by Lucas C. Feijo on 14/07/21.
//

import SwiftUI

public enum ProximaNova: String {
    case black = "ProximaNova-Black"
    case blackit = "ProximaNova-BlackIt"
    case bold = "ProximaNova-Bold"
    case boldit = "ProximaNova-BoldIt"
    case extrabold = "ProximaNova-Extrabld"
    case extraboldit = "ProximaNova-ExtrabldIt"
    case light = "ProximaNova-Light"
    case lightit = "ProximaNova-LightIt"
    case regular = "ProximaNova-Regular"
    case regularit = "ProximaNova-RegularIt"
    case semibold = "ProximaNova-Semibold"
    case semiboldit = "ProximaNova-SemiboldIt"
    case thin = "ProximaNova-Thin"
    case thinit = "ProximaNova-ThinIt"
}

extension Font {
    /// To use ProximaNova fonts directly with a custom size (i.e. Avatar kit)
    public static func proximaNova(family: ProximaNova, size: CGFloat) -> Font {
        return Font.custom(family.rawValue, size: size)
    }
}
