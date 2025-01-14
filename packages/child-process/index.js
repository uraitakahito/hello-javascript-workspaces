/* eslint-disable no-console */
// https://github.com/microsoft/playwright/blob/main/utils/build/build.js
const childProcess = require('child_process');
const path = require('path');

/**
 * @param {Step} step
 */
const runStep = (step) => {
  console.log(
    `==== Running ${step.command} ${step.args.join(' ')} in ${step.cwd || process.cwd()}`,
  );
  const out = childProcess.spawnSync(step.command, step.args, {
    stdio: 'inherit',
    shell: step.shell,
    env: {
      ...process.env,
      ...step.env,
    },
    cwd: step.cwd,
  });
  if (out.status) process.exit(out.status);
};

/** @type {Step[]} */
const steps = [];

// Update test runner.
steps.push({
  command: 'npm',
  args: ['--version'],
  shell: true,
  cwd: path.join(__dirname, '..', '..'),
});

for (const step of steps) runStep(step);
