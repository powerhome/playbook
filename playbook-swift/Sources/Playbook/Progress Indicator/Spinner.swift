//
//  Spinner.swift
//  
//
//  Created by Alexandre Hauber on 02/05/22.
//

import SwiftUI

public struct Spinner: View {

    let innerColor: Color
    let ringColor: Color
    let ringSize: CGSize
    @State private var isAnimating: Bool = false

    public init(ringColor: Color = .pbPrimary, innerColor: Color = .pbBorder, ringSize: CGSize = CGSize(width: 20, height: 20)) {
        self.innerColor = innerColor
        self.ringColor = ringColor
        self.ringSize = ringSize
    }

    public var body: some View {
        ZStack {
            Circle()
                .stroke(innerColor, style: StrokeStyle(lineWidth: 4))
                .frame(width: ringSize.width, height: ringSize.height)
                .background(RoundedRectangle(cornerRadius: ringSize.height).fill(Color.pbBackground))

            Circle()
                .trim(from: 0.3, to: 1)
                .stroke(LinearGradient(gradient: Gradient(colors: [.pbPrimary, .pbPrimary.opacity(0.75)]), startPoint: .topTrailing, endPoint: .bottomLeading),
                        style: StrokeStyle(lineWidth: 4, lineCap: .round)
                )
                .rotationEffect(Angle(degrees: isAnimating ? 360 : 0))
                .frame(width: ringSize.width, height: ringSize.height)
                .shadow(color: .pbShadow, radius: 2, x: 0, y: 2)
                .animation(
                    Animation
                        .linear(duration: 0.75)
                        .repeatForever(autoreverses: false),
                    value: isAnimating
                )
                .onAppear {
                    isAnimating.toggle()
                }
        }.background(Color.clear)
    }
}

// MARK: Preview
#if DEBUG || TEST
struct SwiftUIView_Previews: PreviewProvider {
    static var previews: some View {
        Spinner()
            .padding()
    }
}
#endif
