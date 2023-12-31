import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [vue()],
    resolve: {
        alias: {'@': src, '@test': test}
    },
    build: {
        lib: {
            entry: `${src}/index.ts`,
            name: 'LktTable',
            fileName: (format) => `lkt-table.${format}.js`
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: ['vue', 'vuedraggable', 'lkt-string-tools', 'lkt-events', 'lkt-ts-interfaces'],
            output: {
                globals: {
                    vue: 'Vue',
                    vuedraggable: 'draggable',
                    "lkt-string-tools": 'LktStringTools',
                    "lkt-ts-interfaces": 'LktTsInterfaces',
                    "lkt-events": 'LktEvents'
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: ['text', 'lcov']
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${snapshots}/${path[0]}/${path[1]}${snapExtension}`;
        }
    }
};