import{B as h,Ca as V,D as m,Da as fe,Ea as de,Fa as me,G as u,Ia as pe,La as ve,M as p,O as R,Q as W,R as se,S as g,T as C,U as T,V as f,W as ae,Y as ne,Z as le,c as H,d as ee,e as te,i as G,ma as he,na as ce,o as ie,oa as U,p as v,q as re,ra as ue,w as oe}from"./chunk-4LPJBBUQ.js";import{r as J,v as $}from"./chunk-75ZOJ57S.js";import{$a as N,Fb as Z,Gb as q,Hb as X,Ma as b,Pb as K,Ta as F,Ub as S,Vb as _,Wb as P,ib as Y,va as j}from"./chunk-W6V62TGU.js";var y={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var c=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},be=new fe(-1,1,1,-1,0,1),Q=class extends se{constructor(){super(),this.setAttribute("position",new W([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new W([0,2,0,0,2,0],2))}},Te=new Q,x=class{constructor(e){this._mesh=new g(Te,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var w=class extends c{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof f?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=T.clone(e.uniforms),this.material=new f({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new x(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var D=class extends c{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let s=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),i.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),i.buffers.stencil.setClear(a),i.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(s.EQUAL,1,4294967295),i.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),i.buffers.stencil.setLocked(!0)}},B=class extends c{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var A=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let r=e.getSize(new h);this._width=r.width,this._height=r.height,t=new u(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:v}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new w(y),this.copyPass.material.blending=H,this.clock=new pe}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),r=!1;for(let s=0,i=this.passes.length;s<i;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),o.needsSwap){if(r){let a=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}D!==void 0&&(o instanceof D?r=!0:o instanceof B&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new h);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(r,s),this.renderTarget2.setSize(r,s);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(r,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var O=class extends c{constructor(e,t,r=null,s=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=s,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new p}render(e,t,r){let s=e.autoClear;e.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var ge={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new p(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var M=class l extends c{constructor(e,t=1,r,s){super(),this.strength=t,this.radius=r,this.threshold=s,this.resolution=e!==void 0?new h(e.x,e.y):new h(256,256),this.clearColor=new p(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new u(i,o,{type:v}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let L=new u(i,o,{type:v});L.texture.name="UnrealBloomPass.h"+d,L.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(L);let k=new u(i,o,{type:v});k.texture.name="UnrealBloomPass.v"+d,k.texture.generateMipmaps=!1,this.renderTargetsVertical.push(k),i=Math.round(i/2),o=Math.round(o/2)}let a=ge;this.highPassUniforms=T.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new f({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let n=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(n[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new h(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let I=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=I,this.bloomTintColors=[new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=T.clone(y.uniforms),this.blendMaterial=new f({uniforms:this.copyUniforms,vertexShader:y.vertexShader,fragmentShader:y.fragmentShader,blending:ee,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new p,this._oldClearAlpha=1,this._basic=new R,this._fsQuad=new x(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(r,s);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(r,s),this.renderTargetsVertical[i].setSize(r,s),this.separableBlurMaterials[i].uniforms.invSize.value=new h(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2)}render(e,t,r,s,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[n].uniforms.direction.value=l.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=l.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[];for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new f({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new h(.5,.5)},direction:{value:new h(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new f({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};M.BlurDirectionX=new h(1,0);M.BlurDirectionY=new h(0,1);var E={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};var z=class extends c{constructor(e,t,r){super(),this.scene=e,this.camera=t;let s=r.focus!==void 0?r.focus:1,i=r.aperture!==void 0?r.aperture:.025,o=r.maxblur!==void 0?r.maxblur:1;this._renderTargetDepth=new u(1,1,{minFilter:G,magFilter:G,type:v}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new ue,this._materialDepth.depthPacking=oe,this._materialDepth.blending=H;let a=T.clone(E.uniforms);a.tDepth.value=this._renderTargetDepth.texture,a.focus.value=s,a.aspect.value=t.aspect,a.aperture.value=i,a.maxblur.value=o,a.nearClip.value=t.near,a.farClip.value=t.far,this.materialBokeh=new f({defines:Object.assign({},E.defines),uniforms:a,vertexShader:E.vertexShader,fragmentShader:E.fragmentShader}),this.uniforms=a,this._fsQuad=new x(this.materialBokeh),this._oldClearColor=new p}render(e,t,r){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let s=e.getClearAlpha(),i=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=r.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=i}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}};var Ce=["canvas"],ye=["interactionHint"],we=["wrapper"],xe=class l{constructor(e,t){this.platformId=e;this.ngZone=t;this.isBrowser=$(this.platformId),this.isMobile=this.isBrowser&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);let s=(this.isBrowser&&(navigator.language||navigator.userLanguage)||"pt-BR").startsWith("en")?"en-US":"pt-BR";this.t=this.translations[s]}canvasRef;interactionHintRef;wrapperRef;scene;camera;renderer;composer;bloomPass;bokehPass;lensDistortionPass;pointLight1;pointLight2;celestialObjects=[];confettiParticles=[];planetGeometries=null;particleGeometry=null;groundGeometry=null;cameraAngle=0;cameraRadius=30;cameraHeight=15;bobbleTime=0;mouse={x:0,y:0};targetRotation={x:0,y:0};currentRotation={x:0,y:0};isInteracting=!1;touchStartX=0;touchStartY=0;hasInteracted=!1;resizeTimeout;animationFrameId=0;isBrowser=!1;intersectionObserver=null;translations={"pt-BR":{desktop:"Mova o mouse para explorar",mobile:"Deslize ou incline para explorar"},"en-US":{desktop:"Move your mouse to explore",mobile:"Swipe or tilt to explore"}};t;isMobile;ngAfterViewInit(){if(!this.isBrowser){console.log("3D Animation: Not in browser, skipping initialization");return}console.log("3D Animation: Component initialized, starting Three.js setup"),this.ngZone.runOutsideAngular(()=>{try{this.initThree(),this.initInteraction(),this.setupIntersectionObserver()}catch(e){console.error("3D Animation: Error during initialization:",e)}})}ngOnDestroy(){this.isBrowser&&(this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),typeof document<"u"&&document.removeEventListener("click",this.requestPermission),this.intersectionObserver&&this.intersectionObserver.disconnect(),this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.disposeThree())}setupIntersectionObserver(){this.canvasRef?.nativeElement&&(this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting?this.animationFrameId||this.animate():this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=0)})}),this.intersectionObserver.observe(this.canvasRef.nativeElement))}disposeThree(){try{this.planetGeometries&&Object.values(this.planetGeometries).forEach(e=>e.dispose()),this.particleGeometry&&this.particleGeometry.dispose(),this.groundGeometry&&this.groundGeometry.dispose(),this.scene&&this.scene.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(s=>{"map"in s&&s.map&&s.map.dispose(),s.dispose()})}),this.renderer&&this.renderer.dispose(),this.composer&&this.composer.dispose()}catch(e){console.warn("Error disposing Three.js resources",e)}this.renderer&&this.renderer.dispose(),this.composer&&this.composer.dispose(),this.scene&&this.scene.clear()}catch(e){console.error("Error during Three.js cleanup:",e)}onWindowResize(){clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{if(!this.canvasRef)return;let e=this.canvasRef.nativeElement,t=e.parentElement?.clientWidth||window.innerWidth,r=e.parentElement?.clientHeight||500;this.camera.aspect=t/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,r),this.composer.setSize(t,r),this.bokehPass.uniforms.aspect.value=t/r,this.lensDistortionPass.uniforms.aspectRatio.value=t/r,this.bloomPass.resolution.set(t,r)},100)}onWindowMouseMove(e){this.hideHintOnInteraction(),this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.targetRotation.x=this.mouse.y*.5,this.targetRotation.y=this.mouse.x*.5}onWindowTouchStart(e){this.hideHintOnInteraction(),e.touches.length===1&&(this.isInteracting=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY)}onWindowTouchMove(e){if(e.touches.length===1&&this.isInteracting){let t=e.touches[0].clientX,r=e.touches[0].clientY,s=(t-this.touchStartX)/window.innerWidth,i=(r-this.touchStartY)/window.innerHeight;this.targetRotation.y+=s*2,this.targetRotation.x-=i*2,this.targetRotation.x=Math.max(-1,Math.min(1,this.targetRotation.x)),this.touchStartX=t,this.touchStartY=r}}onWindowTouchEnd(){this.isInteracting=!1}onWindowDeviceOrientation(e){this.hideHintOnInteraction(),e.beta!==null&&e.gamma!==null&&(this.targetRotation.x=(e.beta-90)/90,this.targetRotation.y=e.gamma/90,this.targetRotation.x=Math.max(-1,Math.min(1,this.targetRotation.x)),this.targetRotation.y=Math.max(-1,Math.min(1,this.targetRotation.y)))}initThree(){let e=this.canvasRef.nativeElement,t=e.parentElement?.clientWidth||window.innerWidth,r=e.parentElement?.clientHeight||500;console.log("Initializing Three.js with dimensions:",t,"x",r),this.planetGeometries={large:new C(1,1,1),medium:new C(1,1,1),small:new C(1,1,1),tiny:new C(1,1,1)},this.particleGeometry=new C(1,1,1),this.groundGeometry=new ce(200,200),this.scene=new le,this.scene.fog=new ne(1296,30,120),this.camera=new ae(75,t/r,.1,1e3),this.camera.position.set(0,15,30),this.camera.lookAt(0,0,0),this.renderer=new ve({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setSize(t,r),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=te,this.renderer.toneMappingExposure=1.2,this.renderer.setClearColor(0,0),this.renderer.shadowMap.enabled=!1,console.log("Renderer initialized");let s=new he(t,r);s.type=ie;let i=new u(t,r,{format:re,depthTexture:s,depthBuffer:!0});this.renderer.setRenderTarget(i),this.composer=new A(this.renderer,i),this.composer.renderTarget1=i,this.scene.add(new me(16777215,.3));let o=new de(16753920,1.5);o.position.set(10,20,10),this.scene.add(o),this.pointLight1=new V(16711935,2,50),this.pointLight1.position.set(-15,10,-15),this.scene.add(this.pointLight1),this.pointLight2=new V(65535,2,50),this.pointLight2.position.set(15,10,15),this.scene.add(this.pointLight2),console.log("Lights added"),this.createCelestialObjects(),this.createConfetti(),console.log("Objects created:",this.celestialObjects.length,"celestial,",this.confettiParticles.length,"particles");let a=new U({color:656672,metalness:.2,roughness:.9,emissive:1706554,emissiveIntensity:.3,transparent:!0,opacity:.3}),n=new g(this.groundGeometry,a);n.rotation.x=-Math.PI/2,n.position.y=-20,this.scene.add(n);let I=new O(this.scene,this.camera);this.composer.addPass(I),this.bloomPass=new M(new h(t,r),1.5,.4,.85),this.composer.addPass(this.bloomPass),this.bokehPass=new z(this.scene,this.camera,{focus:25,aperture:1e-4,maxblur:.01}),this.composer.addPass(this.bokehPass),this.initLensDistortionPass(),console.log("Three.js initialization complete")}initLensDistortionPass(){let e={uniforms:{tDiffuse:{value:null},strength:{value:.15},height:{value:1},aspectRatio:{value:window.innerWidth/window.innerHeight},cylindricalRatio:{value:1}},vertexShader:`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float strength;
        uniform float aspectRatio;
        varying vec2 vUv;
        void main() {
            vec2 h = vec2(vUv.x, vUv.y);
            vec2 center = vec2(0.5, 0.5);
            float r2 = (aspectRatio * (h.x - center.x)) * (aspectRatio * (h.x - center.x)) 
                       + ((h.y - center.y) * (h.y - center.y));
            float f = 1.0 + r2 * strength;
            vec2 distortedUv = f * (h - center) + center;
            if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent
            } else {
                gl_FragColor = texture2D(tDiffuse, distortedUv);
            }
        }`};this.lensDistortionPass=new w(e),this.composer.addPass(this.lensDistortionPass)}initInteraction(){this.interactionHintRef&&this.isBrowser&&(this.interactionHintRef.nativeElement.textContent=this.isMobile?this.t.mobile:this.t.desktop),this.showHintTemporarily(4e3),this.isBrowser&&typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"&&document.addEventListener("click",this.requestPermission,{once:!0}),this.initIntersectionObserver()}initIntersectionObserver(){!this.isBrowser||!this.wrapperRef||(this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&this.hasInteracted&&this.showHintTemporarily()})},{threshold:.1}),this.intersectionObserver.observe(this.wrapperRef.nativeElement))}requestPermission=()=>{!this.isBrowser||typeof DeviceOrientationEvent>"u"||DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&console.log("Device orientation permission granted")}).catch(console.error)};createCelestialObjects(){if(!this.planetGeometries)return;let e=[{color:16739125,emissive:16729088},{color:4886754,emissive:2254540},{color:16766720,emissive:16755200},{color:10181046,emissive:7812010},{color:1752220,emissive:43639},{color:15158332,emissive:13378065},{color:15965202,emissive:14513920},{color:3447003,emissive:1140394}];for(let t=0;t<8;t++){let r=e[t%e.length],s=Math.random()*3+1.5,i=new U({color:r.color,metalness:.3,roughness:.7,emissive:r.emissive,emissiveIntensity:.4}),o=new g(this.planetGeometries.large,i);o.scale.setScalar(s);let a=t/8*Math.PI*2,n=Math.random()*25+15;o.position.set(Math.cos(a)*n,Math.random()*20-10,Math.sin(a)*n),o.userData={rotationSpeed:Math.random()*.01+.002,orbitSpeed:Math.random()*.001+5e-4,orbitRadius:n,orbitAngle:a,orbitHeight:o.position.y},this.scene.add(o),this.celestialObjects.push(o)}for(let t=0;t<15;t++){let r=Math.random()*.8+.3,s=e[Math.floor(Math.random()*e.length)],i=new U({color:s.color,metalness:.5,roughness:.8,emissive:s.emissive,emissiveIntensity:.3}),o=new g(this.planetGeometries.small,i);o.scale.setScalar(r),o.position.set((Math.random()-.5)*50,(Math.random()-.5)*30,(Math.random()-.5)*50),o.userData={rotationSpeed:Math.random()*.02+.005,orbitSpeed:Math.random()*.002+.001,orbitRadius:Math.sqrt(o.position.x**2+o.position.z**2),orbitAngle:Math.atan2(o.position.z,o.position.x),orbitHeight:o.position.y},this.scene.add(o),this.celestialObjects.push(o)}for(let t=0;t<50;t++){let r=Math.random()*.3+.1,s=Math.random()>.5?16777215:Math.random()>.5?16777130:11184895,i=new R({color:s,transparent:!0,opacity:Math.random()*.5+.5}),o=new g(this.planetGeometries.tiny,i);o.scale.setScalar(r),o.position.set((Math.random()-.5)*100,(Math.random()-.5)*60,(Math.random()-.5)*100),o.userData={twinkleSpeed:Math.random()*.02+.01,twinklePhase:Math.random()*Math.PI*2,baseOpacity:i.opacity},this.scene.add(o),this.celestialObjects.push(o)}}createConfetti(){if(!this.particleGeometry)return;let e=[16711790,16760331,16471559,8599788,3835647,458661,16738740,65535];for(let t=0;t<200;t++){let r=Math.random()*.3+.1,s=new R({color:e[Math.floor(Math.random()*e.length)],transparent:!0,opacity:Math.random()*.6+.3}),i=new g(this.particleGeometry,s);i.scale.setScalar(r),i.position.set((Math.random()-.5)*80,(Math.random()-.5)*60,(Math.random()-.5)*80),i.userData={velocity:new m((Math.random()-.5)*.03,(Math.random()-.5)*.03,(Math.random()-.5)*.03),rotationSpeed:new m((Math.random()-.5)*.05,(Math.random()-.5)*.05,(Math.random()-.5)*.05)},this.scene.add(i),this.confettiParticles.push(i)}}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate);let e=Date.now()*.001,t=Math.sin(e*.7),r=Math.cos(e*.5),s=.1;this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*s,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*s,this.bobbleTime+=.01,this.cameraAngle+=.003+this.currentRotation.y*.01,this.camera.position.x=Math.cos(this.cameraAngle)*this.cameraRadius,this.camera.position.z=Math.sin(this.cameraAngle)*this.cameraRadius,this.camera.position.y=this.cameraHeight+Math.sin(this.bobbleTime)*2+Math.cos(this.bobbleTime*.7)*1+this.currentRotation.x*10,this.camera.lookAt(this.currentRotation.y*5,5+this.currentRotation.x*5,0);for(let i of this.celestialObjects){let o=i.userData;o.rotationSpeed&&(i.rotation.y+=o.rotationSpeed+this.currentRotation.y*.005,i.rotation.x+=o.rotationSpeed*.3+this.currentRotation.x*.005),o.orbitSpeed&&o.orbitRadius&&(o.orbitAngle+=o.orbitSpeed+this.currentRotation.y*.002,i.position.x=Math.cos(o.orbitAngle)*o.orbitRadius,i.position.z=Math.sin(o.orbitAngle)*o.orbitRadius,i.position.y=o.orbitHeight+Math.sin(o.orbitAngle*2)*2),o.twinkleSpeed&&(o.twinklePhase+=o.twinkleSpeed,i.material.opacity=o.baseOpacity+Math.sin(o.twinklePhase)*.3)}for(let i of this.confettiParticles){let o=i.position,a=i.userData.velocity;o.add(a),o.x>40?o.x=-40:o.x<-40&&(o.x=40),o.y>30?o.y=-30:o.y<-30&&(o.y=30),o.z>40?o.z=-40:o.z<-40&&(o.z=40)}this.pointLight1&&(this.pointLight1.position.x=t*20,this.pointLight1.position.z=r*20),this.pointLight2&&(this.pointLight2.position.x=Math.cos(e*.6)*20,this.pointLight2.position.z=Math.sin(e*.8)*20),this.composer.render()};hideHintOnInteraction(){!this.hasInteracted&&this.interactionHintRef&&(this.hasInteracted=!0)}showHintTemporarily(e=2e3){if(!this.interactionHintRef)return;let t=this.interactionHintRef.nativeElement;t.style.display="block",t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},e)}static \u0275fac=function(t){return new(t||l)(F(j),F(Y))};static \u0275cmp=N({type:l,selectors:[["app-3d-animation-demo"]],viewQuery:function(t,r){if(t&1&&(S(Ce,5),S(ye,5),S(we,5)),t&2){let s;_(s=P())&&(r.canvasRef=s.first),_(s=P())&&(r.interactionHintRef=s.first),_(s=P())&&(r.wrapperRef=s.first)}},hostBindings:function(t,r){t&1&&K("resize",function(){return r.onWindowResize()},b)("mousemove",function(i){return r.onWindowMouseMove(i)},b)("touchstart",function(i){return r.onWindowTouchStart(i)},b)("touchmove",function(i){return r.onWindowTouchMove(i)},b)("touchend",function(){return r.onWindowTouchEnd()},b)("deviceorientation",function(i){return r.onWindowDeviceOrientation(i)},b)},decls:6,vars:0,consts:[["wrapper",""],["canvas",""],["interactionHint",""],[1,"canvas-wrapper"],[1,"interaction-hint"]],template:function(t,r){t&1&&(Z(0,"div",3,0),X(2,"canvas",null,1)(4,"div",4,2),q())},dependencies:[J],styles:["[_nghost-%COMP%]{width:100%;height:100%;display:block;position:relative;min-height:500px;background:transparent;border-radius:.5rem;overflow:hidden}.canvas-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;position:relative;min-height:500px}canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%;position:absolute;top:0;left:0}.interaction-hint[_ngcontent-%COMP%]{position:absolute;bottom:20px;left:50%;transform:translate(-50%);background:#ffffff1a;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);color:#fff;padding:16px 24px;font-size:15px;font-weight:400;border-radius:16px;box-shadow:0 8px 32px #0000004d;z-index:1000;text-align:center;pointer-events:none;opacity:0;transition:opacity .5s ease-in-out;letter-spacing:.5px}@keyframes _ngcontent-%COMP%_fadeInOut{0%,to{opacity:0}10%,90%{opacity:1}}@media (max-width: 768px){[_nghost-%COMP%]{min-height:400px}.canvas-wrapper[_ngcontent-%COMP%]{min-height:400px}.interaction-hint[_ngcontent-%COMP%]{font-size:14px;padding:14px 20px;border-radius:14px}}@media (max-width: 480px){[_nghost-%COMP%]{min-height:300px}.canvas-wrapper[_ngcontent-%COMP%]{min-height:300px}}"],changeDetection:0})};export{xe as ThreeDAnimationDemoComponent};
