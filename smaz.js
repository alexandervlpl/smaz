const _smaz = require("./_smaz");
var _smaz_compress = _smaz['cwrap']('smaz_compress', 'number', ['string', 'number', 'number', 'number']);
var _smaz_decompress = _smaz['cwrap']('smaz_decompress', 'number', ['number', 'number', 'number', 'number']);

const util = require("util");
let encoder = new util.TextEncoder();

exports.compress = function(str_in) {
  var encoded = encoder.encode(str_in);
  var out_heap = _smaz['_malloc'](str_in.length * 8);
  var out_buffer = new Uint8Array(_smaz['HEAPU8']['buffer'], out_heap, encoded.length * 8);

  var len = _smaz_compress(str_in, encoded.length, out_buffer.byteOffset, out_buffer.byteLength);
  var result = new Uint8Array(out_buffer.subarray(0, len));

  _smaz['_free'](out_buffer.byteOffset);
  return result;
}

exports.decompress = function(cmp) {
  var out_heap = _smaz['_malloc'](cmp.length * 8);
  var out_buffer = new Uint8Array(_smaz['HEAPU8']['buffer'], out_heap, cmp.length * 8);

  var in_heap = _smaz['_malloc'](cmp.length);
  var in_buffer = new Uint8Array(_smaz['HEAPU8']['buffer'], in_heap, cmp.length);
  in_buffer.set(new Uint8Array(cmp.buffer));

  var len = _smaz_decompress(in_buffer.byteOffset, cmp.length, out_buffer.byteOffset, out_buffer.byteLength);
  var result = decodeURIComponent(escape(String.fromCharCode.apply(null, out_buffer.subarray(0, len))));

  _smaz['_free'](in_buffer.byteOffset);
  _smaz['_free'](out_buffer.byteOffset);
  return result;
}
