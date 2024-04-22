---
sidebar_position: 2
---





### Prerequisite

Install ansible on your local machine. There are two possible ways,<br/>
1. **[Ansible using pip](https://docs.ansible.com/ansible/2.9/installation_guide/intro_installation.html#installing-ansible-with-pip)**<br/>
2. **[Ansible using package manager](https://docs.ansible.com/ansible/2.9/installation_guide/intro_installation.html#selecting-an-ansible-version-to-install)**


### Installation:

1. Click **[here](<https://github.com/datakaveri/iudx-deployment.git>)** to clone the repository 

2. Switch branch to use the 5.0.0 release

    ```
    cd iudx-deployment && git checkout 5.0.0 

    ```

    

3. Navigate to the below directory:

    ```
    cd Docker-Swarm-deployment/single-node/infrastructure/ 
    ```

4. Copy inventory file and make appropriate modifications 
  
    ```
    cp example-single-node-inventory.yaml inventory.yaml 
    ```

:::note
**Configure the `inventory.yml` with appropriate node labels. If you do not want to do system updates, comment them in the following file `files/packages-docker-install.sh` . If issues persist, remove `set -e` flag. You can learn more about values in inline comments of `inventory.yaml`**
:::

5. For single node setup,

   1. If the execution of ansible and the docker swarm creation node are on the same node  **   (i.e. localhost)** the command to use is as shown below: 

      ```ansible
      ansible-playbook -v deploy-swarm.yaml -i inventory.yaml --ask-become-pass --connection=local
      ```

   2. If the execution of ansible and the docker swarm creation node are on different nodes **(i.e. 2 different VMs with different IP address)** the command to use is as shown below: 

      ```ansible
      ansible-playbook -v deploy-swarm.yaml -i inventory.yaml 
      ```



## Description of the Playbook

The playbook **[deploy-swarm.yml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/infrastructure/deploy-swarm.yaml)** does the following things:

1. Installation of docker and other packages viz., **vim, dnsutils, net-tools and iputils-ping**

2. Docker swarm creation over the private network 

3. Overlay-net creation

4. Assigning hostnames 

5. Assigning docker node labels for placement of databroker, database, nginx, mon-stack components appropriately to the designated nodes.

<details>
<summary><div class="test_color">Test the docker swarm setup</div></summary>

## Check whether the system is up?

- Login to manager node, execute the below command to check the status of nodes: 

   ```docker
   docker node ls 
   ```

  The output should be something similar to shown below:

   | ID  |  HOSTNAME  | STATUS | AVAILABILITY |  MANAGER STATUS |  ENGINE VERSION|
   |---|---|---|---|---|---|
   |9x6wifgf1bfeo8z3lji3fm1xq |single-node |  Ready | Active  |   Leader  |     20.10.12 |

   With this, the setup of docker-swarm in a VM/Node is successful.<br/>


## check the connectivity between containers on different nodes of docker swarm cluster

   - Bring up two busybox containers on two different vm’s attached to the overlay network.

   1. On first node

   1. Run busybox container

      ```
      docker run -itd --name busybox-1 --network overlay-net busybox sh 
      ``` 

   Get container IP address
     ```
     docker inspect busybox-1 
     ```
   Make a note of IPAddress under **NetworkSettings.Network.overlay-net**

   2. On second node:

      1. Run busybox container

          ```
          docker run -it –name busybox-1 –network overlay-net busybox sh 
          ```
4. Ping the first busybox container
```
ping < IPAddress-of-busybox-1 > 
```
If the pings are successful, Docker swarm and overlay network are correctly configured and working.
</details>

