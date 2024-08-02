import colors from '../tokens/exports/_colors.module.scss';
const mapTheme = {
    marker: colors.primary_action,
    maptiles: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    flyToConfig: {
        zoom: 13,
        bearing: 0,
        curve: 1.42, // change the speed at which it zooms
        easing: function (t) {
            return t;
        },
        essential: true
    },
    zoomConfig: { duration: 1000 },
    mapConfig: {
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        zoom: 13,
        attributionControl: false,
    }
};
export default mapTheme;
//# sourceMappingURL=pbMapTheme.js.map