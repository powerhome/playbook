//
//  PBAvatar.swift
//  
//
//  Created by Lucas C. Feijo on 12/07/21.
//

import SwiftUI

public struct PBAvatar: View {

  public enum Shape {
    case circle
    case roundedSquare
  }

  // MARK: Props
  var image: Image?
  var name: String?
  var size: Size
  var status: PresenceStatus?
  var wrapped: Bool
  var additionalUser: Bool
  var shape: Shape
  //

  public init(image: Image? = nil, name: String? = nil, size: Size = .medium, status: PresenceStatus? = nil, wrapped: Bool = false, additionalUser: Bool = false, shape: Shape = .circle) {
    self.image = image
    self.name = name
    self.size = size
    self.status = status
    self.wrapped = wrapped
    self.additionalUser = additionalUser
    self.shape = shape
  }

    var initials: String? {
        guard let name = name else { return nil }
        let names = name.split(separator: " ")
        let firstNameInitial = String(names.first ?? " ").first
        let lastNameInitial = String(names.last ?? " ").first
        return "\(firstNameInitial!.uppercased())\(lastNameInitial!.uppercased())"
    }

    public var body: some View {
        ZStack {
          Group {
            if let image = image {
                image
                    .resizable()
            } else if additionalUser {
                Text(name ?? "")
                    .tag("additionalUser")
                    .font(.proximaNova(family: .bold,
                                       size: size.fontSize))
            } else if let initials = initials {
                Text(initials)
                    .tag("monogram")
                    .font(.proximaNova(family: .light,
                                       size: size.fontSize))
            } else {
                Image(systemName: "person")
                    .tag("fallback")
                    .font(.system(size: size.fontSize))

            }
          }.modifier(AvatarShape(diameter: size.diameter, additionalUser: image == nil && additionalUser, shape: shape))

            if wrapped {
                Circle()
                    .strokeBorder(Color.pbBackground, lineWidth: 1)
                    .frame(width: size.diameter + 1, height: size.diameter + 1)
            }

            if let statusColor = self.status?.color {
                Circle()
                    .strokeBorder(Color.pbBackground, lineWidth: 2)
                    .background(Circle().foregroundColor(statusColor))
                    .frame(width: 10.0, height: 10.0)
                    .cornerRadius(size.diameter/2)
                    .offset(x: size.diameter/2 - size.diameter/9,
                            y: (size.diameter/2 - size.diameter/6) * size.statusYModifier)

            }
        }
    }
}

public extension PBAvatar {
    enum Size {
        case xxSmall
        case xSmall
        case small
        case medium
        case large
        case xLarge

        var diameter: CGFloat {
            switch self {
            case .xxSmall: return 20
            case .xSmall: return 28
            case .small: return 38
            case .medium: return 60
            case .large: return 80
            case .xLarge: return 100
            }
        }

        var fontSize: CGFloat {
            return diameter * 0.38
        }

        var statusYModifier: CGFloat {
            switch self {
            case .xxSmall, .xSmall, .small: return -1
            default: return 1
            }
        }
    }

    enum PresenceStatus {
        case away
        case offline
        case online

        var color: Color {
            switch self {
            case .online: return .pbSuccess
            case .away: return .pbWarning
            case .offline: return .pbNeutral
            }
        }
    }
}

private struct AvatarShape: ViewModifier {
  var diameter: CGFloat
  var additionalUser: Bool
  var shape: PBAvatar.Shape

  func radius() -> CGFloat {
    switch shape {
    case .circle:
      return diameter/2
    case .roundedSquare:
      return 7
    }
  }

  func body(content: Content) -> some View {
    content
      .foregroundColor(additionalUser ? Color.pbPrimary : Color.white)
      .frame(width: diameter,
             height: diameter,
             alignment: .center)
      .background(additionalUser ? Color.pbShadow: Color.pbNeutral)
      .cornerRadius(radius())
  }
}

struct PBAvatar_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return Group {
            HStack {
                PBAvatar(image: Image("andrew", bundle: .module), size: .xxSmall, status: .online)
                PBAvatar(image: Image("andrew", bundle: .module), size: .xSmall, status: .away)
                PBAvatar(image: Image("andrew", bundle: .module), size: .small, status: .online)
                PBAvatar(image: Image("andrew", bundle: .module), size: .medium, status: .away)
                PBAvatar(image: Image("andrew", bundle: .module), size: .large, status: .online)
                PBAvatar(image: Image("andrew", bundle: .module), size: .xLarge, status: .offline)
            }
            HStack {
                PBAvatar(size: .xxSmall, status: .online)
                PBAvatar(size: .xSmall, status: .away)
                PBAvatar(size: .small, status: .online)
                PBAvatar(size: .medium, status: .away)
                PBAvatar(size: .large, status: .online)
                PBAvatar(size: .xLarge, status: .offline)
            }
            HStack {
                PBAvatar(name: "Tim Wenhold", size: .xxSmall, status: .online)
                PBAvatar(name: "Tim Wenhold", size: .xSmall, status: .away)
                PBAvatar(name: "Tim Wenhold", size: .small, status: .online)
                PBAvatar(name: "Tim Wenhold", size: .medium, status: .away)
                PBAvatar(name: "Tim Wenhold", size: .large, status: .online)
                PBAvatar(name: "Tim Wenhold", size: .xLarge, status: .offline)
            }

            PBAvatar(name: "+4", size: .medium, wrapped: true, additionalUser: true)

          PBAvatar(image: Image("andrew", bundle: .module), size: .large, shape: .roundedSquare)
        }
    }
}
