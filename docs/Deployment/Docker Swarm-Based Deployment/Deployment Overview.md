---
sidebar_position: 3
---

# Deployment Overview

IUDX platform can be deployed in Docker Swarm using the scripts and Swarm code present in this directory and sub-directories. Each component is deployed as a single instance in Swarm. The components can be scaled manually. IUDX platform exposes endpoints through two ports - one for HTTPS traffic which it passes to Nginx and Nginx routes to the appropriate service; one for Rabbitmq management and AMQPS streaming. The whole system is monitored using a monitoring stack module - Prometheus for metrics, promtail and Loki for logs, and Grafana for visualization and alerting. The overall architecture of Swarm deployment is summarized in the figure below.

![Architecture](../../../resources/auth/Overview-Deloyment-IUDX-Swarm.png)<br/>

## Features

1. Scaling of services can be done manually by increasing the number of replica containers backing the swarm service.
2. Cloud agnostic deployment, achieved through the layered architecture of deployment and using open source tools whenever possible instead of using cloud services.
3. Cost-effective deployment, typically can be done with 4-6 nodes or a single node based on load requirements
4. It is useful for small-scale deployment/prototyping/proof-of-concept (PoC) where reliability is not critical.

## Dependency in IUDX systems and ordering

IUDX components depend on each other and are represented below in a Directed Acyclic Graph (DAG).

![Architecture](../../../resources/auth/IUDX-Dependency-Graph.png)<br/>

From DAG, the components can be deployed as follows in 6 stages:

## Order of Deployment
[Title](../../../versioned_docs)
   
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
    4. Latest ingestion pipeline<br/>
    5. Auditing server<br/>
</details>

   <details> 
<summary>Stage 3</summary>
    1. AAA server
   </details>

<details>
<summary>Stage 4</summary>
    1. Catalogue server
</details>


<details>
<summary>Stage 5</summary>
    1. Resource Server<br/>
    2. Resource Server Proxy<br/>
    3. File server<br/>
    4. GIS server<br/>
    5. Data Ingestion server<br/>
</details>

<details>
<summary>Stage 6</summary>
    1. Advance Monitoring Stack
</details>

## IUDX Component Version Matrix


| Component                 | Image Version  |
|:---------------------------:|:----------------:|
| **[Immudb](./IUDX%20Component%20Installation/Immudb.md)**                    | 1.4.1          |
| **[Rabbitmq](./IUDX%20Component%20Installation/RabbitMQ.md)**                  | 3.11.10        |
| **[PostgreSQL](./IUDX%20Component%20Installation/RabbitMQ.md)**                | 14.4.0         |
| **[Redis](./IUDX%20Component%20Installation/Redis.md)**                     | 7.0.2(redis)-2.0.9(rejson) |
| **[Zookeeper](./IUDX%20Component%20Installation/Zookeeper.md)**                 | 3.8.0          |
| **[Elasticsearch](./IUDX%20Component%20Installation/ELK%20stack.md)**             | 8.7.0          |
| **[Logstash](./IUDX%20Component%20Installation/ELK%20stack.md)**                  | 8.7.0          |
| **[Kibana](./IUDX%20Component%20Installation/ELK%20stack.md)**                    | 8.7.0          |
| **[Latest Ingestion Pipeline](./IUDX%20Component%20Installation/Latest-Ingestion-Pipeline.md)** | 4.5.0-8562630  |
| **[Auditing server](./IUDX%20Component%20Installation/Auditing%20Server.md)**           | 1.0.0-db57a99  |
| **[AAA-server](./IUDX%20Component%20Installation/AAA%20Server.md)**                | 4.5.0-**[aded501](https://github.com/datakaveri/iudx-aaa-server/pkgs/container/aaa-depl/96914619?tag=4.5.0-aded501)**  |
| **[Catalogue API server](./IUDX%20Component%20Installation/Catalogue-Server.md)**      | 4.5.0-**[c9d7598](https://github.com/datakaveri/iudx-catalogue-server/pkgs/container/cat-prod/105131185?tag=4.5.0-c9d7598)**  |
| **[Resource API server](./IUDX%20Component%20Installation/Resource-Server.md)**       | 4.5.0-**[b1b40d7](https://github.com/datakaveri/iudx-resource-server/pkgs/container/rs-depl/104998888?tag=4.5.0-b1b40d7)**  |
| **[File server](./IUDX%20Component%20Installation/File%20Server.md)**               | 4.5.0-b52a0ac  |
| **[GIS server](./IUDX%20Component%20Installation/GIS-Server.md)**                | 4.5.0-7be5bd7  |
| **[Data Ingestion server](./IUDX%20Component%20Installation/Data-%20Ingestion%20Server.md)**     | 4.5.0-8298bde  |
| **[Advance Monitoring Stack](./IUDX%20Component%20Installation/Advance%20Monitoring%20Stack.md)**   | 4.0.0-2        |


