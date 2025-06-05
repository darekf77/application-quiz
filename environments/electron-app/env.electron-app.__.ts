import type { EnvOptions } from 'tnp/src';
import baseEnv from '../../env';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  build: {
    angularProd: false, // Set to true for production builds
  },
};
export default env;
