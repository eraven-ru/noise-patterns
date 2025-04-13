import { simplexNoise3D } from '~/assets/glsl/noiseFunctions';

export default `
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

        float brightness = 1.;
        float scale = .18;
        float speed = .2;

        float circle = clamp(1. - distance(vec2(mouse.x, 0.), uv) / radius, 0. , 1.);

        float bigNoise = calcNoise(uv.x * 2., uv.y / 2., .4, .2, 1.);
        float mediumNoise = calcNoise(uv.x * 2., uv.y / 2., .2, .2, 1.);
        float minimalNoise = calcNoise(uv.x * 2., uv.y / 2.2, .16, .2, 1.);

        float lightedBigNoise = snoise(vec3(uv.x * 2., uv.y / 2., (time - 2.) * speed) * (1. / .4)) * .3;
        float lightedMediumNoise = snoise(vec3(uv.x * 2., uv.y / 2., (time - 2.) * speed) * (1. / .2)) * .3;
        float lightedMinimalNoise = snoise(vec3(uv.x * 2., uv.y / 2., (time - 2.) * speed) * (1. / .16)) * .3;

        vec4 lightColor = normalize(vec4(242., 192., 12., 255.));
        vec4 mediumColor = normalize(vec4(222., 102., 1., 255.));
        vec4 mainColor = normalize(vec4(176., 38., 6., 255.));

        gl_FragColor = mix(vec4(0.), lightColor, clamp(bigNoise, 0., 1.)) 
        + mix(vec4(0.), mediumColor, mediumNoise) 
        + mix(vec4(0.), mainColor, minimalNoise);

        gl_FragColor += mix(vec4(0.), lightColor, lightedBigNoise + circle) 
        + mix(vec4(0.), mediumColor, lightedMediumNoise + circle) 
        + mix(vec4(0.), mainColor, lightedMinimalNoise + circle);
    }
`;
