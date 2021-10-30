export function standardizeColor(color: string): Color {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color;
    var r = ctx.fillStyle.substring(1, 3);
    var g = ctx.fillStyle.substring(3, 5);
    var b = ctx.fillStyle.substring(5, 7);
    var a = ctx.fillStyle.substring(7, 9) || "FF";
    return new Color(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
}

export class Color {
    constructor(public r: number, public g: number, public b: number, public a: number = 1) {
    }

    public getLuminance(): number {
        var r = this.r / 255;
        var g = this.g / 255;
        var b = this.b / 255;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    public toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    public toRGBA(): string {
        return this.toString();
    }

    public toHex(): string {
        return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
    }

    public toHSL(): string {
        var r = this.r / 255;
        var g = this.g / 255;
        var b = this.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        var d = max - min;
        if (max === min) {
            h = s = 0;
        } else {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`;
    }
}