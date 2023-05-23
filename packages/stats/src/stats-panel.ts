import { type IStatsPanel } from './types';

export abstract class AbstractPanel implements IStatsPanel {
    private readonly _name: string;
    private readonly _bg: string;
    private readonly _fg: string;
    private readonly _pr: number;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _textX: number;
    private readonly _textY: number;
    private readonly _graphX: number;
    private readonly _graphY: number;
    private readonly _graphWidth: number;
    private readonly _graphHeight: number;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;

    private _max: number;
    private _min: number;

    public constructor(name: string, fg: string, bg: string) {
        this._name = name;
        this._fg = fg;
        this._bg = bg;
        this._min = Infinity;
        this._max = 0;

        const pr = (this._pr = Math.round(window.devicePixelRatio ?? 1));
        const width = (this._width = 80 * pr);
        const height = (this._height = 48 * pr);
        const textX = (this._textX = 3 * pr);
        const textY = (this._textY = 2 * pr);
        const graphX = (this._graphX = 3 * pr);
        const graphY = (this._graphY = 15 * pr);
        const graphWidth = (this._graphWidth = 74 * pr);
        const graphHeight = (this._graphHeight = 30 * pr);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.cssText = 'width:80px;height:48px';

        const context = canvas.getContext('2d')!;
        context.font = `bold ${9 * pr}px Helvetica,Arial,sans-serif`;
        context.textBaseline = 'top';

        context.fillStyle = bg;
        context.fillRect(0, 0, width, height);

        context.fillStyle = fg;
        context.fillText(name, textX, textY);
        context.fillRect(graphX, graphY, graphWidth, graphHeight);

        context.fillStyle = bg;
        context.globalAlpha = 0.9;
        context.fillRect(graphX, graphY, graphWidth, graphHeight);

        this._canvas = canvas;
        this._context = context;
    }

    public get dom(): HTMLCanvasElement {
        return this._canvas;
    }

    public render(): void {
        const {
            _context: context,
            _canvas: canvas,
            _name: name,
            _bg: bg,
            _fg: fg,
            _pr: pr,
            _width: width,
            _textX: textX,
            _textY: textY,
            _graphX: graphX,
            _graphY: graphY,
            _graphWidth: graphWidth,
            _graphHeight: graphHeight,
        } = this;

        this._min = Math.min(this._min, this.value);
        this._max = Math.max(this._max, this.value);

        context.fillStyle = bg;
        context.globalAlpha = 1;
        context.fillRect(0, 0, width, graphY);
        context.fillStyle = fg;
        context.fillText(
            `${Math.round(this.value)} ${name} ${+Math.round(this._min)}-${Math.round(this._max)}`,
            textX,
            textY
        );

        context.drawImage(
            canvas,
            graphX + pr,
            graphY,
            graphWidth - pr,
            graphHeight,
            graphX,
            graphY,
            graphWidth - pr,
            graphHeight
        );

        context.fillRect(graphX + graphWidth - pr, graphY, pr, graphHeight);

        context.fillStyle = bg;
        context.globalAlpha = 0.9;
        context.fillRect(
            graphX + graphWidth - pr,
            graphY,
            pr,
            Math.round((1 - this.value / this.maxValue) * graphHeight)
        );
    }

    public abstract reset(): void;
    public abstract update(): void;
    public abstract onInstall(): void;
    public abstract onUninstall(): void;
    public abstract get value(): number;
    public abstract get maxValue(): number;
}
