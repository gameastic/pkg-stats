import { DrawCallsPanel, FPSPanel, MemoryPanel, ProgramsPanel, Stats, TexturesPanel } from '@gameastic/stats';
import { CustomPanel } from './custom-panel';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        // eslint-disable-next-line no-new
        new (class {
            private readonly _stats!: Stats;
            private readonly _gl!: typeof WebGL2RenderingContext.prototype | typeof WebGLRenderingContext.prototype;

            public constructor() {
                this._gl = WebGL2RenderingContext.prototype ?? WebGLRenderingContext.prototype;
                this._stats = new Stats({
                    renderStep: 500,
                    css: 'position:absolute;top:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9;transform:scale(2)',
                });

                document.body.appendChild(this._stats.dom);
                this._initPanels();
                this._raf();
            }

            private _initPanels(): void {
                this._stats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
                this._stats.addPanel(new MemoryPanel('MB', '#f08', '#201'));
                this._stats.addPanel(new DrawCallsPanel('DC', '#f60', '#300', this._gl));
                this._stats.addPanel(new TexturesPanel('TS', '#0c6', '#033', this._gl));
                this._stats.addPanel(new ProgramsPanel('PS', '#fcdd90', '#805f0d', this._gl));
                this._stats.addPanel(new CustomPanel('Custom', '#fcdd90', '#805f0d'));

                /* Pixi */
                // this._stats.addPanel(new DisplayObjectsPanel('DO', '#fcdd90', '#805f0d'));

                /* Three */
                // this._stats.addPanel(new ThreeGeometriesPanel('GS', '#222', '#0ff', app.three));
            }

            private readonly _raf = (): void => {
                this._stats.update();
                requestAnimationFrame(this._raf);
            };
        })();
    },
    false
);
