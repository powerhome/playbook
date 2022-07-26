//
//  File.swift
//  
//
//  Created by Lucas C. Feijo on 04/08/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBNavTests: XCTestCase {

    func testNavHasItems() throws {
        let sut = PBNav {
            PBNavItem("Option 1")
            PBNavItem("Option 2")
            PBNavItem("Option 3")
        }
        let items = try sut.inspect().findAll(PBNavItem.self)
        XCTAssertEqual(items.count, 3)
    }

    func testNavRendersVertical() throws {
        let sut = PBNav(orientation: .vertical) {
            PBNavItem("Option 1")
            PBNavItem("Option 2")
            PBNavItem("Option 3")
        }
        XCTAssertNotNil(try sut.inspect().find(viewWithTag: "vertical"))
    }

    func testNavRendersHorizontal() throws {
        let sut = PBNav(orientation: .horizontal) {
            PBNavItem("Option 1")
            PBNavItem("Option 2")
            PBNavItem("Option 3")
        }
        XCTAssertNotNil(try sut.inspect().find(viewWithTag: "horizontal"))
    }

    func testNavRendersBorders() throws {
        let sut = PBNav(borders: true) {
            PBNavItem("Option 1")
            PBNavItem("Option 2")
            PBNavItem("Option 3")
        }
        let borders = try sut.inspect().findAll(Divider.self)
        XCTAssertEqual(borders.count, 2)
    }

    func testNavRendersNoBorders() throws {
        let sut = PBNav(borders: false) {
            PBNavItem("Option 1")
            PBNavItem("Option 2")
            PBNavItem("Option 3")
        }
        let borders = try sut.inspect().findAll(Divider.self)
        XCTAssertEqual(borders.count, 0)
    }

}

extension PBNav: Inspectable {}
extension PBNavItem: Inspectable {}
