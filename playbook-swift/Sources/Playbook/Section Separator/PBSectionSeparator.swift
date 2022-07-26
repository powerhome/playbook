//
//  PBSectionSeparator.swift
//
//
//  Created by Alexandre Hauber on 25/07/21.
//

import SwiftUI

public struct PBSectionSeparator<Content>: View where Content: View {

    // MARK: Props
    var text: String?
    var orientation: Orientation
    var variant: Variant
    var dividerOpacity: CGFloat
    var content: () -> Content?
    //

    public init(_ text: String? = nil, orientation: Orientation = .horizontal, variant: Variant = .card, dividerOpacity: CGFloat? = 1, @ViewBuilder content: @escaping () -> Content? = { nil }) {
        self.text = text
        self.orientation = orientation
        self.variant = variant
        self.dividerOpacity = dividerOpacity ?? 1
        self.content = content
    }

    @ViewBuilder
    private var backgroundVariant: some View {
        switch variant {
        case .background: Color.pbBackground
        case .bubble:
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.pbCard)
                .overlay(RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.pbBorder, lineWidth: 1))
                .tag("Border")
        default: Color.clear
        }
    }

    @ViewBuilder
    private var dividerView: some View {
        switch variant {
        case .bubble: PBLine()
                .stroke(Color.pbBorder, style: StrokeStyle(lineWidth: 1, dash: [3, 2]))
                .frame(height: 1)
                .tag("Dashed divider")
        default: Divider().background(Color.pbBorder).tag("Divider")
        }
    }

    private var textPadding: EdgeInsets {
        switch variant {
        case .bubble: return EdgeInsets(.init(top: 0, leading: 12, bottom: 0, trailing: 12))
        default: return EdgeInsets(.init(top: 0, leading: 6, bottom: 0, trailing: 6))
        }
    }

    var divider: some View {
        VStack { dividerView.frame(minWidth: 24) }
            .opacity(dividerOpacity)
    }

    public var body: some View {
        if orientation == .horizontal {
            HStack(alignment: .center, spacing: 0, content: {
                divider

                if let text = text, !text.isEmpty {
                    Text(text)
                        .tag("Title")
                        .pbFont(.caption)
                        .padding(textPadding)
                        .background(backgroundVariant)
                        .layoutPriority(1)
                        .lineLimit(1)

                    divider
                } else if let content = content() {
                    content
                        .tag("Content")
                        .background(backgroundVariant)
                        .layoutPriority(1)

                    divider
                }
            }).frame(maxWidth: .infinity)

        } else {
            Divider().background(Color.pbBorder)
        }
    }
}

/// Extension to allow optional Content
public extension PBSectionSeparator where Content == EmptyView {
    init(_ text: String? = nil, orientation: Orientation = .horizontal, variant: Variant = .card) {
        self.init(text, orientation: orientation, variant: variant, content: { EmptyView() })
    }
}

public extension PBSectionSeparator {
    enum Variant {
        case background
        case bubble
        case card
    }
}

// MARK: Preview
#if DEBUG || TEST
struct PBSectionSeparator_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        let loremIpsum = Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua").pbFont(.body).padding()

        return Group {
            VStack(alignment: .leading, spacing: nil) {
                Text("Line separator").pbFont(.caption).padding()
                PBSectionSeparator()

                Text("Text separator").pbFont(.caption).padding()
                PBSectionSeparator("Title separator")

                Text("Background variant").pbFont(.caption).padding()
                PBSectionSeparator("Title separator", variant: .background)

                Text("Bubble variant").pbFont(.caption).padding()
                PBSectionSeparator("Title separator", variant: .bubble)

                Text("Content variant").pbFont(.caption).padding()
                PBSectionSeparator(variant: .background) {
                    Text("Title separator").pbFont(.subcaption).padding(4)
                }
            }.previewDisplayName("Horizontal separators")

            VStack {
                Text("Vertical").pbFont(.caption).padding()
                HStack {
                    loremIpsum
                    PBSectionSeparator(orientation: .vertical)
                    loremIpsum
                }.frame(width: .infinity, height: 120, alignment: .center)
            }.previewDisplayName("Vertical separator")
        }
    }
}
#endif
