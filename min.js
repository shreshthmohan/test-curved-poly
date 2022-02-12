self.testCurvedPoly=function(n){"use strict";function r(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==t)return;var e,o,i=[],a=!0,u=!1;try{for(t=t.call(n);!(a=(e=t.next()).done)&&(i.push(e.value),!r||i.length!==r);a=!0);}catch(n){u=!0,o=n}finally{try{a||null==t.return||t.return()}finally{if(u)throw o}}return i}(n,r)||function(n,r){if(!n)return;if("string"==typeof n)return t(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(n);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return t(n,r)}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,r){(null==r||r>n.length)&&(r=n.length);for(var t=0,e=new Array(r);t<r;t++)e[t]=n[t];return e}var e=Math.PI;function o(n,t){var e=r(n,2),o=e[0],i=e[1],a=r(t,2),u=a[0],c=a[1],l=i*Math.cos(o),d=c*Math.cos(u);return[i*Math.sin(o)+c*Math.sin(u),l+d]}return n.roundedPolygonBySideLength=function(n){var t=n.sideLength,i=n.sideCount,a=void 0===i?3:i,u=n.borderRadius,c=void 0===u?0:u,l=n.cx,d=void 0===l?0:l,s=n.cy,f=void 0===s?0:s,y=function(n){var r=n.sideLength,t=n.sideCount,o=2*e/t;return{circumcircleRadius:r/(2*Math.sin(o/2)),angleIntendedBySide:o}}({sideLength:t,sideCount:a}),h=y.circumcircleRadius,v=y.angleIntendedBySide,g=function(n){for(var t=n.sideCount,e=n.radiusOfInnerPolygon,i=n.borderRadius,a=n.alpha,u=n.cx,c=void 0===u?0:u,l=n.cy,d=void 0===l?0:l,s=[],f=0;f<t;f++){var y=o([f*a+a/2,e],[f*a,i]),h=o([f*a+a/2,e],[(f+1)*a,i]);s.push(y,h)}return s.map((function(n){var t=r(n,2),e=t[0],o=t[1];return[e+c,o+d]}))}({sideCount:a,radiusOfInnerPolygon:h-c/Math.cos(v/2),borderRadius:c,alpha:v,cx:d,cy:f}),p=function(n){var r=n.allPoints,t=n.borderRadius,e=n.alpha;return r.length?"M ".concat(r[0].join(" "),"\n    ").concat(r.slice(1).map((function(n,r){return r%2==0?"A ".concat(t," ").concat(t," ").concat(e," 0 0 ").concat(n.join(" ")):"L ".concat(n.join(" "))})).join(" "),"\n    z\n    "):""}({allPoints:g,borderRadius:c,alpha:v});return p},n}({});