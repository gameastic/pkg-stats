import { type AbstractPanel } from './stats-panel';
import { StatsTicker } from './stats-ticker';
import { type IStatsConfig } from './types';

export class Stats {
    private readonly _parent: HTMLDivElement;
    private readonly _panels: AbstractPanel[];
    private readonly _ticker: StatsTicker;

    private _activePanelID: number;

    public constructor(private readonly _config: IStatsConfig) {
        this._panels = [];

        this._activePanelID = 0;

        this._ticker = new StatsTicker(this._config.renderStep);
        this._ticker.register(this._render);

        this._parent = document.createElement('div');
        this._parent.style.cssText = this._config.css;

        this._addParentClickListener();
    }

    public get dom(): HTMLDivElement {
        return this._parent;
    }

    public get panels(): AbstractPanel[] {
        return this._panels;
    }

    public addPanel<T extends AbstractPanel>(panel: T): T {
        this._hidePanels();

        this._parent.appendChild(panel.dom);
        this._panels.push(panel);
        panel.onInstall();

        this.showPanel(this._activePanelID);

        return panel;
    }

    public removePanel<T extends AbstractPanel>(panel: T): T {
        this._parent.removeChild(panel.dom);
        this._panels.splice(this._panels.indexOf(panel), 1);
        panel.onUninstall();

        return panel;
    }

    public showPanel(id: number): void {
        this._hidePanels();
        this._panels[(this._activePanelID = id)].dom.style.display = 'block';
    }

    public readonly update = (): void => {
        this._ticker.update();
        this._panels.forEach((p) => p.update());
    };

    private readonly _render = (): void => {
        this._panels.forEach((p) => p.render());
    };

    private _hidePanels(): void {
        this._panels.forEach((p) => (p.dom.style.display = 'none'));
    }

    private _addParentClickListener(): void {
        this._parent.addEventListener(
            'click',
            (event) => {
                event.preventDefault();
                this.showPanel(++this._activePanelID % this._parent.children.length);
            },
            false
        );
    }
}
