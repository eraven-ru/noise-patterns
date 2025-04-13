import { simplexNoise2D, simplexNoise3D } from '~/assets/glsl/noiseFunctions';

export default `
    ${simplexNoise2D}
    ${simplexNoise3D}

    varying vec2 vUV;

    uniform vec2 mouse;
    uniform float time;
    uniform float radius;
    uniform float aspect;

    float calcNoise(float nX, float nY, float scale, float speed, float brightness) {
        return snoise(vec3(nX, nY, time * speed) * (1. / scale)) * brightness;
    }

    void main() {
        vec2 uv = vec2(vUV.x * aspect, vUV.y);

        float edgeNoise = snoise2(vec2(uv.x, time * .1) * (1. / .3));
        float bottomLimit = .3 + .1 * edgeNoise;
        float topLimit = .8 + .1 * edgeNoise;

        float plane = uv.y > bottomLimit && uv.y < topLimit ? 1. : 0.;
        if (plane == 0.) {
            plane += 1. - clamp(bottomLimit - uv.y, 0., .1) / .1;
        }

        float noise_1 = calcNoise(uv.x * 3., uv.y / 20., .03, .01, .5);
        float noise_2 = calcNoise((uv.x + .5) * 3., uv.y / 5., .2, .05, 1.);
        float noise_3 = calcNoise((uv.x + 2.) * 4., uv.y / 10., .1, .03, 1.);

        float noise_4 = calcNoise(uv.x * 2., uv.y / 2., .8, .1, 2.);
        float noise_5 = calcNoise((uv.x + .2) * 2., uv.y / 2., .6, .1, 2.);
        float noise_6 = calcNoise((uv.x + .3) * 2., uv.y / 2., .6, .1, 2.);

        vec4 base_c_1 = normalize(vec4(14., 0., 68., 255.));
        vec4 base_c_2 = normalize(vec4(2., 0., 22., 255.));

        vec4 color_1 = normalize(vec4(24., 255., 212., 255.));
        vec4 color_2 = normalize(vec4(152., 118., 255., 255.));
        vec4 color_3 = normalize(vec4(78., 212., 255., 255.));
        vec4 color_4 = normalize(vec4(42., 255., 110., 255.));

        gl_FragColor = mix(base_c_2, base_c_1, (uv.x + uv.y) / 2.);

        gl_FragColor += mix(vec4(0.), color_1, clamp(noise_1 - pow(uv.y, 2.) * .7, 0., 1.) * plane * .7);
        gl_FragColor += mix(vec4(0.), color_2, clamp(noise_2 - pow(uv.y, 2.), 0., 1.) * plane);
        gl_FragColor += mix(vec4(0.), color_3, clamp(noise_3 - pow(uv.y, 2.), 0., 1.) * plane);
        gl_FragColor += mix(vec4(0.), color_1, clamp(noise_4 - uv.y * 2.2, 0., 1.) * plane);
        gl_FragColor += mix(vec4(0.), color_1, clamp(noise_5 - uv.y * 2.2, 0., 1.) * plane);
        gl_FragColor += mix(vec4(0.), color_4, clamp(noise_6 - uv.y * 2.2, 0., 1.) * plane);
    }
`;
