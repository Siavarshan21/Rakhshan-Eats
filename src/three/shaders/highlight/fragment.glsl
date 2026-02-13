uniform vec3 glowColor;
uniform float intensity;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float rimFactor = 1.0 - max(dot(viewDir, vNormal), 0.0);
  rimFactor = pow(rimFactor, 2.0) * intensity;
  gl_FragColor = vec4(glowColor * rimFactor, rimFactor);
}
