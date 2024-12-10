export const INPUTMASKS = {
    currency: {
        format: (value: string) => {
            const v = value.replace(/[^0-9]/g, "").slice(0, 15)
            if (v === "") {
                return "";
            }
            const numericValue = parseFloat((parseInt(v) / 100).toFixed(2));
            if (numericValue === 0) {
                return "";
            }
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
            }).format(numericValue);
        },
        // eslint-disable-next-line no-useless-escape
        pattern: '^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$',
        placeholder: '$0.00',
    },
    zipCode: {
        format: (value: string) => {
            const v = value.replace(/\D/g, '').slice(0, 5)
            return v
        },
        pattern: '\\d{5}',
        placeholder: '12345',
    },
    postalCode: {
        format: (value: string) => {
            const v = value.replace(/\D/g, '').slice(0, 9)
            return v.replace(/(\d{5})(?=\d)/, '$1-')
        },
        pattern: '\\d{5}-\\d{4}',
        placeholder: '12345-6789',
    },
    ssn: {
        format: (value: string) => {
            const v = value.replace(/\D/g, '').slice(0, 9)

            return v
                .replace(/(\d{5})(?=\d)/, '$1-')
                .replace(/(\d{3})(?=\d)/, '$1-')
        },
        pattern: '\\d{3}-\\d{2}-\\d{4}',
        placeholder: '123-45-6789',
    },
}