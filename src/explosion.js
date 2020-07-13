// Texture for explosion
var explosiveTexture = cc.textureCache.addImage(res.particle_png);

// Create explosion effect if get hit
var explosion = cc.ParticleSun.extend({
    ctor: function() {
      this._super();
    },
    onEnter: function() {
        this._super();
        this.setTexture(explosiveTexture);
        this.setStartSize(2);
        this.setEndSize(4);
    }
});