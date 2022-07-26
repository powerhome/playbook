import XCTest
import SwiftUI
import ViewInspector
@testable import Playbook

private let referenceSize = CGSize(width: 60, height: 60)

final class PBAvatarTests: XCTestCase {

    func testMonogram() throws {
        let subject = PBAvatar(name: "Test Fest")
        let initials = try subject.inspect().find(viewWithTag: "monogram").text().string()
        XCTAssertEqual(initials, "TF")
    }

    func testFallback() throws {
        let subject = PBAvatar()
        let fallback = try subject.inspect().find(viewWithTag: "fallback").image().actualImage()
        XCTAssertNotNil(fallback)
    }

    // if additionalUser = true, uses the full name, when = false, use monogram and the initials
    func testAdditionalUser() throws {
        let subject = PBAvatar(name: "+2", additionalUser: true)
        let additionalUser = try subject.inspect().find(viewWithTag: "additionalUser").text().string()
        XCTAssertEqual(additionalUser, "+2")

        let subject2 = PBAvatar(name: "+2", additionalUser: false)
        let additionalUser2 = try subject2.inspect().find(viewWithTag: "monogram").text().string()
        XCTAssertNotEqual(additionalUser2, "+2")
    }
}

extension PBAvatar: Inspectable {}
