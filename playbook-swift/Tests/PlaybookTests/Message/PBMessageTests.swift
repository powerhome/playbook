//
//  PBMessageTests.swift
//  
//
//  Created by Alexandre Hauber on 29/07/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBMessageTests: XCTestCase {

    // MARK: Message tests
    func testMessageDisplayingOnlyContent() throws {
        let message = PBMessage {
            Text("Message test")
        }
        let hStack = try message.inspect().hStack()
        let avatar = try? hStack.view(PBAvatar.self, 0)
        let vStack = try hStack.vStack(1) // index 0 is optional Avatar
        let text = try vStack.text(1).string()

        XCTAssertNil(avatar)
        XCTAssertEqual(text, "Message test")
    }

    func testMessageDisplayingAvatarAndContent() throws {
        let message = PBMessage(avatar: PBAvatar(name: "Test User")) {
            Text("Message test")
        }

        let hStack = try message.inspect().hStack()
        let avatar = try? hStack.view(PBAvatar.self, 0)
        let vStack = try hStack.vStack(1) // index 0 is optional Avatar
        let text = try vStack.text(1).string()

        XCTAssertNotNil(avatar)
        XCTAssertEqual(text, "Message test")
    }
    //
}

extension PBMessage: Inspectable {}
