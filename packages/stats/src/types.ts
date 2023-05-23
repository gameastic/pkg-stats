export interface IStatsConfig {
    renderStep: number;
    css: string;
}

export interface IStatsPanel {
    value: number;
    maxValue: number;
    update: () => void;
    reset: () => void;
    onInstall: () => void;
    onUninstall: () => void;
}

export type StatsTickerObserver = (...args: unknown[]) => void;
