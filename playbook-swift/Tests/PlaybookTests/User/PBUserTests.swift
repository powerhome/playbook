//
//  PBUserTests.swift
//  
//
//  Created by Alexandre Hauber on 23/07/21.
//

import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

final class PBUserTests: XCTestCase {

    func testAvatarDisplayed() throws {
        let user = PBUser(name: "Test User")
        let hStack = try user.inspect().hStack()
        let avatar = try hStack.view(PBAvatar.self, 0)
        XCTAssertNotNil(avatar)
    }

    func testAvatarNotDisplayed() throws {
        let user = PBUser(name: "Test User", displayAvatar: false)
        let hStack = try user.inspect().hStack()
        let avatar = try? hStack.view(PBAvatar.self, 0)
        XCTAssertNil(avatar)
    }
}

extension PBUser: Inspectable {}
