---
sidebar_position: 8
---

Before deploying each API server, ensure the following services are connected internally over the cluster’s private network using the provided service names:

| Service Description     | Service DNS Name                                     | Port |
|-------------------------|------------------------------------------------------|------|
| Elasticsearch           | elasticsearch-mcd-hl.elastic.svc.cluster.local       | 9200 |
| AMQP/Databroker Port    | rabbitmq.rabbitmq.svc.cluster.local                  | 5672 |
| Databroker HTTP Port    | rabbitmq-internal-client.rabbitmq.svc.cluster.local  | 15672|
| Redis                   | redis-redis-cluster.redis.svc.cluster.local          | 6379 |
| Postgres                | psql-postgresql-ha-pgpool.postgres.svc.cluster.local| 5432 |
| Immudb                  | immudb.immudb.svc.cluster.local                     | 5432 |
| Zookeeper               | zookeeper.zookeeper.svc.cluster.local                | NA   |

### Disclaimer

- Ensure to add escape characters (`\`) if the credentials have special characters in the JSON config file:
  - Backspace should be replaced with `\b`.
  - Form feed should be replaced with `\f`.
  - Newline should be replaced with `\n`.
  - Carriage return should be replaced with `\r`.
  - Tab should be replaced with `\t`.
  - Double quote should be replaced with `\"`.
  - Backslash should be replaced with `\\`.
  - Reference: **[JSON Escape Characters](https://www.tutorialspoint.com/json_simple/json_simple_escape_characters.htm)**

- The AAA server and Catalogue server must be HTTPS secured with proper valid certificates on their public domain access. This is essential as other API servers connect to them for information, and the web client of those servers might fail if not.


