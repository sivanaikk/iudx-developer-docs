"use strict";(self.webpackChunkiudx_website=self.webpackChunkiudx_website||[]).push([[9268],{3905:function(e,t,a){a.d(t,{Zo:function(){return m},kt:function(){return u}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),p=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},c="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,u=c["".concat(i,".").concat(d)]||c[d]||k[d]||l;return a?n.createElement(u,o(o({ref:t},m),{},{components:a})):n.createElement(u,o({ref:t},m))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<l;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},63601:function(e,t,a){a.r(t),a.d(t,{contentTitle:function(){return i},default:function(){return k},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return m}});var n=a(87462),r=a(63366),l=(a(67294),a(3905)),o=["components"],s={sidebar_position:6},i=void 0,p={unversionedId:"Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack",id:"Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack",isDocsHomePage:!1,title:"ELK stack",description:"Architecture",source:"@site/docs/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack.md",sourceDirName:"Deployment/Kubernetes-Based Deployment/IUDX Component Installation",slug:"/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack",permalink:"/docs/next/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack",editUrl:"https://github.com/datakaveri/iudx-developer-docs/blob/main/docs/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/ELK stack.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Zookeeper",permalink:"/docs/next/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/Zookeeper"},next:{title:"Keycloak",permalink:"/docs/next/Deployment/Kubernetes-Based Deployment/IUDX Component Installation/Keycloak"}},m=[{value:"Prerequisite",id:"prerequisite",children:[],level:3},{value:"Installation",id:"installation",children:[],level:3},{value:"Configuration",id:"configuration",children:[],level:3},{value:"Tests",id:"tests",children:[],level:3},{value:"Notes",id:"notes",children:[],level:3}],c={toc:m};function k(e){var t=e.components,s=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,n.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("div",{class:"img_background"},(0,l.kt)("div",{style:{textAlign:"center"}},(0,l.kt)("p",null,(0,l.kt)("img",{alt:"Architecture",src:a(53134).Z})))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Deploys Elasticsearch, Logstash, and Kibana. "),(0,l.kt)("li",{parentName:"ul"},"Elasticsearch is used as a meta-data and data store. Logstash acts as the data pipeline between RabbitMQ and Elasticsearch. Kibana is used for visualization and management of the ELK stack.")),(0,l.kt)("h3",{id:"prerequisite"},"Prerequisite"),(0,l.kt)("p",null,"RabbitMQ needs to be up for Logstash to connect."),(0,l.kt)("h3",{id:"installation"},"Installation"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Navigate to the below directory:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"cd iudx-deployment/Docker-Swarm-deployment/single-node/elk/\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Assign the node label if not assigned during swarm installation using:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"docker node update --label-add database_node=true <node_name>\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Make a copy of the sample secrets directory by running the following command:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"cp -r example-secrets/secrets .\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Generate the passwords:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"./create-secrets.sh\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"For AWS-S3 Snapshot and Restore, define the ",(0,l.kt)("inlineCode",{parentName:"p"},"s3-access-key")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"s3-secret-key")," in the file ",(0,l.kt)("inlineCode",{parentName:"p"},"secrets/passwords/snapshot-credentials.env")," as shown below:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-env"},"ELASTICSEARCH_KEYS=s3.client.default.access_key=<s3-access-key>,s3.client.default.secret_key=<s3-secret-key>\n")))),(0,l.kt)("ol",{start:6},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"For Azure-Blob-Storage, define the ",(0,l.kt)("inlineCode",{parentName:"p"},"storage-account-name")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"storage-access-key")," in ",(0,l.kt)("inlineCode",{parentName:"p"},"secrets/passwords/snapshot-credentials.env")," as shown below:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-env"},"ELASTICSEARCH_KEYS=azure.client.default.account=<storage_account_name>,azure.client.default.key=<access-key>\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Generate keystores for Kibana and Logstash:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"./generate-keystore.sh\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Generate certs using below:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"./generate-certs.sh\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Define approriate domain for Kibana in ",(0,l.kt)("inlineCode",{parentName:"p"},"kibana/kibana.yaml")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"}," secrets/\n \u251c\u2500\u2500 keystores\n \u2502   \u251c\u2500\u2500 kibana.keystore\n \u2502   \u2514\u2500\u2500 logstash.keystore\n \u251c\u2500\u2500 passwords\n \u2502   \u251c\u2500\u2500 elasticsearch-cat-password\n \u2502   \u251c\u2500\u2500 elasticsearch-fs-password\n \u2502   \u251c\u2500\u2500 elasticsearch-rs-password\n \u2502   \u251c\u2500\u2500 elasticsearch-su-password\n \u2502   \u251c\u2500\u2500 es-password.env\n \u2502   \u251c\u2500\u2500 kibana-admin-password\n \u2502   \u251c\u2500\u2500 kibana-admin-username\n \u2502   \u251c\u2500\u2500 kibana-system-password\n \u2502   \u251c\u2500\u2500 logstash-internal-password\n \u2502   \u251c\u2500\u2500 logstash-rabbitmq-password\n \u2502   \u251c\u2500\u2500 logstash-rabbitmq-username\n \u2502   \u251c\u2500\u2500 logstash-system-password\n \u2502   \u2514\u2500\u2500 snapshot-credentials.env\n \u2514\u2500\u2500 pki\n     \u251c\u2500\u2500 elastic-certificates.p12\n     \u251c\u2500\u2500 elastic-stack-ca.p12\n     \u251c\u2500\u2500 s3-access-key\n     \u2514\u2500\u2500 s3-secret-key\n")))),(0,l.kt)("ol",{start:10},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Deifine approriate domain for kibana in kibana/kibana.yaml")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Define Appropriate values of resources in \u2018database-stack.resources.yml\u2019 as shown in the sample file ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/elk/example-database-stack.resources.yaml"},"example-database-stack.resources.yaml"))),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"CPU requests and limits"),(0,l.kt)("li",{parentName:"ul"},"RAM requests and limits"),(0,l.kt)("li",{parentName:"ul"},"PID limit")))),(0,l.kt)("ol",{start:12},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Deploy ELK stack as follows:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"cp example-database-stack.resources.yaml database-stack.resources.yaml\n\ndocker stack deploy -c database-stack.yaml -c database-stack.resources.yaml database\n")))),(0,l.kt)("h3",{id:"configuration"},"Configuration"),(0,l.kt)("p",null,"After elasticsearch is up, account generator needs to be deployed(only on clean deployment)"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Bring up the account generator stack (only on clean deployment): "),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"docker stack deploy -c account-generator.yaml tmp\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Monitor logs to ensure creation:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"docker service logs tmp_account-generator -f\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Remove the stack after successful account generator:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"docker stack rm tmp\n")))),(0,l.kt)("h3",{id:"tests"},"Tests"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Create a Test Index"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"Create a test index called ",(0,l.kt)("inlineCode",{parentName:"li"},"iudx__test-itms"),". Refer ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/elk/tests/create-index.txt"},"here")," for the command."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"RMQ-ELK Pipeline Test"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Test the publishing of messages to exchange and routing to queue through a Python script"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Create Python Virtual Environment"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"# Create venv\npython3 -m venv ~/.venv/iudx-tests\n\n# Go into venv\nsource ~/.venv/iudx-tests/bin/activate\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install All Necessary Packages from ",(0,l.kt)("inlineCode",{parentName:"p"},"requirements.txt")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"pip install -r requirements.txt\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Configure Test Exchanges"),(0,l.kt)("table",{parentName:"li"},(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"VHOST"),(0,l.kt)("th",{parentName:"tr",align:null},"Exchange Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type of Exchange"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"IUDX"),(0,l.kt)("td",{parentName:"tr",align:null},"test-itms"),(0,l.kt)("td",{parentName:"tr",align:null},"topic"))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Configure Exchange-Queue Binding:"),(0,l.kt)("table",{parentName:"li"},(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"VHOST"),(0,l.kt)("th",{parentName:"tr",align:null},"Exchange"),(0,l.kt)("th",{parentName:"tr",align:null},"Queue"),(0,l.kt)("th",{parentName:"tr",align:null},"Routing"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"IUDX"),(0,l.kt)("td",{parentName:"tr",align:null},"test-itms"),(0,l.kt)("td",{parentName:"tr",align:null},"database"),(0,l.kt)("td",{parentName:"tr",align:null},"key")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"IUDX"),(0,l.kt)("td",{parentName:"tr",align:null},"test-itms"),(0,l.kt)("td",{parentName:"tr",align:null},"redis-latest"),(0,l.kt)("td",{parentName:"tr",align:null},"key"))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Configure Parameters in the Python Script:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},"username = ''\npassword = ''\nhost = ''\n# public AMQPS port \nport = \n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Run the Python Scripts")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Refer ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/databroker/tests"},"here"))," for more information."))))),(0,l.kt)("p",{parentName:"li"},"b. Test if the Messages have Reached Elasticsearch"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"Use the count command in Kibana console->Management-> dev tools. The count should match the number of messages published.",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"GET iudx__test-itms/_count\n")))),(0,l.kt)("p",{parentName:"li"},"c. Check for No Error Logs at Logstash during the Publication."))),(0,l.kt)("h3",{id:"notes"},"Notes"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Kibana UI can be accessed from ",(0,l.kt)("strong",{parentName:"li"},"https://< kibana-domain-name >")," "),(0,l.kt)("li",{parentName:"ol"},"Kibana is tls secured through centralised nginx."),(0,l.kt)("li",{parentName:"ol"},"To check if the elk stacks are deployed and running: ",(0,l.kt)("inlineCode",{parentName:"li"},"docker stack ps database")),(0,l.kt)("li",{parentName:"ol"},"For more information on installation instructions, refer ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/elk"},"here")),".")))}k.isMDXComponent=!0},53134:function(e,t,a){t.Z=a.p+"assets/images/ElasticStack-arch-058fa07c87654dab2aa39a908452275e.png"}}]);