//
//  PBSectionSeparatorTests.swift
//  
//
//  Created by Alexandre Hauber on 25/07/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBSectionSeparatorTests: XCTestCase {

    // MARK: Line separator tests
    func test_line_separator_is_displayed_and_no_text_is_displayed() throws {
        let separator = PBSectionSeparator()
        let hStack = try separator.inspect().hStack()

        let startVstack = try hStack.vStack(0)
        let startDivider = try startVstack.find(viewWithTag: "Divider")

        let tupleView = try? hStack.tupleView(1) // views wrapped with if lets needs this kind of test
        let text = try? tupleView?.text(0)
        let endLine = try? tupleView?.view(Divider.self, 1)

        XCTAssertNotNil(startDivider)
        XCTAssertNil(text)
        XCTAssertNil(endLine)
    }

    // MARK: Title separator tests
    func test_line_separator_is_displayed_and_text_is_displayed() throws {
        let separator = PBSectionSeparator("Title separator")
        let hStack = try separator.inspect().hStack()

        let startVstack = try hStack.vStack(0)
        let startDivider = try startVstack.find(viewWithTag: "Divider")

        let textTag = try hStack.find(viewWithTag: "Title").text()
        let textContent = try textTag.string()
        let textBackgroundColor = try? textTag.background().color()

        let tupleView = try hStack.tupleView(1) // views wrapped with if lets needs this kind of test
        let endVstack = try tupleView.vStack(1)
        let endDivider = try endVstack.find(viewWithTag: "Divider")

        XCTAssertNotNil(startDivider)
        XCTAssertNotNil(textTag)
        XCTAssertEqual(textContent, "Title separator")
        XCTAssertNotNil(textBackgroundColor)
        XCTAssertEqual(try textBackgroundColor?.value(), Color.clear)
        XCTAssertNotNil(endDivider)
    }

    // MARK: Background separator tests
    func test_line_separator_is_displayed_and_text_is_displayed_with_background() throws {
        let separator = PBSectionSeparator("Background separator", variant: .background)
        let hStack = try separator.inspect().hStack()

        let startVstack = try hStack.vStack(0)
        let startDivider = try startVstack.find(viewWithTag: "Divider")

        let textTag = try hStack.find(viewWithTag: "Title").text()
        let textContent = try textTag.string()
        let textBackgroundColor = try? textTag.background().color()

        let tupleView = try hStack.tupleView(1) // views wrapped with if lets needs this kind of test
        let endVstack = try tupleView.vStack(1)
        let endDivider = try endVstack.find(viewWithTag: "Divider")

        XCTAssertNotNil(startDivider)
        XCTAssertNotNil(textTag)
        XCTAssertEqual(textContent, "Background separator")
        XCTAssertNotNil(textBackgroundColor)
        XCTAssertEqual(try textBackgroundColor?.name(), "Background")
        XCTAssertNotNil(endDivider)
    }

    // MARK: Bubble separator tests
    func test_dashed_separator_is_displayed_and_text_is_displayed_with_bubble_background() throws {
        let separator = PBSectionSeparator("Bubble separator", variant: .bubble)
        let hStack = try separator.inspect().hStack()

        let startVstack = try hStack.vStack(0)
        let startDivider = try startVstack.find(viewWithTag: "Dashed divider")

        let textTag = try hStack.find(viewWithTag: "Title").text()
        let textContent = try textTag.string()
        let textBackgroundColor = try? textTag.find(viewWithTag: "Border")

        let tupleView = try hStack.tupleView(1) // views wrapped with if lets needs this kind of test
        let endVstack = try tupleView.vStack(1)
        let endDivider = try endVstack.find(viewWithTag: "Dashed divider")

        XCTAssertNotNil(startDivider)
        XCTAssertNotNil(textTag)
        XCTAssertEqual(textContent, "Bubble separator")
        XCTAssertNotNil(textBackgroundColor)
        XCTAssertNotNil(endDivider)
    }

    // MARK: Content backgrouind separator tests
    func test_line_separator_is_displayed_with_content_and_with_background() throws {
        let separator = PBSectionSeparator(variant: .background) {
            Text("Content separator")
        }
        let hStack = try separator.inspect().hStack()

        let startVstack = try hStack.vStack(0)
        let startDivider = try startVstack.find(viewWithTag: "Divider")

        let textTag = try? hStack.find(viewWithTag: "Title").text()
        let content = try hStack.find(viewWithTag: "Content").text()
        let contentBackgroundColor = try? content.background().color()

        let tupleView = try hStack.tupleView(1) // views wrapped with if lets needs this kind of test
        let endVstack = try tupleView.vStack(1)
        let endDivider = try endVstack.find(viewWithTag: "Divider")

        XCTAssertNotNil(startDivider)
        XCTAssertNil(textTag)
        XCTAssertNotNil(content)
        XCTAssertNotNil(contentBackgroundColor)
        XCTAssertEqual(try contentBackgroundColor?.name(), "Background")
        XCTAssertNotNil(endDivider)
    }

    // MARK: Vertical tests
    func test_line_separator_is_vertical() throws {
        let separator = PBSectionSeparator(orientation: .vertical)
        let verticalLine = try separator.inspect().view(Divider.self, 0)

        XCTAssertNotNil(verticalLine)
    }

}

extension Divider: Inspectable {}
extension PBSectionSeparator: Inspectable {}
