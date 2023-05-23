import { type StatsTickerObserver } from './types';

export class StatsTicker {
    private readonly _observers: StatsTickerObserver[] = [];
    private readonly _step: number;

    private _lastUpdate = 0;
    private _now = 0;

    public constructor(step: number) {
        this._step = step;
        this._observers = [];
        this._now = this._lastUpdate = performance.now();
    }

    public register(observer: StatsTickerObserver): void {
        this._observers.push(observer);
    }

    public update(): void {
        this._now = performance.now();

        if (this._now > this._lastUpdate + this._step) {
            this._lastUpdate = this._now;
            this._notify();
        }
    }

    private _notify(): void {
        this._observers.forEach((o) => o());
    }
}
