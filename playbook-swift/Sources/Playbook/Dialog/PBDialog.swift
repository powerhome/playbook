//
//  PBDialog.swift
//  
//
//  Created by Michael Campbell on 7/15/21.
//

import SwiftUI

public struct PBDialog<Content: View>: View {

    @Environment(\.presentationMode) var presentationMode

    // MARK: - Properties
    let content: Content

    let title: String?
    let text: String?
    let cancelButton: String?
    let cancelButtonStyle: PBButtonStyle
    let confirmButton: String?
    let confirmButtonStyle: PBButtonStyle
    let onCancel: (() -> Void)?
    let onClose: (() -> Void)?
    let onConfirm: (() -> Void)?
    let size: Size
    let shouldCloseOnOverlay: Bool

    // MARK: - Init
    public init(title: String? = nil, text: String? = nil, cancelButton: String? = nil, cancelButtonStyle: PBButtonStyle = PBButtonStyle(variant: .link), confirmButton: String? = nil, confirmButtonStyle: PBButtonStyle = PBButtonStyle(variant: .primary), onCancel: (() -> Void)? = nil, onClose: (() -> Void)? = nil, onConfirm: (() -> Void)? = nil, size: Size = .medium, shouldCloseOnOverlay: Bool = true, @ViewBuilder content: () -> Content) {
        self.content = content()
        self.title = title
        self.text = text
        self.cancelButton = cancelButton
        self.cancelButtonStyle = cancelButtonStyle
        self.confirmButton = confirmButton
        self.confirmButtonStyle = confirmButtonStyle
        self.onCancel = onCancel
        self.onClose = onClose
        self.onConfirm = onConfirm
        self.size = size
        self.shouldCloseOnOverlay = shouldCloseOnOverlay

        #if os(iOS)
        UIScrollView.appearance().bounces = false
        #elseif os(macOS)
        // TODO: remove bounce from mac
        // Didn't work -> NSScrollView.init().verticalScrollElasticity = .none
        #endif

    }

    // MARK: - Views
    public var body: some View {
        #if os(iOS)
        GeometryReader { geometry in
            ScrollView {
                dialogContent()
                    .frame(minHeight: geometry.size.height)
                    .onTapGesture {
                        // overrides the overlay tap
                    }
                    .padding(EdgeInsets(top: 0, leading: size.padding, bottom: 0, trailing: size.padding))
                    .backgroundViewModifier(alpha: 0.2)
            }
            .onTapGesture {
                if shouldCloseOnOverlay {
                    if let onClose = onClose {
                        onClose()
                    } else {
                        dismissDialog()
                    }
                }
            }
        }
        .edgesIgnoringSafeArea(.all)
        #elseif os(macOS)
        ZStack(alignment: .center) {
            Color.black.opacity(0.2)
            GeometryReader { geometry in
                ScrollView {
                    dialogContent()
                        .frame(width: size.width, height: geometry.size.height)
                        .onTapGesture {
                            // overrides the overlay tap
                        }
                }
                .padding(EdgeInsets(top: 0, leading: size.padding, bottom: 0, trailing: size.padding))
                .onTapGesture {
                    if shouldCloseOnOverlay {
                        dismissDialog()
                    }
                }
            }
        }.frame(maxWidth: .infinity)
        #endif
    }

    private func dialogContent() -> some View {
        return ZStack(alignment: .topTrailing) {
            VStack {
                PBCard(padding: .pbNone) {
                    if let title = title {
                        Text(title).tag("title").pbFont(.body).padding()
                        PBSectionSeparator()
                    }

                    if let text = text {
                        Text(text).tag("text").pbFont(.body).lineLimit(nil)
                            .fixedSize(horizontal: false, vertical: true).padding()
                    }

                    content // dynamic content

                    HStack {
                        if let confirmButton = confirmButton, !confirmButton.isEmpty {
                            Button {
                                if let onConfirm = onConfirm {
                                    onConfirm()
                                } else {
                                    dismissDialog()
                                }
                            } label: {
                                Text(confirmButton)
                            }
                            .tag("confirmButton")
                            .buttonStyle(confirmButtonStyle).padding()
                            Spacer()
                        }

                        if let cancelButton = cancelButton, !cancelButton.isEmpty {
                            Spacer()
                            Button {
                                if let onCancel = onCancel {
                                    onCancel()
                                } else {
                                    dismissDialog()
                                }
                            } label: {
                                Text(cancelButton)
                            }
                            .tag("cancelButton")
                            .buttonStyle(cancelButtonStyle).padding()
                        }
                    }
                }
            }.tag("card")

          Button {
            if let onClose = onClose {
              onClose()
            } else {
              dismissDialog()
            }
          } label: {
            PBIcon(FontAwesome.times, size: .medium)
          }
          .buttonStyle(PBButtonStyle(variant: .link))
          .tag("closeIcon")
        }
    }

