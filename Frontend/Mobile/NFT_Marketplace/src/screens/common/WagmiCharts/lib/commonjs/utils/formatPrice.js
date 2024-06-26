"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPrice = formatPrice;
/**
 * @worklet
 */
function formatPrice({
  value: _value,
  defaultPrice: _defaultPrice = '',
  precision
}) {
  'worklet';

  let defaultPrice = _defaultPrice;
  if (typeof defaultPrice === 'number') {
    defaultPrice = defaultPrice.toString();
  }
  let value = _value || defaultPrice?.replace?.(',', '');
  if (!value) {
    return `0.00`;
  }
  let decimals = precision ?? (Number(value) < 1 ? Math.min(8, value.toString().slice(2).search(/[^0]/g) + 3) : 2);
  let res = `${Number(value).toFixed(decimals)}`;
  const vals = res.split('.');
  if (vals.length > 0) {
    res = vals[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (vals.length === 2) {
      return res + '.' + vals[1];
    }
  }
  return res;
}
//# sourceMappingURL=formatPrice.js.map