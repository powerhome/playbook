//
//  PBCardTests.swift
//  
//
//  Created by Alexandre Hauber on 28/07/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBCardTests: XCTestCase {

    // MARK: Default tests
//    func test_default_card() throws {
//        let card = PBCard { Text("test") }
//        let modifier = card.modifier(self)
//        let content = modifier.content
//        let vStack = try card.inspect().vStack()
//
//        let padding = content.padding
//        let border = content.border
//        let borderRadius = content.borderRadius
//        let shadow = content.shadow
//        let selected = content.selected
//
//        let text = try vStack.text(0).string()
//
//        XCTAssertTrue(padding.isEqual(to: .pbMedium))
//        XCTAssertEqual(border, true)
//        XCTAssertEqual(borderRadius, PBCard.BorderRadius.medium)
//        XCTAssertEqual(borderRadius.rawValue, CGFloat(6))
//        XCTAssertEqual(shadow, PBCard.Shadow.none)
//        XCTAssertFalse(selected)
//        XCTAssertEqual(text, "test")
//    }
    //

    // MARK: Highlight tests
    func test_card_highlight_colors() throws {
        let cardAllowedColor = PBCard(highlightColor: .pbWindows) { Text("test right color") }
        let cardWrongColor = PBCard(highlightColor: .pbActive) { Text("test wrong color") }

        let modifierAllowed = cardAllowedColor.modifier(self)
        let colorAllowed = modifierAllowed.content.highlightColor

        let modifierWrong = cardWrongColor.modifier(self)
        let colorWrong = modifierWrong.content.highlightColor

        let vStackAllowed = try cardAllowedColor.inspect().vStack()
        let textAllowed = try vStackAllowed.text(0).string()

        let vStackWrong = try cardWrongColor.inspect().vStack()
        let textWrong = try vStackWrong.text(0).string()

        XCTAssertEqual(colorAllowed, .pbWindows)
        XCTAssertEqual(colorWrong, .white)
        XCTAssertEqual(textAllowed, "test right color")
        XCTAssertEqual(textWrong, "test wrong color")
    }
    //

    // MARK: Header tests

    //

    // MARK: Selected tests
//    func test_selected_card() throws {
//        let card = PBCard(selected: true) {
//            Text("test")
//        }
//        let vStack = try card.inspect().vStack()
//
//        let selected = card.modifier(self).content.selected
//        let text = try vStack.text(0).string()
//
//        XCTAssertTrue(selected)
//        XCTAssertEqual(text, "test")
//    }
    //

    // MARK: Padding tests
    func test_padding_card() throws {
        let card = PBCard(padding: .pbSmall) {
            Text("test")
        }
        let vStack = try card.inspect().vStack()

        let padding = card.modifier(self).content.padding
        let text = try vStack.text(0).string()

        XCTAssertEqual(padding, .pbSmall)
        XCTAssertEqual(padding, CGFloat(16))
        XCTAssertEqual(text, "test")
    }
    //

    // MARK: Padding tests
    func test_card_with_shadows() throws {
        let card = PBCard(shadow: .deep) {
            Text("test")
        }
        let vStack = try card.inspect().vStack()

        let shadow = card.modifier(self).content.shadow
        let text = try vStack.text(0).string()

        XCTAssertEqual(shadow, PBCard.Shadow.deep)
        XCTAssertEqual(text, "test")
    }
    //
}

extension PBCard: Inspectable {}
extension PBCardHeader: Inspectable {}
extension Spacer: Inspectable {}
