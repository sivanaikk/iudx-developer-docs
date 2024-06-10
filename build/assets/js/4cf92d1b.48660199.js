"use strict";(self.webpackChunkiudx_website=self.webpackChunkiudx_website||[]).push([[5555],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return k}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=a,k=c["".concat(s,".").concat(d)]||c[d]||u[d]||i;return n?r.createElement(k,o(o({ref:t},m),{},{components:n})):r.createElement(k,o({ref:t},m))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},81992:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return m}});var r=n(87462),a=n(63366),i=(n(67294),n(3905)),o=["components"],l={sidebar_position:10},s=void 0,p={unversionedId:"Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server",id:"Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server",isDocsHomePage:!1,title:"Auditing Server",description:"Prerequisites",source:"@site/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server.md",sourceDirName:"Deployment/Docker Swarm-Based Deployment/IUDX Component Installation",slug:"/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server",permalink:"/docs/next/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server",editUrl:"https://github.com/datakaveri/iudx-developer-docs/blob/main/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Latest-Ingestion-Pipeline",permalink:"/docs/next/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Latest-Ingestion-Pipeline"},next:{title:"AAA Server",permalink:"/docs/next/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/AAA Server"}},m=[{value:"Prerequisites",id:"prerequisites",children:[],level:3},{value:"Installation",id:"installation",children:[],level:3},{value:"Notes",id:"notes",children:[],level:3}],c={toc:m};function u(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"The rs schema needs to be created using Flyway before deploying the auditing server. Refer to the PostgreSQL installation steps above."),(0,i.kt)("h3",{id:"installation"},"Installation"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Navigate to the below directory:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"cd iudx-deployment/Docker-Swarm-deployment/single-node/auditing-server\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Assign the node label if not assigned during swarm installation using:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"docker node update --label-add auditing-node=true <node_name>\n"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Make a copy of the sample secrets directory by running the following command:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"cp -r example-secrets/secrets .\n")),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Provide a correct config file for bringing up the auditing server. Substitute appropriate values using commands mentioned in config files.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Configure the ",(0,i.kt)("inlineCode",{parentName:"p"},"secrets/.auditing.env")," file with appropriate values in the placeholders '",(0,i.kt)("strong",{parentName:"p"},"< >"),"'.")))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Define appropriate values of resources in ",(0,i.kt)("inlineCode",{parentName:"p"},"auditing-stack.resources.yaml")," as shown in the sample file in ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/auditing-server/example-auditing-stack.resources.yaml"},"example-auditing-stack.resources.yaml")),"."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"CPU requests and limits"),(0,i.kt)("li",{parentName:"ul"},"RAM requests and limits"),(0,i.kt)("li",{parentName:"ul"},"PID limit ")))),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"To install the auditing server stack, use the following command:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"cp example-auditing-stack.resources.yaml auditing-stack.resources.yaml\n\ndocker stack deploy -c auditing-stack.yaml -c auditing-stack.resources.yaml auditing\n")))),(0,i.kt)("h3",{id:"notes"},"Notes"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"To check if the auditing server is deployed and running:",(0,i.kt)("inlineCode",{parentName:"li"},"docker stack ps auditing"))),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"For more information on installation instructions, refer ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/auditing-server#introduction"},"here")),"."),(0,i.kt)("li",{parentName:"ol"},"For more information about the auditing-server, refer ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/auditing-server"},"here")),".")))}u.isMDXComponent=!0}}]);