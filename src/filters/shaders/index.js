import {GLSL, Shaders} from "gl-react";

const filterShaders = Shaders.create({
    Saturate: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        uniform float contrast, saturation, brightness;
        const vec3 L = vec3(0.2125, 0.7154, 0.0721);
        void main() {
          vec4 c = texture2D(t, uv);
            vec3 brt = c.rgb * brightness;
            gl_FragColor = vec4(mix(
            vec3(0.5),
            mix(vec3(dot(brt, L)), brt, saturation),
            contrast), c.a);
        }
        `
    },
    Amaro: {
        frag: GLSL`
      precision highp float;
      varying highp vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
    },
    Brannan: {
        frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      mat3 saturateMatrix = mat3(
                                1.105150,
                                -0.044850,
                                -0.046000,
                                -0.088050,
                                1.061950,
                                -0.089200,
                                -0.017100,
                                -0.017100,
                                1.132900);
      vec3 luma = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 lookup;
        lookup.y = 0.5;
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;
        texel = saturateMatrix * texel;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        vec3 sampled;
        lookup.y = 0.5;
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture3, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture3, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture3, lookup).b;
        float value = smoothstep(0.0, 1.0, d);
        texel = mix(sampled, texel, value);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture4, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture4, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture4, lookup).b;
        lookup.x = dot(texel, luma);
        texel = mix(texture2D(inputImageTexture5, lookup).rgb, texel, .5);
        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture6, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture6, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture6, lookup).b;
        gl_FragColor = vec4(texel, 1.0);
      }`
    }
});

export default filterShaders;
