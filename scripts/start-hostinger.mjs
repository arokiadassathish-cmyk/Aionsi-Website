import { spawn } from 'node:child_process';

const port = process.env.PORT || '3000';
const host = process.env.HOST || '0.0.0.0';

const child = spawn(process.execPath, ['./dist/server/entry.mjs'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: port,
    HOST: host,
  },
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error('Failed to start Astro server:', error);
  process.exit(1);
});