    func dismissDialog() {
        self.presentationMode.wrappedValue.dismiss()
    }

}

public extension PBDialog {
    enum Size {
        case small
        case medium
        case large
        case content

        #if os(iOS)
        var padding: CGFloat {
            if UIDevice.current.userInterfaceIdiom == .pad {
                switch self {
                case .small:   return 252
                case .medium:  return 168
                case .large:   return 80
                case .content: return 10
                }
            } else {
                return 30
            }
        }
        #elseif os(macOS)
        var padding: CGFloat {
            switch self {
            case .small:   return 300
            case .medium:  return 200
            case .large:   return 100
            case .content: return 30
            }
        }
        #endif

        var width: CGFloat? {
            switch self {
            case .small:   return 300
            case .medium:  return 500
            case .large:   return 800
            case .content: return nil
            }
        }
    }
}

/// Extension to allow optional Content
public extension PBDialog where Content == EmptyView {
    init(title: String? = nil, text: String? = nil, cancelButton: String? = nil, cancelButtonStyle: PBButtonStyle = PBButtonStyle(variant: .link), confirmButton: String? = nil, confirmButtonStyle: PBButtonStyle = PBButtonStyle(variant: .primary), onCancel: (() -> Void)? = nil, onClose: (() -> Void)? = nil, onConfirm: (() -> Void)? = nil, size: Size = .medium, shouldCloseOnOverlay: Bool = true) {
        self.init(title: title, text: text, cancelButton: cancelButton, cancelButtonStyle: cancelButtonStyle, confirmButton: confirmButton, confirmButtonStyle: confirmButtonStyle, onCancel: onCancel, onClose: onClose, onConfirm: onConfirm, size: size, shouldCloseOnOverlay: shouldCloseOnOverlay, content: { EmptyView() })
    }
}

struct PBBDialog_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        let infoMessage = "This is a message for informational purposes only and requires no action."
        let message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse potenti nullam. Imperdiet nulla malesuada pellentesque elit egam."

        func foo() {
            print("alal")
        }

        return Group {
            VStack(alignment: .leading, spacing: nil, content: {
                Text("Simple").pbFont(.caption).padding()

                PBDialog(title: "This is some informative text", text: infoMessage, cancelButton: "Cancel", confirmButton: "Okay", onCancel: foo) {
                }
            }).padding().previewDisplayName("Simple")
            .frame(width: 800, height: 800)

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Complex").pbFont(.caption)

                PBDialog {
                    Text("Title").pbFont(.title4).padding()
                    PBSectionSeparator()

                  PBMessage(avatar: PBAvatar(name: "Andrew Koeckler"), label: "Andrew Koeckler", timestamp: PBTimestamp(Date(), showDate: false)) {
                        Text(message).pbFont(.body)
                    }.padding()
                    HStack {
                        Button {
                            print("Left button tapped")
                        } label: {
                            Text("Left button")
                        }.buttonStyle(PBButtonStyle())

                        Spacer()

                        Button {
                            print("Right button tapped")
                        } label: {
                            Text("Right button")
                        }.buttonStyle(PBButtonStyle(variant: .secondary))
                    }.padding()
                }.padding()

            }).padding().previewDisplayName("Complex")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Size").pbFont(.caption)

                PBDialog(title: "Small Dialog", text: infoMessage, cancelButton: "Cancel", confirmButton: "Okay", size: .small)
                PBDialog(title: "Medium Dialog", text: infoMessage, cancelButton: "Cancel", confirmButton: "Okay", size: .medium)
                PBDialog(title: "Large Dialog", text: infoMessage, cancelButton: "Cancel", confirmButton: "Okay", size: .large)
            }).padding().previewDisplayName("Size")
        }//: GROUP
    }
}
