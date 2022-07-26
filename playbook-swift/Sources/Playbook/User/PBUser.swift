//
//  PBUser.swift
//  
//
//  Created by Alexandre Hauber on 15/07/21.
//

import SwiftUI

public struct PBUser: View {

  // MARK: Props
  var name: String // Mandatory
  var displayAvatar: Bool = true
  var image: Image?
  var orientation: Orientation = .horizontal
  var size: Size = .medium
  var territory: String?
  var title: String?
  //

  var titleStyle: PBTextStyle {
    switch size {
    case .large: return .title3
    default: return .title4
    }
  }

  var bodyText: Text? {
    if let territory = territory, !territory.isEmpty, let title = title, !title.isEmpty {
      return Text("\(territory) \u{2022} \(title)")
    } else if let territory = territory, !territory.isEmpty {
      return Text(territory)
    } else if let title = title, !title.isEmpty {
      return Text(title)
    } else {
      return nil
    }
  }

  public init(name: String = "",
              displayAvatar: Bool = true,
              image: Image? = nil,
              orientation: Orientation = .horizontal,
              size: Size = .medium,
              territory: String? = nil,
              title: String? = nil) {
    self.name = name
    self.displayAvatar = displayAvatar
    self.image = image
    self.orientation = orientation
    self.size = size
    self.territory = territory
    self.title = title
  }

  public var body: some View {
    if orientation == .horizontal {
      HStack(spacing: .pbSmall) {
        if displayAvatar {
          PBAvatar(image: image, name: name, size: size.avatarSize)
        }
        VStack(alignment: .leading, spacing: 4, content: {
          Text(name)
            .font(titleStyle.font)
            .foregroundColor(.pbTextDefault)
          bodyText
            .font(.pbBody)
            .foregroundColor(.pbTextLight)
        })
      }
    } else {
      VStack {
        if displayAvatar {
          PBAvatar(image: image, name: name, size: size.avatarSize)
        }
        Text(name)
          .font(titleStyle.font)
          .foregroundColor(.pbTextDefault)
        bodyText
          .font(.pbBody)
          .foregroundColor(.pbTextLight)
      }
    }
  }
}

extension PBUser {
  public enum Size {
    case small
    case medium
    case large

    var avatarSize: PBAvatar.Size {
      switch self {
      case .small: return .small
      case .medium: return .medium
      case .large: return .xLarge
      }
    }
  }
}

struct PBUser_Previews: PreviewProvider {
  static var previews: some View {
    registerFonts()
    let img = Image("andrew", bundle: .module)
    let name = "Andrew Kloecker"
    let title = "Rebels Developer"

    return Group {
      VStack(alignment: .leading, spacing: 20, content: {
        Text("Horizontal Presentation")
        Divider()
        PBUser(name: name,
               image: img,
               size: .large,
               territory: "PHL",
               title: title)
        PBUser(name: name,
               image: img,
               size: .medium)
        PBUser(name: name,
               size: .medium,
               territory: "PHL",
               title: title)
        PBUser(name: name,
               image: img,
               size: .small,
               title: title)
        PBUser(name: name,
               displayAvatar: false,
               size: .small,
               title: title)
      }).padding(.horizontal, 20)

      VStack(alignment: .center, spacing: 20, content: {
        Text("Vertical Presentation")
        Divider()
        PBUser(name: name,
               image: img,
               orientation: .vertical,
               size: .large,
               territory: "PHL",
               title: title)
        PBUser(name: name,
               image: img,
               orientation: .vertical,
               size: .medium)
        PBUser(name: name,
               orientation: .vertical,
               size: .medium,
               territory: "PHL",
               title: title)
        PBUser(name: name,
               image: img,
               orientation: .vertical,
               size: .small,
               title: title)
        PBUser(name: name,
               displayAvatar: false,
               orientation: .vertical,
               size: .small,
               title: title)
      }).padding(.horizontal, 20)
    }
  }
}
