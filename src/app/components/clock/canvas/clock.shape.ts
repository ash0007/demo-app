export interface IPoint {
    x: number;
    y: number;
}
export interface ILineConfig {
    from: IPoint;
    to: IPoint;
    graphics?: any;
}
export interface ICircleConfig {
    position: IPoint;
    radius: number;
    graphics?: any;
}
export interface ITextConfig {
    position: IPoint;
    graphics?: any;
}
export class Clock {
    public static createLine(context: CanvasRenderingContext2D, lineConfig?: ILineConfig) {
        const from = { x: lineConfig?.from?.x || 0, y: lineConfig?.from?.y || 0 };
        const to = { x: lineConfig?.to?.x || window.innerWidth/2, y: lineConfig?.to?.y || window.innerHeight/2 };
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = lineConfig?.graphics?.strokeStyle || '#aaa';
        context.lineWidth = lineConfig?.graphics?.lineWidth || 5;
        context.stroke();
    }
    public static createCircle(context: CanvasRenderingContext2D, circleConfig?: ICircleConfig): CanvasRenderingContext2D {
        const x = circleConfig?.position?.x || window.innerWidth / 2;
        const y = circleConfig?.position?.y || window.innerHeight / 2;
        const radius = circleConfig?.radius || 100;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.strokeStyle = circleConfig?.graphics?.strokeStyle || '#aaa';
        context.lineWidth = circleConfig?.graphics?.lineWidth || 5;
        context.stroke();
        return context;
    }
    public static createText(context: CanvasRenderingContext2D, n: number, textConfig?: ITextConfig) {
        context.font = textConfig?.graphics?.font || '10em Time New Roman';
        context.lineWidth = 1;
        context.strokeText(n.toString(), 50, 100);

    }
}