//
//  PBToggleStyle.swift
//  
//
//  Created by Lucas C. Feijo on 04/08/21.
//

import SwiftUI

public struct PBToggleStyle: ToggleStyle {

    @State var isHovering: Bool = false
    var labelsHidden: Bool

    public init(labelsHidden: Bool = false) {
        self.labelsHidden = labelsHidden
    }

    public func makeBody(configuration: Configuration) -> some View {
        VStack(alignment: .leading, spacing: 0) {

            if !labelsHidden { // Check if we can use the .labelsHidden() from the Toggle itself.
                configuration.label
                    .foregroundColor(.pbTextLight)
                    .pbFont(.caption)
            }

            ZStack {
                RoundedRectangle(cornerRadius: 15)
                    .strokeBorder(configuration.strokeColor(isHovering: isHovering), lineWidth: 3)
                    .foregroundColor(configuration.backgroundColor)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .foregroundColor(configuration.backgroundColor)
                    )
                    .frame(width: 55, height: 30, alignment: .center)

                Circle()
                    .foregroundColor(configuration.circleColor(isHovering: isHovering))
                    .frame(width: 20, height: 20, alignment: .center)
                    .offset(x: configuration.isOn ? 12 : -12, y: 0)
            }
            .onHover { hovering in
                withAnimation {
                    isHovering = hovering
                }
            }
            .onTapGesture {
                withAnimation {
                    configuration.isOn.toggle()
                }
            }
        }
    }
}

extension ToggleStyleConfiguration {
    func strokeColor(isHovering: Bool) -> Color {
        isOn || isHovering ? .pbPrimary : .pbNeutral
    }

    func circleColor(isHovering: Bool) -> Color {
        if isOn {
            return .white
        }
        if isHovering {
            return .pbPrimary
        }
        return .pbNeutral
    }

    var backgroundColor: Color {
        if isOn {
            return .pbPrimary
        }
        return .clear
    }
}

struct PBToggleStyle_Previews: PreviewProvider {
    static var previews: some View {
        VStack(alignment: .leading, spacing: 10) {
            Toggle("Checked Label Hidden", isOn: .constant(true))
                .toggleStyle(PBToggleStyle(labelsHidden: true))
            Toggle("Checked", isOn: .constant(true))
                .toggleStyle(PBToggleStyle())
            Toggle("Unchecked", isOn: .constant(false))
                .toggleStyle(PBToggleStyle())
        }
    }
}
