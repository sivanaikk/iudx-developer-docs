---
sidebar_position: 5
---
 
 
# Data Access through Subscription
To register subscription, a user must request for consent from the `provider`, obtain a [token](./consumer_obtaining_access_token.md) from IUDX Auth server and then access the [Subscription API](https://rs-test.iudx.io/apis#tag/Data-Subscriber).

### Obtaining token to *Subscribe* a resource
A `consumer` can obtain a token using the [Create Token APIs](https://authorization.iudx.org.in/apis#operation/post-auth-v1-token) with the following request body. Make sure that the appropriate `resource` (or) `resource_group` id is used to obtain a token.

*Example For a subscription at a resource level*

```json
{
  "itemId": "datakaveri.org/04a15c9960ffda227e9546f3f46e629e1fe4132b/rs.iudx.org.in/pune-env-aqm/184ba502-22a8-ad15-a8f1-c966cd3aa7a7",
  "itemType": "resource",
  "role": "consumer"
}
```

*Example For a subscription at a resource group level*

```json
{
  "itemId": "datakaveri.org/04a15c9960ffda227e9546f3f46e629e1fe4132b/rs.iudx.org.in/pune-env-aqm",
  "itemType": "resource_group",
  "role": "consumer"
}
```

It is to be noted that unless an explicit `policy` for subscription is specified by the `Provider` in the `IUDX Authorisation Server` a  `consumer` will not obtain any access token.

 
### Creating a new subscription
A consumer can use the [Subscription APIs](https://rs-test.iudx.io/apis#operation/createastreamingsubscription) to register a new subscription. On registration, information about the streaming server which includes `URL`, `port`, `vHost` along with `subscription-id`, `username` and `apiKey` will be shared. Using the above information a consumer can connect to the streaming server to get the requested data as a `stream`.

```python
import pika
import urllib.parse

username = '15c7506f-c800-48d6-adeb-0542b03947c6' #change this to your user name
password = 'u-Tdy3g_ToeQikHfnovjMA' #change this to your password.
host = 'localhost'
port = 49153
vhost = 'IUDX'
queue_name = '15c7506f-c800-48d6-adeb-0542b03947c6/itms-application' #change this to your queue-name (id)
encoded_username = urllib.parse.quote_plus(username)

connection = pika.BlockingConnection(
	pika.URLParameters(f'amqp://{encoded_username}:{password}@{host}:{port}/{vhost}'))

channel = connection.channel()

print(' [*] Waiting for data. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] %r" % body)

channel.basic_consume(
    queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()

```

### Obtaining token to refresh an existing *Subscription* of a resource
A `consumer` can obtain a token to refresh an existing subscription using the same approach as mention in Obtaining token to *Subscribe* a resource. 

### Refreshing a subscription
In order to keep the subscription open and live, `consumer` should call the [Refresh Subscription API](https://rs-test.iudx.io/apis#operation/updatestreamingsubscription) every 12 hours until policy expiry. On failure to do so, the access to subscription will be revoked. A `consumer` should then use the [Append Subscription API](https://rs-test.iudx.io/apis#operation/appendstreamingsubscription) to restart the subscription.

### Adding a new resource to an existing subscription
A `consumer` can use the [Append Subscription API](https://rs-test.iudx.io/apis#operation/appendstreamingsubscription) to add new resources to an existing subscription. This will make the consumer to receive more than one resource in the same stream. 

Note: A `resource` can be differentiated using the `id` available in the data packet. 

### Deleting a subscription
A `consumer` can use the [Delete Subscription API](https://rs-test.iudx.io/apis#operation/deleteasubscription) to delete a subscription. This will delete the subscription queue and all existing resources streamed through the queue will be inaccessible.

### Reset Streaming User Password
A `consumer` can reset the password given to them by the `streaming server` using the [Reset Streaming Password API](https://rs-test.iudx.io/apis#operation/resetPassword). This change will reset all active connections and a `consumer` should restart their `client applications` accordingly.
