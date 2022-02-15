interface IGraphics {
    beginStroke: ColorGamut;
    endStroke: ColorGamut;
    beginFill: ColorGamut;
    endFill: ColorGamut;
}

interface ICircleConfig extends IGraphics {
    radius: number;
    center: ICenter;
}

interface ICenter {
    x: number;
    y: number;
}