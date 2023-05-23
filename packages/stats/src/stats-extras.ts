import { AbstractPanel } from './stats-panel';
import { patch } from './utils';

type RenderingContext = WebGLRenderingContext | WebGL2RenderingContext;

export class FPSPanel extends AbstractPanel {
    private _currTime = 0;
    private _prevTime = 0;
    private _frames = 0;

    public get value(): number {
        return (this._frames * 1000) / (this._currTime - this._prevTime);
    }

    public get maxValue(): number {
        return 100;
    }

    public update(): void {
        this._frames++;
        this._currTime = performance.now();
    }

    public render(): void {
        super.render();
        this.reset();
    }

    public reset(): void {
        this._prevTime = this._currTime;
        this._frames = 0;
    }

    public onInstall(): void {
        //
    }

    public onUninstall(): void {
        //
    }
}

export class MemoryPanel extends AbstractPanel {
    private _memory!: typeof performance.memory;

    public constructor(name: string, fg: string, bg: string) {
        super(name, fg, bg);
    }

    public get value(): number {
        return this._memory.usedJSHeapSize / 1048576;
    }

    public get maxValue(): number {
        return this._memory.jsHeapSizeLimit / 1048576;
    }

    public update(): void {
        //
    }

    public reset(): void {
        //
    }

    public onInstall(): void {
        this._memory = performance.memory ?? {
            jsHeapSizeLimit: -1,
            totalJSHeapSize: -1,
            usedJSHeapSize: -1,
        };
    }

    public onUninstall(): void {
        //
    }
}

export class DrawCallsPanel extends AbstractPanel {
    private readonly _originDrawElements: RenderingContext['drawElements'];
    private readonly _gl: RenderingContext;

    private _drawPasses = 0;

    public constructor(name: string, fg: string, bg: string, gl: RenderingContext) {
        super(name, fg, bg);

        this._gl = gl;
        this._originDrawElements = this._gl.drawElements;
    }

    public get value(): number {
        return this._drawPasses;
    }

    public get maxValue(): number {
        return 100;
    }

    public update(): void {
        this.reset();
    }

    public reset(): void {
        this._drawPasses = 0;
    }

    public onInstall(): void {
        this._gl.drawElements = patch(this._gl.drawElements, () => {
            this._drawPasses++;
        });
    }

    public onUninstall(): void {
        this._gl.drawElements = this._originDrawElements;
    }
}

export class TexturesPanel extends AbstractPanel {
    private readonly _originBindTexture: RenderingContext['bindTexture'];
    private readonly _gl: RenderingContext;

    private _bindTextures = 0;

    public constructor(name: string, fg: string, bg: string, gl: RenderingContext) {
        super(name, fg, bg);

        this._gl = gl;
        this._originBindTexture = this._gl.bindTexture;
    }

    public get value(): number {
        return this._bindTextures;
    }

    public get maxValue(): number {
        return 100;
    }

    public update(): void {
        this.reset();
    }

    public reset(): void {
        this._bindTextures = 0;
    }

    public onInstall(): void {
        this._gl.bindTexture = patch(this._gl.bindTexture, () => {
            this._bindTextures++;
        });
    }

    public onUninstall(): void {
        this._gl.bindTexture = this._originBindTexture;
    }
}

export class ProgramsPanel extends AbstractPanel {
    private readonly _originUseProgram: RenderingContext['useProgram'];
    private readonly _gl: RenderingContext;

    private _usePrograms = 0;

    public constructor(name: string, fg: string, bg: string, gl: RenderingContext) {
        super(name, fg, bg);

        this._gl = gl;
        this._originUseProgram = this._gl.useProgram;
    }

    public get value(): number {
        return this._usePrograms;
    }

    public get maxValue(): number {
        return 100;
    }

    public update(): void {
        this.reset();
    }

    public reset(): void {
        this._usePrograms = 0;
    }

    public onInstall(): void {
        this._gl.useProgram = patch(this._gl.useProgram, () => {
            this._usePrograms++;
        });
    }

    public onUninstall(): void {
        this._gl.useProgram = this._originUseProgram;
    }
}
