W = () => ({
    width: 0,
    height: 0,
    noiseData: [],
    frame: 0,
    loopTimeout: null,
    ctx: null,
    init() {
        this.ctx = this.$refs.canvas.getContext("2d"),
        this.setup(),
        this.reset()
    },
    setup() {
        this.width = window.innerWidth,
        this.height = window.innerHeight,
        this.$refs.canvas.width = this.width,
        this.$refs.canvas.height = this.height;
        for (let e = 0; e < 10; e++)
            this.createNoise();
        this.loopTimeout = window.setInterval( () => {
            this.paintNoise(this.frame)
        }
        , 1e3 / 25)
    },
    reset() {
        let e;
        window.addEventListener("resize", () => {
            window.clearTimeout(e),
            e = window.setTimeout( () => {
                window.clearInterval(this.loopTimeout),
                this.setup()
            }
            , 200)
        }
        , !1)
    },
    createNoise() {
        const e = this.ctx.createImageData(this.width, this.height)
          , t = new Uint32Array(e.data.buffer)
          , i = t.length;
        for (let s = 0; s < i; s++)
            Math.random() < .5 && (t[s] = 4278190080);
        this.noiseData.push(e)
    },
    paintNoise(e) {
        this.ctx.putImageData(this.noiseData[e], 0, 0),
        e === 9 ? this.frame = 0 : this.frame++
    }
})
document.addEventListener("DOMContentLoaded", () => {
    const staticNoise = W();
    staticNoise.$refs = { canvas: document.querySelector("canvas") };
    staticNoise.init();
});