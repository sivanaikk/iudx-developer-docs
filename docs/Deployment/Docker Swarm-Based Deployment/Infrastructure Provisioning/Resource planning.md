---
sidebar_position: 1
---


## Resource Planning

The resource planning for various IUDX components and the corresponding vm  is present[ here](https://docs.google.com/spreadsheets/d/1OQLVxeaQVu0W4GDeY7BMDj2kSCBcTh0oNgFFagbEKdQ/edit#gid=0) . The planned resource along with instance type values need to be added in \*.resources.yaml <a id="the-resource-planning-for-various-iudx-components-and-the-corresponding-vm-is-present-here--the-planned-resource-along-with-instance-type-values-need-to-be-added-in-resourcesyaml"></a>

**Create VMs for Docker swarm cluster:**
1. Create VMs in cloud as per resource planning.

2. Create a Firewall group with following firewall rules

   <details>

   <summary><mark>Inbound rules</mark></summary>

   1. Open port 22 for **[SSH](https://en.wikipedia.org/wiki/Secure_Shell)** (add all IPs of nodes from which you want to allow SSH)<br/>

   2. For Docker swarm (only internal private network subnet where the cluster exists)<br/>

         &nbsp;&nbsp;&nbsp;&nbsp;a. TCP port 2377 for cluster management communications<br/>

         &nbsp;&nbsp;&nbsp;&nbsp;b. TCP and UDP port 7946 for communication among nodes<br/>

         &nbsp;&nbsp;&nbsp;&nbsp;c. UDP port 4789 for overlay network traffic<br/>

   </details>

   <details>

   <summary><mark>Outbound rule</mark>  <br/></summary>

   Allow ALL. To download packages and docker images.

   </details>

2) Add following firewall inbound rule in addition to rules mentioned above:

   1. The machine where nginx will be deployed, open  TCP port 443

   2. In the machine where RMQ will be deployed, open TCP ports 28041, 24567

3) Create 2 public ips (or just 1 public ip, if all both nginx and rmq is deployed on a single machine) - one for VM containing nginx(IP1) and for VM containing rmq (IP2)  and then attach those to respective VMs. 

4) Create following DNS A records in your domain registrar  pointing to above created public IPs (IP1 and IP2)  attached to VMs

                                                                                    
| Domain ( Example placeholder) | IP   | Comments                                         |
|-------------------------------|-------|-------------------------------------------------|
| databroker.io.test            |  IP1 | To access databroker (RMQ) UI                    |
| logmanager.io.test            | IP1  | To access grafana UI                             |
| keycloak.io.test              | IP1  | To access keycloak Mgmt UI                       |
| kibana.io.test                | IP1  | To access kibana UI                              |
| cos.io.test                   | IP1  | cat, auth server,onboarding  public api endpoint |
| acl-apd.io.test               | IP1  | ACL APD                                          |
| di.io.test                    | IP1  | Data ingestion server                            |
| file.io.test                  | IP1  | File server                                      |
| rs.io.test                    | IP1  | Resource server                                  |
| rs-proxy.io.test              | IP1  | RS proxy server                                  |
| gis.io.test                   | IP1  | GIS server                                       |

