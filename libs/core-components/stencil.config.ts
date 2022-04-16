import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
 import { defaultExtractor } from 'tailwindcss/lib/lib/defaultExtractor';
import tailwindConf from './tailwind.config';
import purgecss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';

import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];

import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'core-components',
  taskQueue: 'async',
  
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },

    reactOutputTarget({
      componentCorePackage: '@demo/core-components',
      proxiesFile:
        '../../../libs/core-components-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),
    

    angularOutputTarget({
      componentCorePackage: '@demo/core-components',
      directivesProxyFile:
        '../../../libs/core-components-angular/src/generated/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],

  plugins: [
    sass(),
    tailwind({
      tailwindConf,
      tailwindCssPath: './src/styles/tailwind.css',
      postcss: {
        plugins: [
          tailwindcss(),
          purgecss({
            content: ['./**/*.tsx'],
            safelist: [
              ':root',
              ':host',
              ':shadow',
              '/deep/',
              '::part',
              '::theme'
            ],
            defaultExtractor
          }),
          autoprefixer(),
        ]
      } 
    }),
  ],
  devServer: {
    reloadStrategy: 'pageReload'
  }
};
