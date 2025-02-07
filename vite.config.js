import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
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
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'lkt-http-client',
                'lkt-date-tools',
                'lkt-string-tools',
                'lkt-events',
                'lkt-loader',
                'lkt-button',
                'lkt-paginator',
                'lkt-field',
                'lkt-ts-interfaces',
                'lkt-data-state',
                'lkt-i18n',
                'sortablejs',
                'sortable',
                'lkt-vue-kernel',
            ],
            output: {
                globals: {
                    vue: 'Vue',
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