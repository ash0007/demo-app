import { Graphics, Shape, Text } from "createjs-module";

interface ICenter {
    x: number;
    y: number;
}
export interface IStrokeStyle {
    width: number;
    caps?: 'round' | 'butt' | 'square';
    joints?: 'round' | 'bevel' | 'miter';
    miterLimit?: number
}
export type IPoint = ICenter;

export class CreateJS_Shapes {
    public static getLine(from: IPoint, to: IPoint, strokeStyle?: IStrokeStyle, graphicsColors?: any): Shape {
        const line = this.getGraphics(graphicsColors?.fillColor, graphicsColors?.strokeColor, strokeStyle).moveTo(from.x, from.y).lineTo(to.x, to.y);
        const shape = new Shape(line);
        return shape;
    }

    public static getCircle(x: number, y: number, radius: number, strokeStyle?: IStrokeStyle, graphicsColor?: any): Shape {
        const graphics = this.getGraphics(graphicsColor?.fillColor, graphicsColor?.strokeColor, strokeStyle).drawCircle(x, y, radius);
        const circle = new Shape(graphics);
        return circle;
    }

    public static getRect(x: number, y: number, w: number, h: number) {
        const graphics = this.getGraphics().drawRect(x, y, w, h);
        const rect = new Shape(graphics);
        return rect;
    }

    public static getText(n: number, position: IPoint, font?: any, textColor?: string): Text {
        const text = new Text(n.toString(), font || '20px Arial', textColor || "#000");
        text.x = position.x;
        text.y = position.y;
        return text;
    }

    public static getGraphics(fillColor?: string, strokeColor?: string, strokeStyle?: IStrokeStyle): Graphics {
        const circleConfig = {
            beginFill: fillColor || '#ddd',
            beginStroke: strokeColor || '#000',
        };
        const graphics = new Graphics().beginFill(circleConfig.beginFill).beginStroke(circleConfig.beginStroke).setStrokeStyle(strokeStyle?.width || 1, strokeStyle?.caps || 'round');
        return graphics;
    }
}