module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'header-max-length': [0, 'always', 100],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'chore',
        'release',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'common',
        'restlos-admin', // platform-admin related changes
        'restlos-billing', // billing related changes
        'restlos-platform',
        'restlos-shared',
        'restlos-pickup',
        'restlos-lambda',
        'restlos-keycloak',
        'restlos-e2e',
        'storybook',
      ],
    ],
  },
};
