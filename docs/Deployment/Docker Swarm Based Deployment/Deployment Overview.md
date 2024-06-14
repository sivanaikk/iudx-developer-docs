---
sidebar_position: 3
---

# Deployment Overview

IUDX platform can be deployed in Docker Swarm using the scripts and Swarm code present in this directory and sub-directories. Each component is deployed as a single instance in Swarm. The components can be scaled manually. IUDX platform exposes endpoints through two ports - one for HTTPS traffic which it passes to Nginx and Nginx routes to the appropriate service; another for Rabbitmq management and AMQPS streaming. The whole system is monitored using a monitoring stack module - Prometheus for metrics, promtail and Loki for logs, and Grafana for visualization and alerting. The overall architecture of Swarm deployment is summarized in the figure below.

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/Overview-Deloyment-IUDX-Swarm.png)<br/>
</div></div>

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
| **[Immudb](./IUDX%20Component%20Installation/Immudb.md)**                    | 1.9DOM.2          |
| **[RabbitMQ](./IUDX%20Component%20Installation/RabbitMQ.md)**                  | 3.12.12        |
| **[PostgreSQL](./IUDX%20Component%20Installation/PostgreSQL.md)**                | 14.4.0         |
| **[Redis](./IUDX%20Component%20Installation/Redis.md)**                     | 7.2.4(redis)-2.6.8(rejson) |
| **[Zookeeper](./IUDX%20Component%20Installation/Zookeeper.md)**                 | 3.8.0          |
| **[Elasticsearch](./IUDX%20Component%20Installation/ELK%20Stack.md)**             | 8.12.1          |
| **[Logstash](./IUDX%20Component%20Installation/ELK%20Stack.md)**                  | 8.12.1          |
| **[Kibana](./IUDX%20Component%20Installation/ELK%20Stack.md)**                    | 8.12.1          |
| **[Keycloak](./IUDX%20Component%20Installation/Keycloak.md)**|23.0.4|
| **[Latest Ingestion Pipeline](./IUDX%20Component%20Installation/Latest%20Ingestion%20Pipeline.md)** | 5.5.0-6e342fa  |
| **[Auditing server](./IUDX%20Component%20Installation/Auditing%20Server.md)**           | 5.5.0-3421c4d  |
| **[AAA-server](./IUDX%20Component%20Installation/AAA%20Server.md)**                | 5.5.0-5be0827  |
| **[ACL-APD](./IUDX%20Component%20Installation/ACL-APD.md)** | 1.0.1-9809ff5 |
| **[Catalogue API server](./IUDX%20Component%20Installation/Catalogue%20Server.md)**      | 5.5.0-alpha-e4d6ac2  |
| **[Onboarding Server](./IUDX%20Component%20Installation/Onboarding%20Server.md)** | 1.0.1-934a7c2 |
| **[Resource API server](./IUDX%20Component%20Installation/Resource%20Server.md)**       | 5.5.0-d8e6fb0  |
| **[Resource proxy server](./IUDX%20Component%20Installation/Resource%20Server%20Proxy.md)** | 5.5.0-alpha-9dbe370 |
| **[File server](./IUDX%20Component%20Installation/File%20Server.md)**               | 5.5.0-84f7862 |
| **[GIS Interface server](./IUDX%20Component%20Installation/GIS%20Interface%20server.md)** | 5.5.0-83eee7a |
| **[Data Ingestion server](./IUDX%20Component%20Installation/Data%20Ingestion%20Server.md)**     | 5.5.0-912b5db  |
| **[Advance Monitoring Stack](./IUDX%20Component%20Installation/Advance%20Monitoring%20Stack.md)**   | 4.0.0-4        |
| **[OGC Resource server](./IUDX%20Component%20Installation/OGC%20Resource%20Server.md)** | 1.0.0-alpha-2808970 |
| **[Data Marketplace apd](./IUDX%20Component%20Installation/Data%20Marketplace%20apd.md)** | 1.0.0-alpha-24b54d3 |
        