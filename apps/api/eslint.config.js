import { baseConfig } from '@pavan/eslint-config';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    {
        ignores: [".wrangler/", "dist/", "worker-configuration.d.ts", "test/env.d.ts"]
    },
    ...baseConfig
]);
