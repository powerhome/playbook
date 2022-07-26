//
//  SwiftUIView.swift
//  
//
//  Created by mpc on 8/9/21.
//

import SwiftUI

// MARK: - PBRadioItem

public struct PBRadioItem: Identifiable, Equatable {

  public var title: String
  public var subtitle: String

  public var id: String { title }

  public init(_ title: String, subtitle: String = "") {
    self.title = title
    self.subtitle = subtitle
  }
}

// MARK: - PBRadio

public struct PBRadio: View {

  let items: [PBRadioItem]
  let orientation: Orientation
  @Binding var selectedItem: PBRadioItem?

  // MARK: -

  public init(items: [PBRadioItem], orientation: Orientation = .vertical, selected: Binding<PBRadioItem?>) {
    self.items = items
    self.orientation = orientation
    self._selectedItem = selected
  }

  // MARK: -

  public var body: some View {
    switch orientation {
    case .vertical:
      VStack(alignment: .leading, spacing: .pbMedium) {
        ForEach(items) { item in
          Button(item.title) {
            selectedItem = item
          }
            .buttonStyle(PBRadioButtonStyle(subtitle: item.subtitle, isSelected: (selectedItem?.id == item.id)))
        }
      }

    case .horizontal:
      HStack {
        ForEach(items) { item in
          Button(item.title) {
            selectedItem = item
          }
          .buttonStyle(PBRadioButtonStyle(subtitle: item.subtitle, isSelected: selectedItem?.id == item.id))
        }
      }
      .padding()
    }
  }
}

// MARK: - PBRadioButtonStyle

public struct PBRadioButtonStyle: ButtonStyle {

  private let subtitle: String

  private let isSelected: Bool

  private var borderColor: Color {
    isSelected ? Color.pbPrimary : Color.pbBorder
  }

  private var lineWidth: CGFloat {
    isSelected ? 6 : 2
  }

  public init(subtitle: String?, isSelected: Bool) {

    self.isSelected = isSelected
    self.subtitle = subtitle ?? ""
  }

  public func makeBody(configuration: Configuration) -> some View {
    HStack(alignment: .top) {
      Circle()
        .strokeBorder(borderColor, lineWidth: lineWidth)
        .frame(width: 22, height: 22)
      VStack(alignment: .leading, spacing: 4) {
        configuration.label
          .foregroundColor(.pbTextDefault)
          .pbFont(.body)
          .frame(minHeight: 22)
        if !subtitle.isEmpty {
          Text(subtitle)
            .foregroundColor(.pbTextLight)
            .pbFont(.subcaption)
        }
      }// : VSTACK
    }// : HSTACK
    .contentShape(Rectangle())
  }
}

// MARK: - Previews

struct PBRadio_Previews: PreviewProvider {
  struct PBContentView: View {
    var orientation: Orientation = .vertical

    @State var selected: PBRadioItem? = PBRadioItem("Manor", subtitle: "This is a subtitle")

    var body: some View {
      VStack {
        VStack {
          Text("Radio example")
            .font(Font.headline)
            .padding()
        }
        PBRadio(items: [PBRadioItem("Manor", subtitle: "This is a subtitle"), .init("Chalet"), .init("Ranch"), .init("Villa")], orientation: orientation, selected: $selected)

        if let selected = selected {
          Text("You selected: \(selected.title)")
        }
      }
    }
  }

  static var previews: some View {
    PBContentView(orientation: .vertical)
    PBContentView(orientation: .horizontal)
  }
}
