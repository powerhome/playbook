//
//  Font+Register.swift
//  
//
//  Created by Lucas C. Feijo on 14/07/21.
//

import SwiftUI

/// This helper must be called in the root of the application
/// code, for example in `applicationDidFinishLaunching`.
public func registerFonts() {

    // Fonts
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Black", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-BlackIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Bold", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-BoldIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Extrabld", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-ExtrabldIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Light", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-LightIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Regular", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-RegularIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Semibold", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-SemiboldIt", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-Thin", fontExtension: "otf")
    _ = registerFont(bundle: .module, fontName: "ProximaNova-ThinIt", fontExtension: "otf")

    // Icons
    _ = registerFont(bundle: .module, fontName: "Font Awesome 5 Pro-Regular-400", fontExtension: "ttf")
    _ = registerFont(bundle: .module, fontName: "Fontastic", fontExtension: "ttf")
}

private func registerFont(bundle: Bundle, fontName: String, fontExtension: String) -> Bool {

    guard let fontURL = bundle.url(forResource: fontName, withExtension: fontExtension) else {
        fatalError("Couldn't find font \(fontName)")
    }

    guard let fontDataProvider = CGDataProvider(url: fontURL as CFURL) else {
        fatalError("Couldn't load data from the font \(fontName)")
    }

    guard let font = CGFont(fontDataProvider) else {
        fatalError("Couldn't create font from data")
    }

    var error: Unmanaged<CFError>?
    let success = CTFontManagerRegisterGraphicsFont(font, &error)
    guard success else {
        print("Error registering font: maybe it was already registered.")
        return false
    }

    return true
}

/// This helps debug which fonts have successfully been copied to the bundle.
public func printRegisteredFonts() {
    #if os(iOS)
    let fontFamilies = UIFont.familyNames.sorted()
    for family in fontFamilies {
        print(family)
        for font in UIFont.fontNames(forFamilyName: family).sorted() {
            print("\t\(font)")
        }
    }
    #elseif os(macOS)
    let fontFamilies = NSFontManager.shared.availableFontFamilies.sorted()
    for family in fontFamilies {
        print(family)
        let familyFonts = NSFontManager.shared.availableMembers(ofFontFamily: family)
        if let fonts = familyFonts {
            for font in fonts {
                print("\t\(font)")
            }
        }
    }
    #endif
}
