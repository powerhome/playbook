//
//  PBPill.swift
//  
//
//  Created by Alexandre Hauber on 04/10/21.
//

import SwiftUI

public struct PBPill: View {

    private let title: String
    private let variant: Variant

    public init(_ title: String, variant: Variant = .neutral) {
        self.title = title
        self.variant = variant
    }

   public var body: some View {
       Text(title)
           .padding(EdgeInsets(top: 2, leading: 6, bottom: 2, trailing: 6))
           .foregroundColor(variant.foregroundColor())
           .pbFont(.title4)
           .background(variant.backgroundColor())
           .cornerRadius(12)
    }
}

public extension PBPill {
    enum Variant {
        case error
        case info
        case neutral
        case primary
        case success
        case warning

        func foregroundColor() -> Color {
            switch self {
            case .error: return .pbError
            case .info: return .pbInfo
            case .primary: return .pbPrimary
            case .success: return .pbSuccess
            case .warning: return .pbWarning
            default: return .pbNeutral
            }
        }

        func backgroundColor() -> Color {
            foregroundColor().opacity(0.12)
        }
    }
}

struct PBPill_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return VStack(alignment: .leading) {
            PBPill("default")
            PBPill("success", variant: .success)
            PBPill("error", variant: .error)
            PBPill("warning", variant: .warning)
            PBPill("info", variant: .info)
            PBPill("neutral", variant: .neutral)
            PBPill("primary", variant: .primary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.leading, 20)
        .background(Color.pbCard)
        .previewDisplayName("Pills")
    }
}
