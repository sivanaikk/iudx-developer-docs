---
sidebar_position: 7
---
 
# Data Access through File Server
After [discovering](./consumer_data_discovery.md) resources and obtaining appropriate [access tokens](./consumer_obtaining_access_token.md), a consumer can use the [File Access APIs](https://file.iudx.org.in/apis) to query a resource using `temporal`, `spatial` and `attribute` queries. It is to be noted that all the APIs are accessible only through a valid resource `id` and an appropriate `Open` or `Secure` access `token`. 

## List, Search and download files
A `consumer` can access the list of all the files available for a resource using the [list all files API](https://file.iudx.org.in/apis#operation/list-metadata). File server also provides a [Temporal API](https://file.iudx.org.in/apis#operation/search-file) which one can use to query and get the list of files between a time range. The [Temporal API](https://file.iudx.org.in/apis#operation/search-file) can also be used to perform a complex query using spatial parameters.

On obtaining the fileId, the `consumer` can use the [Download API](https://file.iudx.org.in/apis#operation/download-file) to download the file from the file server. 
