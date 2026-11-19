/* Signed distance field from canvas coverage (alpha), TinySDF-style:
   exact Euclidean distance transform (Felzenszwalb & Huttenlocher) with
   sub-pixel seeding from anti-aliased coverage.
   Returns Float32Array, distance in pixels: > 0 outside the shape, < 0 inside. */
(function(){
var INF = 1e20;

function edt1d(grid, offset, stride, length, f, v, z) {
  var q, k, s, r;
  v[0] = 0; z[0] = -INF; z[1] = INF;
  for (q = 0; q < length; q++) f[q] = grid[offset + q * stride];
  for (q = 1, k = 0, s = 0; q < length; q++) {
    do {
      r = v[k];
      s = (f[q] - f[r] + q * q - r * r) / (q - r) / 2;
    } while (s <= z[k] && --k > -1);
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  for (q = 0, k = 0; q < length; q++) {
    while (z[k + 1] < q) k++;
    r = v[k];
    grid[offset + q * stride] = f[r] + (q - r) * (q - r);
  }
}

function edt(grid, w, h) {
  var n = Math.max(w, h);
  var f = new Float64Array(n), v = new Uint16Array(n), z = new Float64Array(n + 1);
  for (var x = 0; x < w; x++) edt1d(grid, x, w, h, f, v, z);
  for (var y = 0; y < h; y++) edt1d(grid, y * w, 1, w, f, v, z);
}

/* rgba: Uint8ClampedArray from getImageData (alpha channel used). */
window.computeSDF = function(rgba, w, h) {
  var n = w * h, outer = new Float64Array(n), inner = new Float64Array(n), i, a, d;
  for (i = 0; i < n; i++) {
    a = rgba[i * 4 + 3] / 255;
    if (a >= 1) { outer[i] = 0; inner[i] = INF; }
    else if (a <= 0) { outer[i] = INF; inner[i] = 0; }
    else { d = 0.5 - a; outer[i] = d > 0 ? d * d : 0; inner[i] = d < 0 ? d * d : 0; }
  }
  edt(outer, w, h); edt(inner, w, h);
  var out = new Float32Array(n);
  for (i = 0; i < n; i++) out[i] = Math.sqrt(outer[i]) - Math.sqrt(inner[i]);
  return out;
};
})();
