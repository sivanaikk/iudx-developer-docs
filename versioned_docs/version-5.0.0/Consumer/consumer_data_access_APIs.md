---
sidebar_position: 4
---
 
 
# Data Access through APIs
After [discovering](./consumer_data_discovery.md) resources and obtaining appropriate [access tokens](./consumer_obtaining_access_token.md), a consumer can use the [Resource Access APIs](https://rs.iudx.org.in/apis) to query a resource using `temporal`, `spatial` and `attribute` queries. It is to be noted that all the APIs are accessible only through a valid resource `id` and an appropriate `Open` or `Secure` access `token`. 

## Get Latest Data
The [Latest Data API](https://rs-test.iudx.io/apis#tag/Latest-Entity) is used to get the latest (last published) data of a `resource`. It uses the IUDX ID a.k.a `id` in the `/entities` endpoint as a `path` parameter to query the resource server. To get data a valid IUDX Auth token is mandatory.

## Temporal Search
A [Temporal Search](https://rs-test.iudx.io/apis#operation/temporal-entities) is used by IUDX Data Consumers for querying a resource using a valid IUDX `id`, `temporal`, `spatial` and `attribute` parameters. In order to use this API, a `temporal` parameter is `mandatory`.
You can use this API to make a `temporal` or `complex : temporal+spatial` or `complex : temporal+attribute` or `complex : temporal+spatial+attribute` query.

If you are looking for an `attribute` *only* query refer the `Spatial Search`.

## Spatial Search
A [Spatial Search](https://rs-test.iudx.io/apis#tag/Spatial-Entities) is used by IUDX Data Consumers for querying a resource using a valid IUDX `id`, `spatial` and `attribute` parameters. You can use this API to make a `spatial` or `attribute` or `complex : spatial+attribute` query.

## Complex Search (Post Query)
A Complex Search [(Post Query)](https://rs-test.iudx.io/apis#tag/Entities-Post-Query) is an HTTP POST API and is used by IUDX Data Consumers. For queries which are long for which the HTTP header wont fit, a Post query can be used. This API is used for querying a resource using a valid IUDX `id`, `temporal`, `spatial` and `attribute` parameters. You can use this API to make a `temporal` or `spatial` or `attribute` or `complex : temporal+spatial` or `complex : temporal+attribute` or `complex : spatial+attribute` or `complex : temporal+spatial+attribute` query.


