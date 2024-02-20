---
sidebar_position: 1
---

1. Navigate to the below directory 
   ```
   cd iudx-deployment/Docker-Swarm-deployment/single-node/infrastructure/ 
   ```

2. Install & start node-exporter. Also update targets for node-exporter and docker daemon metrics in the prometheus-node.
   ```                                                                               
   ansible-playbook -v deploy-node-exporter-docker-metrics.yaml -i inventory.yaml --connect=local
   ```
   Check the status of each node exporter
   ```anisble
   ansible nodes-with-exporter -i inventory.yaml --become -m script -a  "files/node-exporter-manager.sh -a status" --connect=local 
   ```
Refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/infrastructure)** for more details.
