---
sidebar_position: 6
---
 
# Data Access through Async APIs
To use the Async Service, a `consumer` must request for consent from the `provider`, obtain a [token](./consumer_obtaining_access_token.md) from IUDX Auth server and then access the [Async Resource Access API](https://rs-test.iudx.io/apis#tag/Data-Subscriber).

## Obtaining Access Token
A `consumer` can obtain a token using the [Create Token APIs](https://authorization.iudx.org.in/apis#operation/post-auth-v1-token) with the following request body. Make sure that the appropriate `resource`id is used to obtain a token.

## Search using *Async API*
An [Async Search](https://rs-test.iudx.io/apis#operation/async%20search) is used by IUDX Data Consumers for querying a resource using a valid IUDX `id`, `temporal` parameters. Async APIs provide the ability to the `consumer` to query resources using larger temporal period. On accepting the request, the server will respond with a `search-id` using which the `consumer` can check the [status of the search request](https://rs-test.iudx.io/apis#operation/async%20search%20status). Once the search is completed, the `consumer` can download the file specified in the download URL.
