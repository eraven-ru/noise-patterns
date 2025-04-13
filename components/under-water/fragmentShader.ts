import { simplexNoise3D } from '~/assets/glsl/noiseFunctions';

export default `
    ${simplexNoise3D}

    varying vec2 vUV;

    uniform vec2 mouse;
    uniform float time;
    uniform bool raw;
    uniform float aspect;
    uniform float radius;
    uniform sampler2D surfaceTexture;

    float calcNoise(vec2 nUV, float scale, float speed) {
        return snoise(vec3(nUV, time * speed) * (1. / scale));
    }

    float circularNoise(vec2 nUV, vec2 center, float scale, float speed) {
        float nU = nUV.x / 2. + distance(nUV, center);
        float nV = nUV.y / 2. + distance(nUV, center);

        return calcNoise(vec2(nU, nV), scale, speed);
    }

    void main() {
        vec2 uv = vec2(vUV.x * aspect, vUV.y);
        vec2 center = vec2(.25, .25);

        float noise = circularNoise(uv, center, .2, .1);
        float shimmerNoise = circularNoise(uv, center, .15, .1);
        float shimmerNoise2 = circularNoise(uv, center, .2, .1);
        float circle = clamp(1. - distance(uv, center) / radius, 0. , 1.);

        vec2 texUV = aspect > 1. ? vUV : uv;

        gl_FragColor = texture2D(surfaceTexture, texUV + vec2(0., 1.) * 0.05 * (noise * circle)) * (1. - abs(noise * circle) / 2.) * 1.3;
        gl_FragColor += mix(vec4(0.), vec4(.7, .9, 1., 1.), clamp(shimmerNoise, 0., 1.) * .5);
        gl_FragColor += mix(vec4(0.), vec4(1.), pow(clamp(shimmerNoise2, 0., 1.), 8.));
        gl_FragColor -= vec4(.2);

        if (raw) {
            gl_FragColor = mix(vec4(0.), vec4(1.), noise);
            gl_FragColor += mix(vec4(0.), vec4(1.), clamp(shimmerNoise, 0., 1.) * .5);
            gl_FragColor += mix(vec4(0.), vec4(1.), pow(clamp(shimmerNoise2, 0., 1.), 8.));
            gl_FragColor -= vec4(.2);
        }
    }
`;
