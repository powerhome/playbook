//
//  PBRadioStyle.swift
//  
//
//  Created by Lucas C. Feijo on 17/03/22.
//

import SwiftUI

public struct PBRadioStyle: ToggleStyle {

    @Environment(\.colorScheme) var colorScheme
    @State var isHovering: Bool = false
    var labelsHidden: Bool

    public init(labelsHidden: Bool = false) {
        self.labelsHidden = labelsHidden
    }

    public func makeBody(configuration: Configuration) -> some View {
        HStack(alignment: .center, spacing: 10) {
            ZStack {
                RoundedRectangle(cornerRadius: 4)
                    .strokeBorder(configuration.strokeColor(isHovering: isHovering), lineWidth: 3)
                    .foregroundColor(configuration.backgroundColor)
                    .background(
                        RoundedRectangle(cornerRadius: 4)
                            .foregroundColor(configuration.backgroundColor)
                    )
                    .frame(width: 30, height: 30, alignment: .center)

                Button(action: {
                    withAnimation(.easeInOut(duration: 0.25)) {
                        configuration.isOn.toggle()
                    }
                }) {
                    PBIcon.fontAwesome(.check, size: .medium)
                        .foregroundColor(configuration.isOn
                                         ? (colorScheme == .light
                                            ? .white
                                            : .pbTextDefault)
                                         : .pbBackgroundLight)
                        .opacity(configuration.isOn ? 1 : 0.05)
                }
                .buttonStyle(.borderless)
            }
            .onHover { hovering in
                withAnimation {
                    isHovering = hovering
                }
            }

            if !labelsHidden {
                configuration.label
                    .foregroundColor(.pbTextLight)
                    .pbFont(.body)
            }
        }
    }
}

struct PBRadioStyle_Previews: PreviewProvider {
    static var previews: some View {
        VStack(alignment: .leading, spacing: 10) {
            Toggle("Checked", isOn: .constant(true))
                .toggleStyle(PBRadioStyle())
            Toggle("Unchecked", isOn: .constant(false))
                .toggleStyle(PBRadioStyle())
        }
    }
}
