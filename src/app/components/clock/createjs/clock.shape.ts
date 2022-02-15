import { Container, Shape } from "createjs-module";
import { IAnimateShape } from "src/app/interfaces/shape-object-interfaces";
import { CreateJS_Shapes, IPoint, IStrokeStyle } from "./create-js-shapes";

export interface IClock {
    container: Container;
    radius: number;
    position: IPoint
}

export class Clock implements IAnimateShape {
    container: Container;
    // private clockObj: any;
    private name: string;
    hands: { [key: string]: Container | Shape };
    private radius: number;

    position: IPoint;

    constructor(_radius: number, _position: IPoint, _name: string) {
        this.name = _name;
        this.position = _position;
        this.radius = _radius;
        this.create();
        // this.clockObj = _clockObj;
    }

    public animate(frameRate: number): void {
        this.hands['secondHand'].rotation += 6/frameRate;
        this.hands['minuteHand'].rotation += 0.1
        this.hands['hourHand'].rotation += 0.5/(60 * frameRate);
        // this.container.rotation++;
    }

    private create() {
        this.container = new Container();
        this.container = this.createClock();
    }

    private createClock(): Container {
        const container = new Container();
        const staticContainer = this.getStaticComponentContainer();
        container.addChild(staticContainer);
        this.hands = this.getDynamicComponentContainer();
        this.setCurrentTime();
        container.addChild(this.hands['secondHand']);
        container.addChild(this.hands['minuteHand']);
        container.addChild(this.hands['hourHand']);
        container.name = this.name;
        return container;
    }

    private getStaticComponentContainer(): Container {
        const x = this.position?.x ?? window.innerHeight;
        const y = this.position?.y ?? window.innerHeight / 2;
        const radius = this.radius ?? 200;
        const graphicsColors = {
            fillColor: '#FFF',
            strokeColor: '#000099'
        };
        const noOfParts = 12;
        const circle = CreateJS_Shapes.getCircle(x, y, radius, { width: radius / 30 }, graphicsColors);
        const center = CreateJS_Shapes.getCircle(x, y, (radius / 30), { width: radius / 30 }, { fillColor: graphicsColors.strokeColor, strokeColor: graphicsColors.strokeColor });
        const ashokChakra = this.getAshokChakra(24, radius / 10, { x: x / 1, y: y });
        const chakra = this.getChakra({ x, y }, radius / 2, 4 * noOfParts, graphicsColors);
        const fontSize = radius / 6;
        const text = this.getClockTexts(x, y, radius, fontSize, 1 * noOfParts, graphicsColors.strokeColor);

        const container = new Container();
        container.addChild(circle);
        // container.addChild(chakra);
        // container.addChild(ashokChakra);
        for (let i = 0; i < noOfParts; i++) {
            container.addChild(text[i]);
        }
        return container;
    }

    private getDynamicComponentContainer(): { [key: string]: Container | Shape } {
        const x = this.position?.x ?? window.innerHeight;
        const y = this.position?.y ?? window.innerHeight / 2;
        const radius = this.radius ?? 200;
        const graphicsColors = {
            fillColor: '#FFF',
            strokeColor: '#000099'
        };
        const fontSize = radius / 6;
        const secondHand = CreateJS_Shapes.getLine({ x: x, y: y }, { x: x, y: y - radius / 1.2 }, { width: fontSize / 10 }, graphicsColors);
        secondHand.regX = x; secondHand.regY = y;
        secondHand.x = x; secondHand.y = y;
        const minuteHand = CreateJS_Shapes.getLine({ x: x, y: y }, { x: x, y: y - radius / 1.4 }, { width: fontSize / 6 }, graphicsColors);
        minuteHand.regX = x; minuteHand.regY = y;
        minuteHand.x = x; minuteHand.y = y;
        const hourHand = CreateJS_Shapes.getLine({ x: x, y: y }, { x: x, y: y - radius / 1.8 }, { width: fontSize / 4 }, graphicsColors);;
        hourHand.regX = x; hourHand.regY = y;
        hourHand.x = x; hourHand.y = y;
        return { secondHand, minuteHand, hourHand };
    }

