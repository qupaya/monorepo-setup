module.exports = {
  '*.{json,css,scss,md,svg,yml,js,ts,html}': (files) => [
    `nx format:write --files=${files.join(',')}`,
  ],
  '*.{js,ts,html}': eslint,
};

// sorts files according to target project and runs eslint per project.
// this is to avoid out-of-memory issues
function eslint(files) {
  const projectSources = require('child_process')
    .execSync('npx nx show projects')
    .toString()
    .split('\n');

  const projectToFileMap = new Map([
    ['unspecified', []],
    ...projectSources.map((s) => [s, []]),
  ]);

  files.forEach((file) => {
    // we replace all '/' with '-' to be able to match it with the project names:
    // restlos-backend-ui must be found in
    // /qupaya/monorepo/apps/restlos/backend-ui/src/app/app.component.html

    const dasherizedFilePath = file.replace(/\//g, '-');
    const key =
      projectSources.find((projectSource) =>
        dasherizedFilePath.includes(projectSource)
      ) || 'unspecified';

    projectToFileMap.get(key).push(file);
  });

  const allEslintCommands = Array.from(projectToFileMap.entries())
    .filter(([, value]) => value.length !== 0)
    .map(([_key, values]) => `eslint --quiet ${values.join(' ')}`);

  return [...allEslintCommands];
}
