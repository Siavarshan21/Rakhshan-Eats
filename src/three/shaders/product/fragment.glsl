uniform vec3 color;
uniform float opacity;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec3 light = normalize(vec3(0.5, 1.0, 0.5));
  float diffuse = max(dot(vNormal, light), 0.0);
  vec3 finalColor = color * (0.3 + 0.7 * diffuse);
  gl_FragColor = vec4(finalColor, opacity);
}
