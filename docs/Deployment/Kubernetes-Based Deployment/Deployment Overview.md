---
sidebar_position: 2
---

# Deployment Overview

IUDX platform can be deployed in Docker Swarm using the scripts and Swarm code present in this directory and sub-directories. Each component is deployed as a single instance in Swarm. The components can be scaled manually. IUDX platform exposes endpoints through two ports - one for HTTPS traffic which it passes to Nginx and Nginx routes to the appropriate service; another for Rabbitmq management and AMQPS streaming. The whole system is monitored using a monitoring stack module - Prometheus for metrics, promtail and Loki for logs, and Grafana for visualization and alerting. The overall architecture of Swarm deployment is summarized in the figure below.

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/Overview-Deloyment-IUDX-Swarm.png)<br/>
</div></div>
    Fig1. The above diagram depicts the overview of the complete IUDX system in a kubernetes environment 


* IUDX Catalogue server - where a consumer discovers different datasets available . 
* AAA server - where a user (consumer/provider,data ingester/delegate) can get set/request policies, and get a token. Use the token to publish/consume the data from resource server if the data resides in IUDX or through resource server proxy and adapter in front of the data sources. 
* IUDX platform supports following input  data flow,
    * A data ingester ( delegate ) can push the data from the downstream source (ICCC) to databroker (Rabbitmq) Which then is consumed by Logstash, latest ingestion pipeline and push it to the Meta Data/Data Store (Elasticsearch) and Latest Data store (Redis).
* IUDX platform supports following output data flows,
    * Get data through standardised Resource server APIs

    * Get live streaming data through Rabbitmq using resource server Subscription
    * An adapter can reside near the data source, and the queries made through the resource proxy server are passed through Rabbitmq to the adapter . The adapter in turn queries the datasource and pushes the results back into rabbitmq and resource proxy server consumes from Rabbitmq and sends back to user
* IUDX AAA platform manages the identities of users through
Keycloak
* IUDX AAA platform manages the policies, APDs through credentials/Policy Data store
* IUDX platform is monitored through micrometer, prometheus for metrics and promtail, Loki for logs and Grafana for Visualisation and email alerting through SMTP server
* All HTTPS request are processed through Network Load-Balancer-> Nginx ingress with rate limiting set to protect against overwhelming of IUDX platform
* The Rabbitmq specific co communication i.e. streaming of data through AMQPS and HTTPS management interface is through another network Load-Balancer
* The IUDX platform uses velero as backup system
Please watch the videos
What is IUDX? to get overview of IUDX
IUDX Architecture Overview for deep drive of IUDX architecture
Get more resources on IUDX at IUDX Developer Section

## Features

1. Scaling of services can be done manually by increasing the number of replica containers backing the swarm service.
2. Cloud agnostic deployment, achieved through the layered architecture of deployment and using open source tools whenever possible instead of using cloud services.
3. Cost-effective deployment, typically can be done with 4-6 nodes or a single node based on load requirements
4. It is useful for small-scale deployment/prototyping/proof-of-concept (PoC) where reliability is not critical.

## Dependency in IUDX systems and ordering

IUDX components depend on each other and are represented below in a Directed Acyclic Graph (DAG).

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/IUDX-Dependency-Graph.png)<br/>
</div></div>

From Directed Acyclic Graph (DAG), the components can be deployed as following in 6 stages:

## Order of Deployment
   
<details>

<summary>Stage 1</summary>
1. Immudb<br/>
2. Rabbitmq<br/>
3. Postgresql<br/>
4. Redis<br/>
5. Zookeeper<br/>
6. Elasticsearch (Deploy ELK together)<br/>
</details>

<details>
<summary>Stage 2</summary>
    1. Logstash<br/>
    2. Kibana<br/>
    3. Keycloak<br/>
    4. Latest Ingestion Pipeline<br/>
    5. Auditing Server<br/>
</details>

   <details> 
<summary>Stage 3</summary>
    1. AAA Server
   </details>

<details>
<summary>Stage 4</summary>
    1. Catalogue Server
</details>


<details>
<summary>Stage 5</summary>
    1. Resource Server<br/>
    2. Resource Server Proxy<br/>
    3. File Server<br/>
    4. Data Ingestion Server<br/>
</details>

<details>
<summary>Stage 6</summary>
    1. Advance Monitoring Stack
</details>

## IUDX Component Version Matrix



| Component                 | Image Version  |
|:---------------------------:|:----------------:|
| [Immudb](./IUDX%20Component%20Installation/Immudb.md)                    | 1.9DOM.2          |
| [RabbitMQ](./IUDX%20Component%20Installation/RabbitMQ.md)                  | 3.12.12        |
| [PostgreSQL](./IUDX%20Component%20Installation/PostgreSQL.md)                | 14.4.0         |
| [Redis](./IUDX%20Component%20Installation/Redis.md)                     | 7.2.4(redis)-2.6.8(rejson) |
| [Zookeeper](./IUDX%20Component%20Installation/Zookeeper.md)                 | 3.8.0          |
| [Elasticsearch](./IUDX%20Component%20Installation/ELK%20stack.md)             | 8.12.1          |
| [Logstash](./IUDX%20Component%20Installation/ELK%20stack.md)                  | 8.12.1          |
| [Kibana](./IUDX%20Component%20Installation/ELK%20stack.md)                    | 8.12.1          |
| [Keycloak](./IUDX%20Component%20Installation/Keycloak.md)                    | 23.0.4          |
| [Latest Ingestion Pipeline](./IUDX%20Component%20Installation/Latest-Ingestion-Pipeline.md) | 5.5.0-6e342fa  |
| [Auditing server](./IUDX%20Component%20Installation/Auditing%20Server.md)           | 5.5.0-3421c4d  |
| [AAA-server](./IUDX%20Component%20Installation/AAA%20Server.md)                | 5.5.0-5be0827  |
| [Acl-Apd server](./IUDX%20Component%20Installation/ACL-APD.md)           | 1.0.1-9809ff5  |
| [Catalogue API server](./IUDX%20Component%20Installation/Catalogue-Server.md)      | 5.5.0-alpha-e4d6ac2  |
| [Onboarding server](./IUDX%20Component%20Installation/Onboarding%20Server.md)     | 1.0.1-934a7c2  |
| [Resource API server](./IUDX%20Component%20Installation/Resource-Server.md)       | 5.5.0-d8e6fb0  |
| [Resource Server - Proxy](./IUDX%20Component%20Installation/Resource-Server%20Proxy.md) | 5.5.0-alpha-9dbe370  |
| [File server](./IUDX%20Component%20Installation/File%20Server.md)               | 5.5.0-84f7862  |
| [GIS Server](./IUDX%20Component%20Installation/GIS%20Server.md)              | 5.5.0-83eee7a  |
| [Data Ingestion server](./IUDX%20Component%20Installation/Data-%20Ingestion%20Server.md)     | 5.5.0-912b5db  |
| [Advance Monitoring Stack](./IUDX%20Component%20Installation/Advance%20Monitoring%20Stack.md)   | 4.0.0-4  |
| [Geo Server](./IUDX%20Component%20Installation/Geo%20Server.md)   | 1.0.0-alpha-2808970  |
| [Data Market Place](./IUDX%20Component%20Installation/Data%20Market%20Place.md) | 1.0.0-alpha-24b54d3  |



        