/*
 * Copyright © 2017, Rezo Zero
 *
 * @file vite.config.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'StartingBlocks',
            // the proper extensions will be added
            fileName: 'starting-blocks',
            formats: ['amd', 'cjs', 'es', 'iife', 'umd'],
        },
        rollupOptions: {
            output: {
                exports: 'named',
            }
        }
    }
})
