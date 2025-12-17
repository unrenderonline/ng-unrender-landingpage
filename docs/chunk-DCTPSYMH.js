import{d as ut}from"./chunk-Q7GIVGAV.js";import{$a as ge,Ia as nt,Mb as ot,Sb as st,Tb as lt,V as ve,W as et,Zb as ft,_ as $,a as Qe,ab as at,b as Ze,bb as rt,ha as tt,tc as ye,uc as ct,vb as it,wc as ee,xc as A}from"./chunk-W6V62TGU.js";function Ce(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}function Zn(e){if(Array.isArray(e))return e}function ea(e){if(Array.isArray(e))return Ce(e)}function ta(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function dt(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,Ut(a.key),a)}}function na(e,n,t){return n&&dt(e.prototype,n),t&&dt(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function ae(e,n){var t=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=Re(e))||n&&e&&typeof e.length=="number"){t&&(e=t);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(l){throw l},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var l=t.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||t.return==null||t.return()}finally{if(s)throw i}}}}function v(e,n,t){return(n=Ut(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function aa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ra(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var a,r,i,o,s=[],l=!0,c=!1;try{if(i=(t=t.call(e)).next,n===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(a=i.call(t)).done)&&(s.push(a.value),s.length!==n);l=!0);}catch(d){c=!0,r=d}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return s}}function ia(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oa(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function mt(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,a)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?mt(Object(t),!0).forEach(function(a){v(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):mt(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function fe(e,n){return Zn(e)||ra(e,n)||Re(e,n)||ia()}function E(e){return ea(e)||aa(e)||Re(e)||oa()}function sa(e,n){if(typeof e!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var a=t.call(e,n||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function Ut(e){var n=sa(e,"string");return typeof n=="symbol"?n:n+""}function oe(e){"@babel/helpers - typeof";return oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},oe(e)}function Re(e,n){if(e){if(typeof e=="string")return Ce(e,n);var t={}.toString.call(e).slice(8,-1);return t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set"?Array.from(e):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Ce(e,n):void 0}}var ht=function(){},We={},Bt={},Gt=null,Vt={mark:ht,measure:ht};try{typeof window<"u"&&(We=window),typeof document<"u"&&(Bt=document),typeof MutationObserver<"u"&&(Gt=MutationObserver),typeof performance<"u"&&(Vt=performance)}catch{}var la=We.navigator||{},pt=la.userAgent,vt=pt===void 0?"":pt,D=We,y=Bt,gt=Gt,te=Vt,go=!!D.document,j=!!y.documentElement&&!!y.head&&typeof y.addEventListener=="function"&&typeof y.createElement=="function",Xt=~vt.indexOf("MSIE")||~vt.indexOf("Trident/"),be,fa=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,ca=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,Kt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},ua={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Jt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],w="classic",q="duotone",qt="sharp",Qt="sharp-duotone",Zt="chisel",en="etch",tn="jelly",nn="jelly-duo",an="jelly-fill",rn="notdog",on="notdog-duo",sn="slab",ln="slab-press",fn="thumbprint",cn="whiteboard",da="Classic",ma="Duotone",ha="Sharp",pa="Sharp Duotone",va="Chisel",ga="Etch",ya="Jelly",ba="Jelly Duo",xa="Jelly Fill",wa="Notdog",ka="Notdog Duo",Aa="Slab",Sa="Slab Press",Ia="Thumbprint",Ca="Whiteboard",un=[w,q,qt,Qt,Zt,en,tn,nn,an,rn,on,sn,ln,fn,cn],yo=(be={},v(v(v(v(v(v(v(v(v(v(be,w,da),q,ma),qt,ha),Qt,pa),Zt,va),en,ga),tn,ya),nn,ba),an,xa),rn,wa),v(v(v(v(v(be,on,ka),sn,Aa),ln,Sa),fn,Ia),cn,Ca)),Pa={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},Ea={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},Fa=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),Oa={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},dn=["fak","fa-kit","fakd","fa-kit-duotone"],yt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Na=["kit"],Ta="kit",ja="kit-duotone",Ma="Kit",Da="Kit Duotone",bo=v(v({},Ta,Ma),ja,Da),_a={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},za={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},$a={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},bt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},xe,ne={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},La=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],Ra="classic",Wa="duotone",Ha="sharp",Ya="sharp-duotone",Ua="chisel",Ba="etch",Ga="jelly",Va="jelly-duo",Xa="jelly-fill",Ka="notdog",Ja="notdog-duo",qa="slab",Qa="slab-press",Za="thumbprint",er="whiteboard",tr="Classic",nr="Duotone",ar="Sharp",rr="Sharp Duotone",ir="Chisel",or="Etch",sr="Jelly",lr="Jelly Duo",fr="Jelly Fill",cr="Notdog",ur="Notdog Duo",dr="Slab",mr="Slab Press",hr="Thumbprint",pr="Whiteboard",xo=(xe={},v(v(v(v(v(v(v(v(v(v(xe,Ra,tr),Wa,nr),Ha,ar),Ya,rr),Ua,ir),Ba,or),Ga,sr),Va,lr),Xa,fr),Ka,cr),v(v(v(v(v(xe,Ja,ur),qa,dr),Qa,mr),Za,hr),er,pr)),vr="kit",gr="kit-duotone",yr="Kit",br="Kit Duotone",wo=v(v({},vr,yr),gr,br),xr={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},wr={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Pe={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},kr=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],mn=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(La,kr),Ar=["solid","regular","light","thin","duotone","brands","semibold"],hn=[1,2,3,4,5,6,7,8,9,10],Sr=hn.concat([11,12,13,14,15,16,17,18,19,20]),Ir=["aw","fw","pull-left","pull-right"],Cr=[].concat(E(Object.keys(wr)),Ar,Ir,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",ne.GROUP,ne.SWAP_OPACITY,ne.PRIMARY,ne.SECONDARY]).concat(hn.map(function(e){return"".concat(e,"x")})).concat(Sr.map(function(e){return"w-".concat(e)})),Pr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},N="___FONT_AWESOME___",Ee=16,pn="fa",vn="svg-inline--fa",R="data-fa-i2svg",Fe="data-fa-pseudo-element",Er="data-fa-pseudo-element-pending",He="data-prefix",Ye="data-icon",xt="fontawesome-i2svg",Fr="async",Or=["HTML","HEAD","STYLE","SCRIPT"],gn=["::before","::after",":before",":after"],yn=function(){try{return!0}catch{return!1}}();function Q(e){return new Proxy(e,{get:function(t,a){return a in t?t[a]:t[w]}})}var bn=f({},Kt);bn[w]=f(f(f(f({},{"fa-duotone":"duotone"}),Kt[w]),yt.kit),yt["kit-duotone"]);var Nr=Q(bn),Oe=f({},Oa);Oe[w]=f(f(f(f({},{duotone:"fad"}),Oe[w]),bt.kit),bt["kit-duotone"]);var wt=Q(Oe),Ne=f({},Pe);Ne[w]=f(f({},Ne[w]),$a.kit);var xn=Q(Ne),Te=f({},xr);Te[w]=f(f({},Te[w]),_a.kit);var ko=Q(Te),Tr=fa,wn="fa-layers-text",jr=ca,Mr=f({},Pa),Ao=Q(Mr),Dr=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=ua,_r=[].concat(E(Na),E(Cr)),X=D.FontAwesomeConfig||{};function zr(e){var n=y.querySelector("script["+e+"]");if(n)return n.getAttribute(e)}function $r(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}y&&typeof y.querySelector=="function"&&(kt=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]],kt.forEach(function(e){var n=fe(e,2),t=n[0],a=n[1],r=$r(zr(t));r!=null&&(X[a]=r)}));var kt,kn={styleDefault:"solid",familyDefault:w,cssPrefix:pn,replacementClass:vn,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};X.familyPrefix&&(X.cssPrefix=X.familyPrefix);var B=f(f({},kn),X);B.autoReplaceSvg||(B.observeMutations=!1);var m={};Object.keys(kn).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(t){B[e]=t,K.forEach(function(a){return a(m)})},get:function(){return B[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(n){B.cssPrefix=n,K.forEach(function(t){return t(m)})},get:function(){return B.cssPrefix}});D.FontAwesomeConfig=m;var K=[];function Lr(e){return K.push(e),function(){K.splice(K.indexOf(e),1)}}var M=Ee,F={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Rr(e){if(!(!e||!j)){var n=y.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=e;for(var t=y.head.childNodes,a=null,r=t.length-1;r>-1;r--){var i=t[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return y.head.insertBefore(n,a),e}}var Wr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function At(){for(var e=12,n="";e-- >0;)n+=Wr[Math.random()*62|0];return n}function G(e){for(var n=[],t=(e||[]).length>>>0;t--;)n[t]=e[t];return n}function Ue(e){return e.classList?G(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(n){return n})}function An(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Hr(e){return Object.keys(e||{}).reduce(function(n,t){return n+"".concat(t,'="').concat(An(e[t]),'" ')},"").trim()}function ce(e){return Object.keys(e||{}).reduce(function(n,t){return n+"".concat(t,": ").concat(e[t].trim(),";")},"")}function Be(e){return e.size!==F.size||e.x!==F.x||e.y!==F.y||e.rotate!==F.rotate||e.flipX||e.flipY}function Yr(e){var n=e.transform,t=e.containerWidth,a=e.iconWidth,r={transform:"translate(".concat(t/2," 256)")},i="translate(".concat(n.x*32,", ").concat(n.y*32,") "),o="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),s="rotate(".concat(n.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Ur(e){var n=e.transform,t=e.width,a=t===void 0?Ee:t,r=e.height,i=r===void 0?Ee:r,o=e.startCentered,s=o===void 0?!1:o,l="";return s&&Xt?l+="translate(".concat(n.x/M-a/2,"em, ").concat(n.y/M-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(n.x/M,"em), calc(-50% + ").concat(n.y/M,"em)) "):l+="translate(".concat(n.x/M,"em, ").concat(n.y/M,"em) "),l+="scale(".concat(n.size/M*(n.flipX?-1:1),", ").concat(n.size/M*(n.flipY?-1:1),") "),l+="rotate(".concat(n.rotate,"deg) "),l}var Br=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}`;function Sn(){var e=pn,n=vn,t=m.cssPrefix,a=m.replacementClass,r=Br;if(t!==e||a!==n){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(n),"g");r=r.replace(i,".".concat(t,"-")).replace(o,"--".concat(t,"-")).replace(s,".".concat(a))}return r}var St=!1;function ke(){m.autoAddCss&&!St&&(Rr(Sn()),St=!0)}var Gr={mixout:function(){return{dom:{css:Sn,insertCss:ke}}},hooks:function(){return{beforeDOMElementCreation:function(){ke()},beforeI2svg:function(){ke()}}}},T=D||{};T[N]||(T[N]={});T[N].styles||(T[N].styles={});T[N].hooks||(T[N].hooks={});T[N].shims||(T[N].shims=[]);var P=T[N],In=[],Cn=function(){y.removeEventListener("DOMContentLoaded",Cn),se=1,In.map(function(n){return n()})},se=!1;j&&(se=(y.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(y.readyState),se||y.addEventListener("DOMContentLoaded",Cn));function Vr(e){j&&(se?setTimeout(e,0):In.push(e))}function Z(e){var n=e.tag,t=e.attributes,a=t===void 0?{}:t,r=e.children,i=r===void 0?[]:r;return typeof e=="string"?An(e):"<".concat(n," ").concat(Hr(a),">").concat(i.map(Z).join(""),"</").concat(n,">")}function It(e,n,t){if(e&&e[n]&&e[n][t])return{prefix:n,iconName:t,icon:e[n][t]}}var Xr=function(n,t){return function(a,r,i,o){return n.call(t,a,r,i,o)}},Ae=function(n,t,a,r){var i=Object.keys(n),o=i.length,s=r!==void 0?Xr(t,r):t,l,c,d;for(a===void 0?(l=1,d=n[i[0]]):(l=0,d=a);l<o;l++)c=i[l],d=s(d,n[c],c,n);return d};function Pn(e){return E(e).length!==1?null:e.codePointAt(0).toString(16)}function Ct(e){return Object.keys(e).reduce(function(n,t){var a=e[t],r=!!a.icon;return r?n[a.iconName]=a.icon:n[t]=a,n},{})}function En(e,n){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=t.skipHooks,r=a===void 0?!1:a,i=Ct(n);typeof P.hooks.addPack=="function"&&!r?P.hooks.addPack(e,Ct(n)):P.styles[e]=f(f({},P.styles[e]||{}),i),e==="fas"&&En("fa",n)}var J=P.styles,Kr=P.shims,Fn=Object.keys(xn),Jr=Fn.reduce(function(e,n){return e[n]=Object.keys(xn[n]),e},{}),Ge=null,On={},Nn={},Tn={},jn={},Mn={};function qr(e){return~_r.indexOf(e)}function Qr(e,n){var t=n.split("-"),a=t[0],r=t.slice(1).join("-");return a===e&&r!==""&&!qr(r)?r:null}var Dn=function(){var n=function(i){return Ae(J,function(o,s,l){return o[l]=Ae(s,i,{}),o},{})};On=n(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=o})}return r}),Nn=n(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=o})}return r}),Mn=n(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(l){r[l]=o}),r});var t="far"in J||m.autoFetchSvg,a=Ae(Kr,function(r,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!t&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});Tn=a.names,jn=a.unicodes,Ge=ue(m.styleDefault,{family:m.familyDefault})};Lr(function(e){Ge=ue(e.styleDefault,{family:m.familyDefault})});Dn();function Ve(e,n){return(On[e]||{})[n]}function Zr(e,n){return(Nn[e]||{})[n]}function L(e,n){return(Mn[e]||{})[n]}function _n(e){return Tn[e]||{prefix:null,iconName:null}}function ei(e){var n=jn[e],t=Ve("fas",e);return n||(t?{prefix:"fas",iconName:t}:null)||{prefix:null,iconName:null}}function _(){return Ge}var zn=function(){return{prefix:null,iconName:null,rest:[]}};function ti(e){var n=w,t=Fn.reduce(function(a,r){return a[r]="".concat(m.cssPrefix,"-").concat(r),a},{});return un.forEach(function(a){(e.includes(t[a])||e.some(function(r){return Jr[a].includes(r)}))&&(n=a)}),n}function ue(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.family,a=t===void 0?w:t,r=Nr[a][e];if(a===q&&!e)return"fad";var i=wt[a][e]||wt[a][r],o=e in P.styles?e:null,s=i||o||null;return s}function ni(e){var n=[],t=null;return e.forEach(function(a){var r=Qr(m.cssPrefix,a);r?t=r:a&&n.push(a)}),{iconName:t,rest:n}}function Pt(e){return e.sort().filter(function(n,t,a){return a.indexOf(n)===t})}var Et=mn.concat(dn);function de(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.skipLookups,a=t===void 0?!1:t,r=null,i=Pt(e.filter(function(h){return Et.includes(h)})),o=Pt(e.filter(function(h){return!Et.includes(h)})),s=i.filter(function(h){return r=h,!Jt.includes(h)}),l=fe(s,1),c=l[0],d=c===void 0?null:c,u=ti(i),p=f(f({},ni(o)),{},{prefix:ue(d,{family:u})});return f(f(f({},p),oi({values:e,family:u,styles:J,config:m,canonical:p,givenPrefix:r})),ai(a,r,p))}function ai(e,n,t){var a=t.prefix,r=t.iconName;if(e||!a||!r)return{prefix:a,iconName:r};var i=n==="fa"?_n(r):{},o=L(a,r);return r=i.iconName||o||r,a=i.prefix||a,a==="far"&&!J.far&&J.fas&&!m.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}var ri=un.filter(function(e){return e!==w||e!==q}),ii=Object.keys(Pe).filter(function(e){return e!==w}).map(function(e){return Object.keys(Pe[e])}).flat();function oi(e){var n=e.values,t=e.family,a=e.canonical,r=e.givenPrefix,i=r===void 0?"":r,o=e.styles,s=o===void 0?{}:o,l=e.config,c=l===void 0?{}:l,d=t===q,u=n.includes("fa-duotone")||n.includes("fad"),p=c.familyDefault==="duotone",h=a.prefix==="fad"||a.prefix==="fa-duotone";if(!d&&(u||p||h)&&(a.prefix="fad"),(n.includes("fa-brands")||n.includes("fab"))&&(a.prefix="fab"),!a.prefix&&ri.includes(t)){var b=Object.keys(s).find(function(k){return ii.includes(k)});if(b||c.autoFetchSvg){var g=Fa.get(t).defaultShortPrefixId;a.prefix=g,a.iconName=L(a.prefix,a.iconName)||a.iconName}}return(a.prefix==="fa"||i==="fa")&&(a.prefix=_()||"fas"),a}var si=function(){function e(){ta(this,e),this.definitions={}}return na(e,[{key:"add",value:function(){for(var t=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){t.definitions[s]=f(f({},t.definitions[s]||{}),o[s]),En(s,o[s]),Dn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(t,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,l=o.iconName,c=o.icon,d=c[2];t[s]||(t[s]={}),d.length>0&&d.forEach(function(u){typeof u=="string"&&(t[s][u]=c)}),t[s][l]=c}),t}}])}(),Ft=[],Y={},U={},li=Object.keys(U);function fi(e,n){var t=n.mixoutsTo;return Ft=e,Y={},Object.keys(U).forEach(function(a){li.indexOf(a)===-1&&delete U[a]}),Ft.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(t[o]=r[o]),oe(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){t[o]||(t[o]={}),t[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){Y[o]||(Y[o]=[]),Y[o].push(i[o])})}a.provides&&a.provides(U)}),t}function je(e,n){for(var t=arguments.length,a=new Array(t>2?t-2:0),r=2;r<t;r++)a[r-2]=arguments[r];var i=Y[e]||[];return i.forEach(function(o){n=o.apply(null,[n].concat(a))}),n}function W(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];var r=Y[e]||[];r.forEach(function(i){i.apply(null,t)})}function z(){var e=arguments[0],n=Array.prototype.slice.call(arguments,1);return U[e]?U[e].apply(null,n):void 0}function Me(e){e.prefix==="fa"&&(e.prefix="fas");var n=e.iconName,t=e.prefix||_();if(n)return n=L(t,n)||n,It($n.definitions,t,n)||It(P.styles,t,n)}var $n=new si,ci=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,W("noAuto")},ui={i2svg:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return j?(W("beforeI2svg",n),z("pseudoElements2svg",n),z("i2svg",n)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Vr(function(){mi({autoReplaceSvgRoot:t}),W("watch",n)})}},di={icon:function(n){if(n===null)return null;if(oe(n)==="object"&&n.prefix&&n.iconName)return{prefix:n.prefix,iconName:L(n.prefix,n.iconName)||n.iconName};if(Array.isArray(n)&&n.length===2){var t=n[1].indexOf("fa-")===0?n[1].slice(3):n[1],a=ue(n[0]);return{prefix:a,iconName:L(a,t)||t}}if(typeof n=="string"&&(n.indexOf("".concat(m.cssPrefix,"-"))>-1||n.match(Tr))){var r=de(n.split(" "),{skipLookups:!0});return{prefix:r.prefix||_(),iconName:L(r.prefix,r.iconName)||r.iconName}}if(typeof n=="string"){var i=_();return{prefix:i,iconName:L(i,n)||n}}}},I={noAuto:ci,config:m,dom:ui,parse:di,library:$n,findIconDefinition:Me,toHtml:Z},mi=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.autoReplaceSvgRoot,a=t===void 0?y:t;(Object.keys(P.styles).length>0||m.autoFetchSvg)&&j&&m.autoReplaceSvg&&I.dom.i2svg({node:a})};function me(e,n){return Object.defineProperty(e,"abstract",{get:n}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(a){return Z(a)})}}),Object.defineProperty(e,"node",{get:function(){if(j){var a=y.createElement("div");return a.innerHTML=e.html,a.children}}}),e}function hi(e){var n=e.children,t=e.main,a=e.mask,r=e.attributes,i=e.styles,o=e.transform;if(Be(o)&&t.found&&!a.found){var s=t.width,l=t.height,c={x:s/l/2,y:.5};r.style=ce(f(f({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:n}]}function pi(e){var n=e.prefix,t=e.iconName,a=e.children,r=e.attributes,i=e.symbol,o=i===!0?"".concat(n,"-").concat(m.cssPrefix,"-").concat(t):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},r),{},{id:o}),children:a}]}]}function vi(e){var n=["aria-label","aria-labelledby","title","role"];return n.some(function(t){return t in e})}function Xe(e){var n=e.icons,t=n.main,a=n.mask,r=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,c=e.extra,d=e.watchable,u=d===void 0?!1:d,p=a.found?a:t,h=p.width,b=p.height,g=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(O){return c.classes.indexOf(O)===-1}).filter(function(O){return O!==""||!!O}).concat(c.classes).join(" "),k={children:[],attributes:f(f({},c.attributes),{},{"data-prefix":r,"data-icon":i,class:g,role:c.attributes.role||"img",viewBox:"0 0 ".concat(h," ").concat(b)})};!vi(c.attributes)&&!c.attributes["aria-hidden"]&&(k.attributes["aria-hidden"]="true"),u&&(k.attributes[R]="");var x=f(f({},k),{},{prefix:r,iconName:i,main:t,mask:a,maskId:l,transform:o,symbol:s,styles:f({},c.styles)}),S=a.found&&t.found?z("generateAbstractMask",x)||{children:[],attributes:{}}:z("generateAbstractIcon",x)||{children:[],attributes:{}},C=S.children,H=S.attributes;return x.children=C,x.attributes=H,s?pi(x):hi(x)}function Ot(e){var n=e.content,t=e.width,a=e.height,r=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[R]="");var c=f({},i.styles);Be(r)&&(c.transform=Ur({transform:r,startCentered:!0,width:t,height:a}),c["-webkit-transform"]=c.transform);var d=ce(c);d.length>0&&(l.style=d);var u=[];return u.push({tag:"span",attributes:l,children:[n]}),u}function gi(e){var n=e.content,t=e.extra,a=f(f({},t.attributes),{},{class:t.classes.join(" ")}),r=ce(t.styles);r.length>0&&(a.style=r);var i=[];return i.push({tag:"span",attributes:a,children:[n]}),i}var Se=P.styles;function De(e){var n=e[0],t=e[1],a=e.slice(4),r=fe(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:n,height:t,icon:o}}var yi={found:!1,width:512,height:512};function bi(e,n){!yn&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(n,'" is missing.'))}function _e(e,n){var t=n;return n==="fa"&&m.styleDefault!==null&&(n=_()),new Promise(function(a,r){if(t==="fa"){var i=_n(e)||{};e=i.iconName||e,n=i.prefix||n}if(e&&n&&Se[n]&&Se[n][e]){var o=Se[n][e];return a(De(o))}bi(e,n),a(f(f({},yi),{},{icon:m.showMissingIcons&&e?z("missingIconAbstract")||{}:{}}))})}var Nt=function(){},ze=m.measurePerformance&&te&&te.mark&&te.measure?te:{mark:Nt,measure:Nt},V='FA "7.0.0"',xi=function(n){return ze.mark("".concat(V," ").concat(n," begins")),function(){return Ln(n)}},Ln=function(n){ze.mark("".concat(V," ").concat(n," ends")),ze.measure("".concat(V," ").concat(n),"".concat(V," ").concat(n," begins"),"".concat(V," ").concat(n," ends"))},Ke={begin:xi,end:Ln},re=function(){};function Tt(e){var n=e.getAttribute?e.getAttribute(R):null;return typeof n=="string"}function wi(e){var n=e.getAttribute?e.getAttribute(He):null,t=e.getAttribute?e.getAttribute(Ye):null;return n&&t}function ki(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function Ai(){if(m.autoReplaceSvg===!0)return ie.replace;var e=ie[m.autoReplaceSvg];return e||ie.replace}function Si(e){return y.createElementNS("http://www.w3.org/2000/svg",e)}function Ii(e){return y.createElement(e)}function Rn(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.ceFn,a=t===void 0?e.tag==="svg"?Si:Ii:t;if(typeof e=="string")return y.createTextNode(e);var r=a(e.tag);Object.keys(e.attributes||[]).forEach(function(o){r.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){r.appendChild(Rn(o,{ceFn:a}))}),r}function Ci(e){var n=" ".concat(e.outerHTML," ");return n="".concat(n,"Font Awesome fontawesome.com "),n}var ie={replace:function(n){var t=n[0];if(t.parentNode)if(n[1].forEach(function(r){t.parentNode.insertBefore(Rn(r),t)}),t.getAttribute(R)===null&&m.keepOriginalSource){var a=y.createComment(Ci(t));t.parentNode.replaceChild(a,t)}else t.remove()},nest:function(n){var t=n[0],a=n[1];if(~Ue(t).indexOf(m.replacementClass))return ie.replace(n);var r=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return Z(s)}).join(`
`);t.setAttribute(R,""),t.innerHTML=o}};function jt(e){e()}function Wn(e,n){var t=typeof n=="function"?n:re;if(e.length===0)t();else{var a=jt;m.mutateApproach===Fr&&(a=D.requestAnimationFrame||jt),a(function(){var r=Ai(),i=Ke.begin("mutate");e.map(r),i(),t()})}}var Je=!1;function Hn(){Je=!0}function $e(){Je=!1}var le=null;function Mt(e){if(gt&&m.observeMutations){var n=e.treeCallback,t=n===void 0?re:n,a=e.nodeCallback,r=a===void 0?re:a,i=e.pseudoElementsCallback,o=i===void 0?re:i,s=e.observeMutationsRoot,l=s===void 0?y:s;le=new gt(function(c){if(!Je){var d=_();G(c).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!Tt(u.addedNodes[0])&&(m.searchPseudoElements&&o(u.target),t(u.target)),u.type==="attributes"&&u.target.parentNode&&m.searchPseudoElements&&o([u.target],!0),u.type==="attributes"&&Tt(u.target)&&~Dr.indexOf(u.attributeName))if(u.attributeName==="class"&&wi(u.target)){var p=de(Ue(u.target)),h=p.prefix,b=p.iconName;u.target.setAttribute(He,h||d),b&&u.target.setAttribute(Ye,b)}else ki(u.target)&&r(u.target)})}}),j&&le.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Pi(){le&&le.disconnect()}function Ei(e){var n=e.getAttribute("style"),t=[];return n&&(t=n.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),t}function Fi(e){var n=e.getAttribute("data-prefix"),t=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"",r=de(Ue(e));return r.prefix||(r.prefix=_()),n&&t&&(r.prefix=n,r.iconName=t),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Zr(r.prefix,e.innerText)||Ve(r.prefix,Pn(e.innerText))),!r.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Oi(e){var n=G(e.attributes).reduce(function(t,a){return t.name!=="class"&&t.name!=="style"&&(t[a.name]=a.value),t},{});return n}function Ni(){return{iconName:null,prefix:null,transform:F,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Dt(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},t=Fi(e),a=t.iconName,r=t.prefix,i=t.rest,o=Oi(e),s=je("parseNodeAttributes",{},e),l=n.styleParser?Ei(e):[];return f({iconName:a,prefix:r,transform:F,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Ti=P.styles;function Yn(e){var n=m.autoReplaceSvg==="nest"?Dt(e,{styleParser:!1}):Dt(e);return~n.extra.classes.indexOf(wn)?z("generateLayersText",e,n):z("generateSvgReplacementMutation",e,n)}function ji(){return[].concat(E(dn),E(mn))}function _t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!j)return Promise.resolve();var t=y.documentElement.classList,a=function(u){return t.add("".concat(xt,"-").concat(u))},r=function(u){return t.remove("".concat(xt,"-").concat(u))},i=m.autoFetchSvg?ji():Jt.concat(Object.keys(Ti));i.includes("fa")||i.push("fa");var o=[".".concat(wn,":not([").concat(R,"])")].concat(i.map(function(d){return".".concat(d,":not([").concat(R,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=G(e.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=Ke.begin("onTree"),c=s.reduce(function(d,u){try{var p=Yn(u);p&&d.push(p)}catch(h){yn||h.name==="MissingIcon"&&console.error(h)}return d},[]);return new Promise(function(d,u){Promise.all(c).then(function(p){Wn(p,function(){a("active"),a("complete"),r("pending"),typeof n=="function"&&n(),l(),d()})}).catch(function(p){l(),u(p)})})}function Mi(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Yn(e).then(function(t){t&&Wn([t],n)})}function Di(e){return function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(n||{}).icon?n:Me(n||{}),r=t.mask;return r&&(r=(r||{}).icon?r:Me(r||{})),e(a,f(f({},t),{},{mask:r}))}}var _i=function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.transform,r=a===void 0?F:a,i=t.symbol,o=i===void 0?!1:i,s=t.mask,l=s===void 0?null:s,c=t.maskId,d=c===void 0?null:c,u=t.classes,p=u===void 0?[]:u,h=t.attributes,b=h===void 0?{}:h,g=t.styles,k=g===void 0?{}:g;if(n){var x=n.prefix,S=n.iconName,C=n.icon;return me(f({type:"icon"},n),function(){return W("beforeDOMElementCreation",{iconDefinition:n,params:t}),Xe({icons:{main:De(C),mask:l?De(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:x,iconName:S,transform:f(f({},F),r),symbol:o,maskId:d,extra:{attributes:b,styles:k,classes:p}})})}},zi={mixout:function(){return{icon:Di(_i)}},hooks:function(){return{mutationObserverCallbacks:function(t){return t.treeCallback=_t,t.nodeCallback=Mi,t}}},provides:function(n){n.i2svg=function(t){var a=t.node,r=a===void 0?y:a,i=t.callback,o=i===void 0?function(){}:i;return _t(r,o)},n.generateSvgReplacementMutation=function(t,a){var r=a.iconName,i=a.prefix,o=a.transform,s=a.symbol,l=a.mask,c=a.maskId,d=a.extra;return new Promise(function(u,p){Promise.all([_e(r,i),l.iconName?_e(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(h){var b=fe(h,2),g=b[0],k=b[1];u([t,Xe({icons:{main:g,mask:k},prefix:i,iconName:r,transform:o,symbol:s,maskId:c,extra:d,watchable:!0})])}).catch(p)})},n.generateAbstractIcon=function(t){var a=t.children,r=t.attributes,i=t.main,o=t.transform,s=t.styles,l=ce(s);l.length>0&&(r.style=l);var c;return Be(o)&&(c=z("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(c||i.icon),{children:a,attributes:r}}}},$i={mixout:function(){return{layer:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return me({type:"layer"},function(){W("beforeDOMElementCreation",{assembler:t,params:a});var o=[];return t(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(E(i)).join(" ")},children:o}]})}}}},Li={mixout:function(){return{counter:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,c=l===void 0?{}:l,d=a.styles,u=d===void 0?{}:d;return me({type:"counter",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:a}),gi({content:t.toString(),title:i,extra:{attributes:c,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(E(s))}})})}}}},Ri={mixout:function(){return{text:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?F:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,c=l===void 0?{}:l,d=a.styles,u=d===void 0?{}:d;return me({type:"text",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:a}),Ot({content:t,transform:f(f({},F),i),extra:{attributes:c,styles:u,classes:["".concat(m.cssPrefix,"-layers-text")].concat(E(s))}})})}}},provides:function(n){n.generateLayersText=function(t,a){var r=a.transform,i=a.extra,o=null,s=null;if(Xt){var l=parseInt(getComputedStyle(t).fontSize,10),c=t.getBoundingClientRect();o=c.width/l,s=c.height/l}return Promise.resolve([t,Ot({content:t.innerHTML,width:o,height:s,transform:r,extra:i,watchable:!0})])}}},Un=new RegExp('"',"ug"),zt=[1105920,1112319],$t=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),Ea),Pr),za),Le=Object.keys($t).reduce(function(e,n){return e[n.toLowerCase()]=$t[n],e},{}),Wi=Object.keys(Le).reduce(function(e,n){var t=Le[n];return e[n]=t[900]||E(Object.entries(t))[0][1],e},{});function Hi(e){var n=e.replace(Un,"");return Pn(E(n)[0]||"")}function Yi(e){var n=e.getPropertyValue("font-feature-settings").includes("ss01"),t=e.getPropertyValue("content"),a=t.replace(Un,""),r=a.codePointAt(0),i=r>=zt[0]&&r<=zt[1],o=a.length===2?a[0]===a[1]:!1;return i||o||n}function Ui(e,n){var t=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(n),r=isNaN(a)?"normal":a;return(Le[t]||{})[r]||Wi[t]}function Lt(e,n){var t="".concat(Er).concat(n.replace(":","-"));return new Promise(function(a,r){if(e.getAttribute(t)!==null)return a();var i=G(e.children),o=i.filter(function(he){return he.getAttribute(Fe)===n})[0],s=D.getComputedStyle(e,n),l=s.getPropertyValue("font-family"),c=l.match(jr),d=s.getPropertyValue("font-weight"),u=s.getPropertyValue("content");if(o&&!c)return e.removeChild(o),a();if(c&&u!=="none"&&u!==""){var p=s.getPropertyValue("content"),h=Ui(l,d),b=Hi(p),g=c[0].startsWith("FontAwesome"),k=Yi(s),x=Ve(h,b),S=x;if(g){var C=ei(b);C.iconName&&C.prefix&&(x=C.iconName,h=C.prefix)}if(x&&!k&&(!o||o.getAttribute(He)!==h||o.getAttribute(Ye)!==S)){e.setAttribute(t,S),o&&e.removeChild(o);var H=Ni(),O=H.extra;O.attributes[Fe]=n,_e(x,h).then(function(he){var qn=Xe(f(f({},H),{},{icons:{main:he,mask:zn()},prefix:h,iconName:S,extra:O,watchable:!0})),pe=y.createElementNS("http://www.w3.org/2000/svg","svg");n==="::before"?e.insertBefore(pe,e.firstChild):e.appendChild(pe),pe.outerHTML=qn.map(function(Qn){return Z(Qn)}).join(`
`),e.removeAttribute(t),a()}).catch(r)}else a()}else a()})}function Bi(e){return Promise.all([Lt(e,"::before"),Lt(e,"::after")])}function Gi(e){return e.parentNode!==document.head&&!~Or.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Fe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Vi=function(n){return!!n&&gn.some(function(t){return n.includes(t)})},Xi=function(n){if(!n)return[];for(var t=new Set,a=[n],r=[/(?=\s:)/,new RegExp("(?<=\\)\\)?[^,]*,)")],i=function(){var h=s[o];a=a.flatMap(function(b){return b.split(h).map(function(g){return g.replace(/,\s*$/,"").trim()})})},o=0,s=r;o<s.length;o++)i();a=a.flatMap(function(p){return p.includes("(")?p:p.split(",").map(function(h){return h.trim()})});var l=ae(a),c;try{for(l.s();!(c=l.n()).done;){var d=c.value;if(Vi(d)){var u=gn.reduce(function(p,h){return p.replace(h,"")},d);u!==""&&u!=="*"&&t.add(u)}}}catch(p){l.e(p)}finally{l.f()}return t};function Rt(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(j){var t;if(n)t=e;else if(m.searchPseudoElementsFullScan)t=e.querySelectorAll("*");else{var a=new Set,r=ae(document.styleSheets),i;try{for(r.s();!(i=r.n()).done;){var o=i.value;try{var s=ae(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var c=l.value,d=Xi(c.selectorText),u=ae(d),p;try{for(u.s();!(p=u.n()).done;){var h=p.value;a.add(h)}}catch(g){u.e(g)}finally{u.f()}}}catch(g){s.e(g)}finally{s.f()}}catch(g){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(g.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(g){r.e(g)}finally{r.f()}if(!a.size)return;var b=Array.from(a).join(", ");try{t=e.querySelectorAll(b)}catch{}}return new Promise(function(g,k){var x=G(t).filter(Gi).map(Bi),S=Ke.begin("searchPseudoElements");Hn(),Promise.all(x).then(function(){S(),$e(),g()}).catch(function(){S(),$e(),k()})})}}var Ki={hooks:function(){return{mutationObserverCallbacks:function(t){return t.pseudoElementsCallback=Rt,t}}},provides:function(n){n.pseudoElements2svg=function(t){var a=t.node,r=a===void 0?y:a;m.searchPseudoElements&&Rt(r)}}},Wt=!1,Ji={mixout:function(){return{dom:{unwatch:function(){Hn(),Wt=!0}}}},hooks:function(){return{bootstrap:function(){Mt(je("mutationObserverCallbacks",{}))},noAuto:function(){Pi()},watch:function(t){var a=t.observeMutationsRoot;Wt?$e():Mt(je("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},Ht=function(n){var t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return n.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},t)},qi={mixout:function(){return{parse:{transform:function(t){return Ht(t)}}}},hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-transform");return r&&(t.transform=Ht(r)),t}}},provides:function(n){n.generateAbstractTransformGrouping=function(t){var a=t.main,r=t.transform,i=t.containerWidth,o=t.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),c="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),d="rotate(".concat(r.rotate," 0 0)"),u={transform:"".concat(l," ").concat(c," ").concat(d)},p={transform:"translate(".concat(o/2*-1," -256)")},h={outer:s,inner:u,path:p};return{tag:"g",attributes:f({},h.outer),children:[{tag:"g",attributes:f({},h.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:f(f({},a.icon.attributes),h.path)}]}]}}}},Ie={x:0,y:0,width:"100%",height:"100%"};function Yt(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||n)&&(e.attributes.fill="black"),e}function Qi(e){return e.tag==="g"?e.children:[e]}var Zi={hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-mask"),i=r?de(r.split(" ").map(function(o){return o.trim()})):zn();return i.prefix||(i.prefix=_()),t.mask=i,t.maskId=a.getAttribute("data-fa-mask-id"),t}}},provides:function(n){n.generateAbstractMask=function(t){var a=t.children,r=t.attributes,i=t.main,o=t.mask,s=t.maskId,l=t.transform,c=i.width,d=i.icon,u=o.width,p=o.icon,h=Yr({transform:l,containerWidth:u,iconWidth:c}),b={tag:"rect",attributes:f(f({},Ie),{},{fill:"white"})},g=d.children?{children:d.children.map(Yt)}:{},k={tag:"g",attributes:f({},h.inner),children:[Yt(f({tag:d.tag,attributes:f(f({},d.attributes),h.path)},g))]},x={tag:"g",attributes:f({},h.outer),children:[k]},S="mask-".concat(s||At()),C="clip-".concat(s||At()),H={tag:"mask",attributes:f(f({},Ie),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,x]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:C},children:Qi(p)},H]};return a.push(O,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(C,")"),mask:"url(#".concat(S,")")},Ie)}),{children:a,attributes:r}}}},eo={provides:function(n){var t=!1;D.matchMedia&&(t=D.matchMedia("(prefers-reduced-motion: reduce)").matches),n.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:f(f({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return t||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:f(f({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:t?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),t||a.push({tag:"path",attributes:f(f({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},to={hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return t.symbol=i,t}}}},no=[Gr,zi,$i,Li,Ri,Ki,Ji,qi,Zi,eo,to];fi(no,{mixoutsTo:I});var So=I.noAuto,Bn=I.config,Io=I.library,Gn=I.dom,Vn=I.parse,Co=I.findIconDefinition,Po=I.toHtml,Xn=I.icon,Eo=I.layer,ao=I.text,ro=I.counter;var io=["*"],oo=(()=>{class e{defaultPrefix="fas";fallbackIcon=null;fixedWidth;set autoAddCss(t){Bn.autoAddCss=t,this._autoAddCss=t}get autoAddCss(){return this._autoAddCss}_autoAddCss=!0;static \u0275fac=function(a){return new(a||e)};static \u0275prov=ve({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),so=(()=>{class e{definitions={};addIcons(...t){for(let a of t){a.prefix in this.definitions||(this.definitions[a.prefix]={}),this.definitions[a.prefix][a.iconName]=a;for(let r of a.icon[2])typeof r=="string"&&(this.definitions[a.prefix][r]=a)}}addIconPacks(...t){for(let a of t){let r=Object.keys(a).map(i=>a[i]);this.addIcons(...r)}}getIconDefinition(t,a){return t in this.definitions&&a in this.definitions[t]?this.definitions[t][a]:null}static \u0275fac=function(a){return new(a||e)};static \u0275prov=ve({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),lo=e=>{throw new Error(`Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`)},fo=()=>{throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.")},Jn=e=>e!=null&&(e===90||e===180||e===270||e==="90"||e==="180"||e==="270"),co=e=>{let n=Jn(e.rotate),t={[`fa-${e.animation}`]:e.animation!=null&&!e.animation.startsWith("spin"),"fa-spin":e.animation==="spin"||e.animation==="spin-reverse","fa-spin-pulse":e.animation==="spin-pulse"||e.animation==="spin-pulse-reverse","fa-spin-reverse":e.animation==="spin-reverse"||e.animation==="spin-pulse-reverse","fa-pulse":e.animation==="spin-pulse"||e.animation==="spin-pulse-reverse","fa-fw":e.fixedWidth,"fa-border":e.border,"fa-inverse":e.inverse,"fa-layers-counter":e.counter,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both",[`fa-${e.size}`]:e.size!==null,[`fa-rotate-${e.rotate}`]:n,"fa-rotate-by":e.rotate!=null&&!n,[`fa-pull-${e.pull}`]:e.pull!==null,[`fa-stack-${e.stackItemSize}`]:e.stackItemSize!=null};return Object.keys(t).map(a=>t[a]?a:null).filter(a=>a!=null)},qe=new WeakSet,Kn="fa-auto-css";function uo(e,n){if(!n.autoAddCss||qe.has(e))return;if(e.getElementById(Kn)!=null){n.autoAddCss=!1,qe.add(e);return}let t=e.createElement("style");t.setAttribute("type","text/css"),t.setAttribute("id",Kn),t.innerHTML=Gn.css();let a=e.head.childNodes,r=null;for(let i=a.length-1;i>-1;i--){let o=a[i],s=o.nodeName.toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=o)}e.head.insertBefore(t,r),n.autoAddCss=!1,qe.add(e)}var mo=e=>e.prefix!==void 0&&e.iconName!==void 0,ho=(e,n)=>mo(e)?e:Array.isArray(e)&&e.length===2?{prefix:e[0],iconName:e[1]}:{prefix:n,iconName:e},po=(()=>{class e{stackItemSize=ee("1x");size=ee();_effect=ct(()=>{if(this.size())throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.')});static \u0275fac=function(a){return new(a||e)};static \u0275dir=rt({type:e,selectors:[["fa-icon","stackItemSize",""],["fa-duotone-icon","stackItemSize",""]],inputs:{stackItemSize:[1,"stackItemSize"],size:[1,"size"]}})}return e})(),vo=(()=>{class e{size=ee();classes=ye(()=>{let t=this.size(),a=t?{[`fa-${t}`]:!0}:{};return Ze(Qe({},a),{"fa-stack":!0})});static \u0275fac=function(a){return new(a||e)};static \u0275cmp=ge({type:e,selectors:[["fa-stack"]],hostVars:2,hostBindings:function(a,r){a&2&&ft(r.classes())},inputs:{size:[1,"size"]},ngContentSelectors:io,decls:1,vars:0,template:function(a,r){a&1&&(st(),lt(0))},encapsulation:2,changeDetection:0})}return e})(),Wo=(()=>{class e{icon=A();title=A();animation=A();mask=A();flip=A();size=A();pull=A();border=A();inverse=A();symbol=A();rotate=A();fixedWidth=A();transform=A();a11yRole=A();renderedIconHTML=ye(()=>{let t=this.icon()??this.config.fallbackIcon;if(!t)return fo(),"";let a=this.findIconDefinition(t);if(!a)return"";let r=this.buildParams();uo(this.document,this.config);let i=Xn(a,r);return this.sanitizer.bypassSecurityTrustHtml(i.html.join(`
`))});document=$(tt);sanitizer=$(ut);config=$(oo);iconLibrary=$(so);stackItem=$(po,{optional:!0});stack=$(vo,{optional:!0});constructor(){this.stack!=null&&this.stackItem==null&&console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x" />.')}findIconDefinition(t){let a=ho(t,this.config.defaultPrefix);if("icon"in a)return a;let r=this.iconLibrary.getIconDefinition(a.prefix,a.iconName);return r??(lo(a),null)}buildParams(){let t=this.fixedWidth(),a={flip:this.flip(),animation:this.animation(),border:this.border(),inverse:this.inverse(),size:this.size(),pull:this.pull(),rotate:this.rotate(),fixedWidth:typeof t=="boolean"?t:this.config.fixedWidth,stackItemSize:this.stackItem!=null?this.stackItem.stackItemSize():void 0},r=this.transform(),i=typeof r=="string"?Vn.transform(r):r,o=this.mask(),s=o!=null?this.findIconDefinition(o):null,l={},c=this.a11yRole();c!=null&&(l.role=c);let d={};return a.rotate!=null&&!Jn(a.rotate)&&(d["--fa-rotate-angle"]=`${a.rotate}`),{title:this.title(),transform:i,classes:co(a),mask:s??void 0,symbol:this.symbol(),attributes:l,styles:d}}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=ge({type:e,selectors:[["fa-icon"]],hostAttrs:[1,"ng-fa-icon"],hostVars:2,hostBindings:function(a,r){a&2&&(ot("innerHTML",r.renderedIconHTML(),nt),it("title",r.title()??void 0))},inputs:{icon:[1,"icon"],title:[1,"title"],animation:[1,"animation"],mask:[1,"mask"],flip:[1,"flip"],size:[1,"size"],pull:[1,"pull"],border:[1,"border"],inverse:[1,"inverse"],symbol:[1,"symbol"],rotate:[1,"rotate"],fixedWidth:[1,"fixedWidth"],transform:[1,"transform"],a11yRole:[1,"a11yRole"]},outputs:{icon:"iconChange",title:"titleChange",animation:"animationChange",mask:"maskChange",flip:"flipChange",size:"sizeChange",pull:"pullChange",border:"borderChange",inverse:"inverseChange",symbol:"symbolChange",rotate:"rotateChange",fixedWidth:"fixedWidthChange",transform:"transformChange",a11yRole:"a11yRoleChange"},decls:0,vars:0,template:function(a,r){},encapsulation:2,changeDetection:0})}return e})();var Ho=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=at({type:e});static \u0275inj=et({})}return e})();export{Wo as a,Ho as b};
