module.exports = {
  name: 'stateportal',
  preset: '../../jest.config.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer'
      ]
    }
  },
  coverageDirectory: '../../coverage/apps/stateportal',
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  snapshotSerializers: [
    'ngx-jest-snapshot-serializer',
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
