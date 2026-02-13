uniform vec3 topColor;
uniform vec3 bottomColor;

varying vec2 vUv;

void main() {
  vec3 color = mix(bottomColor, topColor, vUv.y);
  gl_FragColor = vec4(color, 1.0);
}
