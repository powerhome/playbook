//
//  Color.swift
//  
//
//  Created by Lucas C. Feijo on 12/07/21.
//

import SwiftUI

public extension Color {

    // MARK: RGB Colors
    static let pbGreen           = Color("Green", bundle: .module)
    static let pbPurple          = Color("Purple", bundle: .module)
    static let pbRed             = Color("Red", bundle: .module)
    static let pbRoyal           = Color("Royal", bundle: .module)
    static let pbTeal            = Color("Teal", bundle: .module)
    static let pbYellow          = Color("Yellow", bundle: .module)

    // MARK: Text Colors
    static let pbTextDefault     = Color("TextDefault", bundle: .module)
    /** light: #687887  dark: #FFFFFF 0.6 */
    static let pbTextLight       = Color("TextLight", bundle: .module)
    static let pbTextLighter     = Color("TextLighter", bundle: .module)

    // MARK: Backgrounds
    static let pbBackground      = Color("Background", bundle: .module)
    /** light: #F3F7FB  dark: #0A0527 */
    static let pbBackgroundLight = Color("BackgroundLight", bundle: .module)
    static let pbNavigationPrimary = Color("NavigationPrimary", bundle: .module)
    static let pbNavigationSecondary = Color("NavigationSecondary", bundle: .module)

    // MARK: Cards
    static let pbCard            = Color("Card", bundle: .module)

    // MARK: Status
    static let pbSuccess         = Color("Green", bundle: .module)
    static let pbWarning         = Color("Yellow", bundle: .module)
    /** Status Error light: #FF2229  dark: #FF2229 */
    static let pbError           = Color("Red", bundle: .module)
    static let pbInfo            = Color("Teal", bundle: .module)
    static let pbNeutral         = Color("Neutral", bundle: .module)

    // MARK: Actions
    /** light: #0056CF  dark: #0055CF */
    static let pbPrimary         = Color("Royal", bundle: .module)
    static let pbSecondary       = Color("Yellow", bundle: .module)
    static let pbTertiary        = Color("Purple", bundle: .module)
    /** light: #0056cf  dark: #0082ff */
    static let pbPrimaryAction   = Color("PrimaryAction", bundle: .module)

    // MARK: Mentions
    static let pbMention         = Color("Mention", bundle: .module)
    static let pbMentionMe       = Color("MentionMe", bundle: .module)
    static let pbMentionText     = Color("MentionText", bundle: .module)

    // MARK: Active
    static let pbActive          = Color("Active", bundle: .module)

    // MARK: Border
    /** light: #E4E8F0   dark #E3E8EF 23% : */
    static let pbBorder          = Color("Border", bundle: .module)

    // MARK: Shadow
    static let pbShadow          = Color("Shadow", bundle: .module)
    static let pbHover           = Color("Hover", bundle: .module)

    // MARK: Product Colors
    static let pbWindows         = Color("Royal", bundle: .module)
    static let pbSiding          = Color("Yellow", bundle: .module)
    static let pbDoors           = Color("Teal", bundle: .module)
    static let pbSolar           = Color("Green", bundle: .module)
    static let pbRoofing         = Color("Slate", bundle: .module)
    static let pbGutters         = Color("Purple", bundle: .module)
    static let pbAtticInsulation = Color("Red", bundle: .module)

    // MARK: Category Colors
    static let pbCategoryOne       = Color("Royal", bundle: .module)
    static let pbCategoryTwo       = Color("Category2", bundle: .module)
    static let pbCategoryThree     = Color("Yellow", bundle: .module)
    static let pbCategoryFour      = Color("Category4", bundle: .module)
    static let pbCategoryFive      = Color("Category5", bundle: .module)
    static let pbCategorySix       = Color("Category6", bundle: .module)
    static let pbCategorySeven     = Color("Category7", bundle: .module)
    static let pbCategoryEight     = Color("Category8", bundle: .module)
    static let pbCategoryNine      = Color("Category9", bundle: .module)
    static let pbCategoryTen       = Color("Category10", bundle: .module)
    static let pbCategoryEleven    = Color("Red", bundle: .module)
    static let pbCategoryTwelve    = Color("Category12", bundle: .module)
    static let pbCategoryThirteen  = Color("Category13", bundle: .module)
    static let pbCategoryTFourteen = Color("Category14", bundle: .module)
    static let pbCategoryFifteen   = Color("Category15", bundle: .module)
    static let pbCategorySixteen   = Color("Category16", bundle: .module)
    static let pbCategorySeventeen = Color("Category17", bundle: .module)
    static let pbCategoryEighteen  = Color("Category18", bundle: .module)
    static let pbCategoryNineteen  = Color("Category19", bundle: .module)
    static let pbCategoryTwenty    = Color("Category20", bundle: .module)
    static let pbCategoryTwentyOne = Color("Category21", bundle: .module)
}

public extension Color {

    // MARK: Grouped Colors

    static let pbCategoryColors: [Color] = [.pbCategoryOne, .pbCategoryTwo, .pbCategoryThree, .pbCategoryFour, .pbCategoryFive, .pbCategorySix, .pbCategorySeven, .pbCategoryEight, .pbCategoryNine, .pbCategoryTen, .pbCategoryEleven, .pbCategoryTwelve, .pbCategoryThirteen, .pbCategoryTFourteen, .pbCategoryFifteen, .pbCategorySixteen, .pbCategorySeventeen, .pbCategoryEighteen, .pbCategoryNineteen, .pbCategoryTwenty, .pbCategoryTwentyOne]
    static let pbProductColors: [Color]  = [.pbWindows, .pbSiding, .pbDoors, .pbSolar, .pbRoofing, .pbGutters, .pbAtticInsulation]
    static let pbStatusColors: [Color]   = [.pbSuccess, .pbWarning, .pbError, .pbInfo, .pbNeutral]
    static let pbBackgroundColors: [Color]     = [.pbBackground, .pbNavigationPrimary, .pbNavigationSecondary]
    static let pbTextColors: [Color]     = [.pbTextDefault, .pbTextLight, .pbTextLighter]
}

extension Color {

  init(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&int)
    let a, r, g, b: UInt64
    switch hex.count {
    case 3: // RGB (12-bit)
      (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
    case 6: // RGB (24-bit)
      (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
    case 8: // ARGB (32-bit)
      (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
    default:
      (a, r, g, b) = (1, 1, 1, 0)
    }

    self.init(
      .sRGB,
      red: Double(r) / 255,
      green: Double(g) / 255,
      blue: Double(b) / 255,
      opacity: Double(a) / 255
    )
  }

  /// Example: Color(hex: 0x000000, alpha: 0.2)
  init(hex: UInt, alpha: Double = 1) {
    self.init(
      .sRGB,
      red: Double((hex >> 16) & 0xff) / 255,
      green: Double((hex >> 08) & 0xff) / 255,
      blue: Double((hex >> 00) & 0xff) / 255,
      opacity: alpha
    )
  }
}
