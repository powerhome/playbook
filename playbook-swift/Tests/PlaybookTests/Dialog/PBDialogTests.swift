//
//  PBDialogTests.swift
//
//
//  Created by Alexandre Hauber on 20/08/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBDialogTests: XCTestCase {

    func test_dialog_simple() throws {
        let dialog = PBDialog(title: "Simple title", text: "Simple text", cancelButton: "Cancel", confirmButton: "OK") { }
        let modifier = dialog.modifier(self)
        let content = modifier.content

        let pbCard = try dialog.inspect().find(viewWithTag: "card")
        let title = try pbCard.find(viewWithTag: "title").text().string()
        let text = try pbCard.find(viewWithTag: "text").text().string()
        let cancelButton = try pbCard.find(viewWithTag: "cancelButton").button()
        let cancelButtonStyle = try cancelButton.buttonStyle() as? PBButtonStyle

        let confirmButton = try pbCard.find(viewWithTag: "confirmButton").button()
        let confirmButtonStyle = try confirmButton.buttonStyle() as? PBButtonStyle

        let closeIcon = try dialog.inspect().find(viewWithTag: "closeIcon")

        XCTAssertNotNil(pbCard)
        XCTAssertEqual(content.size, .medium)
        XCTAssertEqual(title, "Simple title")
        XCTAssertEqual(text, "Simple text")
        XCTAssertEqual(cancelButtonStyle?.variant, .link)
        XCTAssertEqual(confirmButtonStyle?.variant, .primary)
        XCTAssertEqual(try cancelButton.labelView().text().string(), "Cancel")
        XCTAssertEqual(try confirmButton.labelView().text().string(), "OK")
        XCTAssertNotNil(closeIcon)
    }

    func test_dialog_complex() throws {
        let dialog = PBDialog {
            Text("Complex title").tag("complexTitle")

            PBMessage(avatar: PBAvatar(name: "Andrew Koeckler"), label: "Andrew Koeckler", timestamp: PBTimestamp(Date(), showDate: false)) {
                Text("Complex text").pbFont(.body).tag("complexText")
            }
            HStack {
                Button {
                    print("Left button tapped")
                } label: {
                    Text("Left button")
                }
                .tag("leftButton")
                .buttonStyle(PBButtonStyle())

                Spacer()

                Button {
                    print("Right button tapped")
                } label: {
                    Text("Right button")
                }
                .tag("rightButton")
                .buttonStyle(PBButtonStyle(variant: .secondary))
            }
        }

        let pbCard = try dialog.inspect().find(viewWithTag: "card")
        let title = try pbCard.find(viewWithTag: "complexTitle").text().string()
        let text = try pbCard.find(viewWithTag: "complexText").text().string()
        let leftButton = try pbCard.find(viewWithTag: "leftButton").button()
        let leftButtonStyle = try leftButton.buttonStyle() as? PBButtonStyle

        let rightButton = try pbCard.find(viewWithTag: "rightButton").button()
        let rightButtonStyle = try rightButton.buttonStyle() as? PBButtonStyle

        let closeIcon = try dialog.inspect().find(viewWithTag: "closeIcon")

        XCTAssertNotNil(pbCard)
        XCTAssertEqual(title, "Complex title")
        XCTAssertEqual(text, "Complex text")
        XCTAssertEqual(leftButtonStyle?.variant, .primary)
        XCTAssertEqual(rightButtonStyle?.variant, .secondary)
        XCTAssertEqual(try leftButton.labelView().text().string(), "Left button")
        XCTAssertEqual(try rightButton.labelView().text().string(), "Right button")
        XCTAssertNotNil(closeIcon)
    }

    func test_dialog_small() throws {
        let dialog = PBDialog(size: .small) { }
        let modifier = dialog.modifier(self)
        let content = modifier.content

        XCTAssertEqual(content.size, .small)
    }
}

extension PBDialog: Inspectable {}
