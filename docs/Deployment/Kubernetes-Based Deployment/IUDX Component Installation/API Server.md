---
sidebar_position: 8
---

Below is the general instructions for deploying all the below api servers:

 1. For each api servers, following services are connected internally over overlay network using below service names 

| Service Description    | Service DNS Name          | Port |
|------------------------|---------------------------|------|
| Elasticsearch          | tasks.elasticsearch       | 9200 |
| AMQP/Databroker Port   | tasks.rabbitmq            | 5672 |
| Databroker HTTP Port    | tasks.rabbitmq            | 15672|
| Redis                  | tasks.redis-rejson        | 6379 |
| Postgres               | tasks.postgres             | 5432 |
| Immudb                 | tasks.immudb               | 5432 |
| Zookeeper              | tasks.zookeeper            | NA   |

### Disclaimer

If the credentials in the JSON config file contain the following special characters, add escape characters ('\'):

   - **Backspace** to be replaced with `\b`
   - **Form feed** to be replaced with `\f`
   - **Newline** to be replaced with `\n`
   - **Carriage return** to be replaced with `\r`
   - **Tab** to be replaced with `\t`
   - **Double quote** to be replaced with `\`
   - **Backslash** to be replaced with `\\`


  Click **[here](https://www.tutorialspoint.com/json_simple/json_simple_escape_characters.htm)** for the reference


The AAA server and Catalogue server must be HTTPS secured with proper valid certificates  on its public domain access .  This is because all other api servers connect to get some information and webclient of those servers might fail if not .
