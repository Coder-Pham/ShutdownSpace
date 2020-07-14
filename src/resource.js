let size = cc.winSize;
let helloWorld = "res/Normal";

if (size.width >= 1920 && size.height >= 1080) {
    helloWorld = "res/HD";
}

var res = {
    plane_png: "res/assets/plane.png",
    background_jpg: "res/assets/space2.jpg",
    enemy1_png: "res/assets/enemy1.png",
    enemy2_png: "res/assets/enemy2.png",
    enemy3_png: "res/assets/enemy3.png",
    redBullet: "res/assets/redBullet.png",
    yellowBullet: "res/assets/yellowBullet.png",
    particle_png: "res/assets/particle.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
