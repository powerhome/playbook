//
//  PBTimestamp.swift
//  
//
//  Created by Alexandre Hauber on 29/07/21.
//

import SwiftUI

public struct PBTimestamp: View {

    // MARK: Props
    let timestamp: Date // mandatory
    let amPmStyle: AmPmStyle
    let showDate: Bool
    let showTimeZone: Bool
    let showUser: Bool
    let text: String?
    let timeZone: String?
    let variant: Variant
    //

    public init(_ timestamp: Date, amPmStyle: AmPmStyle = .short, showDate: Bool = true, showTimeZone: Bool = false, showUser: Bool = false, text: String? = nil, timeZone: String? = nil, variant: Variant = .standard) {
        self.timestamp = timestamp
        self.amPmStyle = amPmStyle
        self.showDate = showDate
        self.showTimeZone = showTimeZone
        self.showUser = showUser
        self.text = text
        self.timeZone = timeZone
        self.variant = variant
    }

    var editedTimestamp: String {
        var text = " "
        switch variant {
        case .elapsed: text = "Last updated \(userDisplay)\(formattedElapsed)"
        case .updated: text = "Last updated \(userDisplay)on \(formattedUpdated)"
        default: text = formattedDefault
        }
        return text
    }

    var formattedDefault: String {
        let formatter = DateFormatter()

        if showDate {
            let inputDate = Calendar.current.dateComponents([.year], from: timestamp)
            let currentDate = Calendar.current.dateComponents([.year], from: Date())

            if let inputYear = inputDate.year, let currentYear = currentDate.year, inputYear > currentYear {
                formatter.dateFormat = "MMM d, YYYY \u{00b7} h:mma"
            } else {
            formatter.dateFormat = "MMM d \u{00b7} h:mma"
            }
        } else {
            formatter.dateFormat = "h:mma"
        }

        if let timeZone = timeZone, showTimeZone {
            formatter.timeZone = TimeZone(identifier: timeZone)
            formatter.dateFormat.append(" z")
        }

        if amPmStyle == .short {
            formatter.amSymbol = "a"
            formatter.pmSymbol = "p"
        } else {
            formatter.amSymbol = "am"
            formatter.pmSymbol = "pm"
        }

       return formatter.string(from: timestamp)
    }

    var formattedElapsed: String {
        let formatter = RelativeDateTimeFormatter()
        formatter.dateTimeStyle = .named
        formatter.unitsStyle = .full

        return formatter.localizedString(for: timestamp, relativeTo: Date())
    }

    var formattedUpdated: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM d 'at' h:mma"

        if amPmStyle == .short {
            formatter.amSymbol = "a"
            formatter.pmSymbol = "p"
        } else {
            formatter.amSymbol = "am"
            formatter.pmSymbol = "pm"
        }

        return formatter.string(from: timestamp)
    }

    var userDisplay: String {
        if let text = text, showUser {
            return "by \(text) "
        } else {
            return ""
        }
    }

    public var body: some View {
        Text(editedTimestamp).pbFont(.subcaption)
    }
}

public extension PBTimestamp {
    enum AmPmStyle {
        case short
        case full
    }

    enum Variant {
        case elapsed
        case standard
        case updated
    }
}

struct PBTimestamp_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return Group {
            VStack(alignment: .leading, spacing: nil, content: {
                Text("Default").pbFont(.caption)

                PBTimestamp(Date.init(), showDate: false)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date.init())
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(31536000))
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
            }).padding().previewDisplayName("Default")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Alignments").pbFont(.caption)
                PBTimestamp(Date.init(), showDate: false)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date.init())
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(31536000))
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)

                PBTimestamp(Date.init(), showDate: false)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .center)
                PBTimestamp(Date.init())
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .center)
                PBTimestamp(Date().addingTimeInterval(31536000))
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .center)

                PBTimestamp(Date.init(), showDate: false)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .trailing)
                PBTimestamp(Date.init())
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .trailing)
                PBTimestamp(Date().addingTimeInterval(31536000))
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .trailing)
            }).padding().previewDisplayName("Alignments")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Timezones").pbFont(.caption)

                PBTimestamp(Date.init(), showDate: false, showTimeZone: true, timeZone: "America/New_York")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date.init(), showTimeZone: true, timeZone: "America/New_York")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(31536000), showTimeZone: true, timeZone: "America/New_York")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)

                PBTimestamp(Date.init(), showDate: false, showTimeZone: true, timeZone: "Asia/Hong_Kong")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date.init(), showTimeZone: true, timeZone: "Asia/Hong_Kong")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(31536000), showTimeZone: true, timeZone: "Asia/Hong_Kong")
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
            }).padding().previewDisplayName("Timezones")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Last Updated By").pbFont(.caption)

                PBTimestamp(Date().addingTimeInterval(-12), showUser: true, text: "Andrew Koeckler", variant: .updated)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(-12), variant: .updated)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
            }).padding().previewDisplayName("Last Updated By")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Time Ago").pbFont(.caption)

                PBTimestamp(Date().addingTimeInterval(-10), showUser: true, text: "Andrew Koeckler", variant: .elapsed)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                PBTimestamp(Date().addingTimeInterval(-88000), variant: .elapsed)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
            }).padding().previewDisplayName("Time Ago")
        }
    }
}
