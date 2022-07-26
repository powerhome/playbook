//
//  Playbook.swift
//  
//
//  Created by Alexandre Hauber on 13/07/21.
//

import SwiftUI

/// Exposes this Swift Package's bundle to the user.
public let playbookBundle = Bundle.module

#if os(macOS)
/// Hides all NSTextField's focusRings.
extension NSTextField {
    open override var focusRingType: NSFocusRingType {
        get { .none }
        set { }
    }
}
#endif
