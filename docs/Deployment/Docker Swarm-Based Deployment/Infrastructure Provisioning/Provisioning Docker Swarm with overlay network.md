---
sidebar_position: 2
---



### Prerequisite

  Install ansible on your local machine. It can be installed in 2 ways, choose any one
  1. Ansible using pip
To install Ansible using pip, refer to doc [here](https://docs.ansible.com/ansible/2.9/installation_guide/intro_installation.html#installing-ansible-with-pip)
  2. Ansible using package manager
To install Ansible using package manager, refer to doc [here](https://docs.ansible.com/ansible/2.9/installation_guide/intro_installation.html#selecting-an-ansible-version-to-install)


### Installation

1. [Clone repo](<https://github.com/datakaveri/iudx-deployment.git>)

2. Switch branch to use the 5.0.0 release

```bash
 cd iudx-depoyment && git checkout 5.0.0 
 ```

3. Navigate to iudx-deployment/Docker-Swarm-deployment/single-node/infrastructure/ 
```bash
cd Docker-Swarm-deployment/single-node/infrastructure/ 
```

4. Copy inventory file and make appropriate modifications 

```bash
 cp example-single-node-inventory.yml inventory.yaml 
```

 Configure the inventory.yml, with appropriate node labels. If you do not want to do system updates comment them in the following file ‘files/packages-docker-install.sh’. If issues persist, remove ‘set -e’ flag
   a. For single node setup,

   1. If the execution of ansible and the docker swarm creation node are on the same node (i.e. localhost) the command to use is as shown below: 

```ansible
ansible-playbook -v  deploy-swarm.yml -i inventory.yml --ask-become-pass --connection=local 
```

2. If the execution of ansible and the docker swarm creation node are on different nodes (i.e. 2 different VMs with different IP address) the command to use is as shown below: 

```ansible
 ansible-playbook -v  deploy-swarm.yml -i inventory.yml 
```
## Check whether the system is up?<a id="check-whether-the-system-is-up"></a>

1. To check whether the system is up:

   1. Check the ansible-playbook output\
      \[Play recap] → failed=0 for all node means the installation was successful

   2. Login to manager node, execute command: 

```docker
docker node ls 
```

The output should be something similar to shown below:

| ID  |  HOSTNAME  | STATUS | AVAILABILITY |  MANAGER STATUS |  ENGINE VERSION|
|---|---|---|---|---|---|
|9x6wifgf1bfeo8z3lji3fm1xq |single-node |  Ready | Active  |   Leader  |     20.10.12 |

With this, the setup of docker-swarm in a VM/Node is successful.


## Descriptions of Playbook<a id="descriptions-of-playbook"></a>

The playbook deploy-swarm.yml does the following things:

1. Installation of docker, other packages: vim, dnsutils, net-tools iputils-ping

2. Docker swarm creation over the private network 

3. Overlay-net creation

4. Assign hostnames (for labels in grafana)

5. Assign docker node labels for placement of databroker, database, nginx, mon-stack components appropriately to the designated nodes.
