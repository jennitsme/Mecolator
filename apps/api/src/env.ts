import { loadConfig, type AppEnv } from '@config/load';

export function loadEnv(): AppEnv {
  return loadConfig();
}
