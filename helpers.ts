import fs from 'fs';
import path from 'path';

interface Config {
    settingA: string;
    settingB: number;
    settingC: boolean;
}

const defaultConfig: Config = {
    settingA: 'defaultA',
    settingB: 10,
    settingC: true,
};

function loadConfig(filePath: string): Config {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
        console.warn(`Config file not found, using defaults.`);
        return defaultConfig;
    }
    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    const userConfig: Partial<Config> = JSON.parse(fileContent);
    return { ...defaultConfig, ...userConfig };
}

export { loadConfig, Config };