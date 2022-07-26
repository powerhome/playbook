//
//  PBMultipleUsers.swift
//
//
//  Created by Alexandre Hauber on 16/07/21.
//

import SwiftUI

public struct PBMultipleUsers: View {

    // MARK: Props
    var users: [PBUser]
    var size: Size
    var reversed: Bool
    var maxDisplayedUsers: Int

    public init(users: [PBUser], size: Size = .small, reversed: Bool = false, maxDisplayedUsers: Int = 4) {
        self.users = users
        self.size = size
        self.reversed = reversed
        self.maxDisplayedUsers = maxDisplayedUsers
    }

    var filteredUsers: [PBUser] {
        var mUsers = users
        if users.count > maxDisplayedUsers {
            mUsers = Array(users.prefix(maxDisplayedUsers - 1))
         let additionalUsers = PBUser(name: "+\(users.count - maxDisplayedUsers + 1)")
            mUsers.append(additionalUsers)
        }
        return mUsers
    }

    func xOffset(index: Int) -> CGFloat {
        let offset = size.avatarSize.diameter / 1.5 * CGFloat(index)
        return reversed ? -offset : offset
    }

    var leadingPadding: CGFloat {
        let padding = size.avatarSize.diameter / 1.5 * CGFloat(filteredUsers.count - 1)
        return reversed ? padding : 0
    }

    // MARK: Views
    public var body: some View {
        ZStack {
            ForEach(filteredUsers.indices) { index in
                PBAvatar(image: filteredUsers[index].image,
                       name: filteredUsers[index].name,
                       size: size.avatarSize,
                       wrapped: index > 0,
                       additionalUser: index == filteredUsers.count - 1)
                    .offset(x: xOffset(index: index), y: 0)
            }.padding(.leading, leadingPadding)
        }
    }
}

public extension PBMultipleUsers {
    enum Size {
        case xSmall
        case small

        var avatarSize: PBAvatar.Size {
            switch self {
            case .xSmall: return .xSmall
            case .small: return .small
            }
        }
    }
}

#if DEBUG || TEST
struct PBMultipleUsers_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        let andrew = PBUser(name: "Andrew Kloecker")
        let picAndrew = PBUser(name: "Andrew Kloecker", image: Image("andrew", bundle: .module))
        let twoUsers = [andrew, picAndrew]
        let multipleUsers = [andrew, picAndrew, andrew, andrew, andrew]

        return VStack(alignment: .leading, spacing: nil, content: {
            Text("xsmall").pbFont(.title4)
            PBMultipleUsers(users: twoUsers, size: .xSmall)
            Divider()
            Text("small").pbFont(.title4)
            PBMultipleUsers(users: multipleUsers, size: .small)
            Divider()
            Text("small reverse").pbFont(.title4)
            PBMultipleUsers(users: multipleUsers, size: .small, reversed: true)
        }).padding(.leading, 4)
    }
}
#endif