    private getChakra(center: IPoint, radius: number, noOfParts: number, graphicsColors: any) {
        const handsCount = radius / 50;
        const handTypes: Array<any> = [];
        const fontSize = radius / 6;
        for (let i = 1; i <= handsCount; i++) {
            handTypes[i - 1] = this.getHands(this.position, radius / i, noOfParts, { width: fontSize / (radius / (10 * i)) }, graphicsColors);
        }
        const container = new Container();
        for (let j = 0; j < handTypes.length; j++) {
            for (let i = 0; i < noOfParts; i++) {
                container.addChild(handTypes[j][i]);
            }
        }
        return container;
    }

    private getAshokChakra(noOfParts: number, radius?: number, origin?: IPoint) {
        const x = this.position?.x ?? window.innerHeight;
        const y = this.position?.y ?? window.innerHeight / 2;
        radius = radius || 20;
        const graphicsColors = {
            fillColor: '#FFF',
            strokeColor: '#000099'
        };
        const circle = CreateJS_Shapes.getCircle(x, y, radius, { width: radius / 30 }, graphicsColors);
        const center = CreateJS_Shapes.getCircle(x, y, (radius / 30), { width: radius / 30 }, { fillColor: graphicsColors.strokeColor, strokeColor: graphicsColors.strokeColor });
        const fontSize = this.radius / 6;
        const hands1 = this.getHands({ x, y }, radius, noOfParts, { width: fontSize / 10 }, graphicsColors);
        const hands2 = this.getHands({ x, y }, radius / 1.2, noOfParts, { width: fontSize / 5 }, graphicsColors);
        const hands3 = this.getHands({ x, y }, radius / 1.4, noOfParts, { width: fontSize / 3 }, graphicsColors);
        const hands4 = this.getHands({ x, y }, radius / 1.8, noOfParts, { width: fontSize / 2 }, graphicsColors);
        const hands5 = this.getHands({ x, y }, radius / 2.2, noOfParts, { width: fontSize / 1.5 }, graphicsColors);

        const container = new Container();
        container.addChild(circle);
        container.addChild(center);
        for (let i = 0; i < noOfParts; i++) {
            container.addChild(hands1[i]);
            container.addChild(hands2[i]);
            container.addChild(hands3[i]);
            container.addChild(hands4[i]);
            container.addChild(hands5[i]);
        }
        return container;
    }

    private getClockTextPards(x: number, y: number, radius: number, fontSize: number, count: number, textColor?: string) {

    }

    private getClockTexts(x: number, y: number, radius: number, fontSize: number, count: number, textColor?: string) {
        const fullAngle = 2 * Math.PI;
        const texts = [];
        let fontSizeX = fontSize;
        const fontSizeY = fontSize;
        let number = 10;
        for (let i = 1; i <= count; i++, number++) {
            if (number > count) {
                number = 1;
            }
            fontSizeX = number.toString().length * fontSize;
            texts.push(CreateJS_Shapes.getText(number, { x: x - (fontSizeX / 4) - (radius - fontSizeX / 2.8) * Math.cos(i * fullAngle / count), y: y - (fontSizeY / 2.3) - (radius - fontSizeY / 2.1) * Math.sin(i * fullAngle / count) }, fontSize + 'px Cambria', textColor));
        }
        return texts;
    }

    private getHands(origin: IPoint, radius: number, noOfHands: number, strokeStyle?: IStrokeStyle, graphicsColors?: any) {
        const fullAngle = 2 * Math.PI;
        const hands = [];
        for (let i = 1; i <= noOfHands; i++) {
            hands.push(CreateJS_Shapes.getLine(origin, { x: origin.x + radius * Math.cos(i * fullAngle / noOfHands), y: origin.y + radius * Math.sin(i * fullAngle / noOfHands) }, strokeStyle, graphicsColors));
        }
        return hands;
    }

    private setCurrentTime() {
        const { hour, minute, second } = this.getCurrentTimeRotations();
        this.hands['hourHand'].rotation = hour;
        this.hands['minuteHand'].rotation = minute;
        this.hands['secondHand'].rotation = second;
    }

    private getCurrentTimeRotations() {
        const currentTime = new Date();
        let hour = currentTime.getHours();
        hour = hour > 12 ? hour - 12 : hour;
        const minute = currentTime.getMinutes();
        const second = currentTime.getSeconds();
        let secondAngle = second * 6;
        let minuteAngle = (minute * 6) + (second / 10);
        let hourAngle = (hour * 30) + (minute / 2) + (second / 120);
        return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
    }
}