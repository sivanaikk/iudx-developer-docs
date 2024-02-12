---
sidebar_position: 2
---
 
# Manage Policies
A provider can create, view and delete access policies set for consumers and delegates in the Consumers tab.

![View policies set for consumers](../../resources/auth/view-pols.png)<br/>
*View policies set for consumers*
 
A policy can be set for a consumer for a particular resource group/dataset with a restriction to access type. 

- **API Access** allows the consumer to call the Resource Server APIs (latest, temporal, attribute, complex etc.) on the resource group. 
- **Subscription Access** allows the consumer to subscribe to the resource via RabbitMQ.
- **File Access** allows the consumer to download the data in file form in case it is a file resource.

**The policy can only be created if the consumer exists and if the resource group/dataset exists on the IUDX Catalogue**. An expiry time for the policy can also be set. Once a policy expires, a consumer may not be able to request for tokens for the particular resource.

![Create policy](../../resources/auth/create-policy.png)<br/>
*Create policy*
