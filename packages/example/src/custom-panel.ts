import { AbstractPanel } from '@gameastic/stats';

export class CustomPanel extends AbstractPanel {
    public reset(): void {
        //
    }

    public update(): void {
        //
    }

    public onInstall(): void {
        //
    }

    public onUninstall(): void {
        //
    }

    public get value(): number {
        return 1;
    }

    public get maxValue(): number {
        return 100;
    }
}
