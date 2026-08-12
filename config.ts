interface GameConfig {  title: string;  version: string;  maxPlayers: number;  serverInfo: ServerConfig;  features: string[];}

interface ServerConfig {  host: string;  port: number;}

const defaultConfig: GameConfig = {  title: 'Epic Adventure',  version: '1.0.0',  maxPlayers: 20,  serverInfo: { host: 'localhost', port: 8080 },  features: ['multiplayer', 'leaderboards', 'custom skins']};

function loadConfig(config: Partial<GameConfig>): GameConfig {  return { ...defaultConfig, ...config };}

function getConfigValue<K extends keyof GameConfig>(key: K): GameConfig[K] {  return defaultConfig[key];}

export { GameConfig, ServerConfig, defaultConfig, loadConfig, getConfigValue };