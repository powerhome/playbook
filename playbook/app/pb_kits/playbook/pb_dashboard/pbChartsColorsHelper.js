import colors from "../tokens/exports/_colors.module.scss";
// Map Data Color String Props to our SCSS Variables
const mapColors = (array) => {
    const regex = /(data)\-[1-8]/; //eslint-disable-line
    const newArray = array.map((item) => {
        return regex.test(item)
            ? `${colors[`data_${item[item.length - 1]}`]}`
            : item;
    });
    return newArray;
};
export default mapColors;
//# sourceMappingURL=pbChartsColorsHelper.js.map