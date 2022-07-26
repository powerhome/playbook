//
//  PBLine.swift
//  
//
//  Created by Alexandre Hauber on 20/09/21.
//

import SwiftUI

public struct PBLine: Shape {
    public func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: 0, y: 0))
        path.addLine(to: CGPoint(x: rect.width, y: 0))
        return path
    }
}
