---
sidebar_position: 3
---

- RabbitMQ is utilized as a databroker in the IUDX system.
- It facilitates the exchange of data between consumers and publishers using the AMQP streaming protocol.
- Deployment will be handled through stack YAML files.


### Prerequisite

1. Generate Certificates for the Databroker Domain

2. Generating Let's Encrypt Wildcard Certificates

    1. Install the required Let's Encrypt on Ubuntu VM. Please refer to the **[official instructions](https://letsencrypt.org/getting-started/)** up to step 6.

    2. Needed 2 wildcard domains, similar to the example:
       1. `*.iudx.io` (for the rest of the server)**
       2. `*.catalogue.iudx.io` (for the catalogue server)**

    3. Generate wildcard certificates through DNS verification:
        ```
        sudo certbot certonly --manual --preferred-challenges dns -d <wildcard(*)**-qualified-domain-name
        ```
    4. Add the email-address to notify expiry

    5. Add the TXT record needed for DNS verification of certificate in the dns provider

    6. After successful verification the certificate is generated and a message is given on location of the letsencrypt certificate


### Installation

1. Navigate to the below directory: 
    ```
    sudo certbot certonly --manual --preferred-challenges dns -d <wildcard(*)**-qualified-domain-name
    ```
   
2. Assign the node label if not assigned during swarm installation using: 
    ``` 
    docker node update --label-add databroker_node=true <node_name
    ```

3. Make a copy of sample secrets directory by running the following command:
    ```
    cp -r example-secrets/secrets .
    ```

4. Generate secrets
    ```
    ./create-secrets.sh
    ```

5. Copy certificate files to secrets directory as shown below:
    ```
    cp /etc/letsencrypt/live/<domain-name/chain.pem  secrets/pki/rabbitmq-ca-cert.pem

    cp /etc/letsencrypt/live/<domain-name/fullchain.pem  secrets/pki/rabbitmq-server-cert.pem

    cp /etc/letsencrypt/live/<domain-name/privkey.pem secrets/pki/rabbitmq-server-key.pem
    ```

6. If required,> edit the config - secrets/init-config.json to suit the needs for users, exchanges, queues, bindings and policies.
Folder structure for RabbitMQ secrets is as follows

7. Folder structure for RabbitMQ secrets is as follows
   ```
    secrets/
    ├── init-config.json
    ├── passwords
    │   ├── admin-password
    │   ├── cat-password
    │   ├── di-password
    │   ├── fs-password
    │   ├── gis-password
    │   ├── lip-password
    │   ├── logstash-password
    │   ├── profanity-cat-password
    │   └── rs-password
    └── pki
        ├── rabbitmq-ca-cert.pem
        ├── rabbitmq-server-cert.pem
        └── rabbitmq-server-key.pem
        └── rabbitmq-server-key.pem
   ```

8. Define Appropriate values of resources -
    - CPU
    - RAM
    - PID limit 
  in databroker-stack.resources.yaml for as shown in sample resource-values file **[example-databroker-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/Docker-Swarm-deployment/single-node/databroker/example-databroker-stack.resources.yaml)**

9. We can deploy RabbitMQ using the following command 
    ```
    cp example-databroker-stack.resources.yaml databroker-stack.resources.yaml 
    docker stack deploy -c databroker-stack.yaml -c databroker-stack.resources.yaml  databroker
    ```
   Expect the following output on successful deployment
    ```
    Creating secret databroker_backup-ssh-pubkey
    Creating secret databroker_rabbitmq-admin-passwd
    Creating secret databroker_rabbitmq-ca-cert.pem
    Creating secret databroker_rabbitmq-server-cert.pem
    Creating secret databroker_rabbitmq-server-key.pem
    Creating secret databroker_rabbitmq-definitions.json
    Creating secret databroker_backup-ssh-privkey
    Creating config databroker_rabbitmq-config
    Creating service databroker_backup
    Creating service databroker_rabbitmq
    ```

10. In order to verify the installation, use the following commands
    
     ```
     docker stack ls

     NAME     	SERVICES   ORCHESTRATOR
     databroker   2      	Swarm
     ```

    Use this command to display information about the services in the 'databroker' stack:

        
    | ID            | NAME                    | IMAGE                         | NODE         | DESIRED STATE | CURRENT STATE          | ERROR | PORTS                                                  |
    |---------------|-------------------------|-------------------------------|--------------|---------------|------------------------|-------|--------------------------------------------------------|
    | 5zq8uo4bk8vi  | databroker_rabbitmq.1  | rabbitmq:3.8.11-management    | single-node  | Running       | Running 4 minutes ago  |       | *:24567-5671/tcp,*:24567-5671/tcp,*:28042-15672/tcp,*:28042-15672/tcp,*:28041-15671/tcp,*:28041-15671/tcp,*:24568-5672/tcp,*:24568-5672/tcp |

   RabbitMQ UI can be accessed from **https://< rabbitmq-domain :28041/**
   <div style={{textAlign: 'center'}}>

  ![Architecture](../../../../resources/auth/rabbitmQ.png)

   </div>
11. Bring up the account generator stack (clean deployment or whenever any change in init-config)** for RMQ vhosts, users, exchanges, queues, policies creation
     ```
     docker stack deploy -c rmq-init-setup.yaml  rmq-tmp
     ```

12. Monitor logs to ensure creation of vhosts, users, queues
     ```
     docker service logs rmq-tmp_rmq-init-setup -f
     ```
 
13. Remove stack, once vhosts, users, exchanges, queues, policies are created
     ```
     docker stack rm rmq-tmp
     ```

### Manual Configuration from RMQ Management UI

This is an alternative to steps 10 and 11 of the installation. Steps 10 and 11 automate the configuration through the init-setup job.

1. Configure admin user

    1. Log in to RMQ with default credentials: 
        1. **Username:** admin
        2. **Password:** admin

    2. Navigate to `Admin-Users - admin - Change Password`.

    3. Download the definitions file and replace the file at `secrets/rabbitmq-definitions.json`.

    4. Set the password you chose above in `secrets/rabbitmq-admin-passwd`.

2. Log in to the RMQ UI at **https://< RMQ-domain-name :28041 /** as the admin user.

3. Configure appropriate vhosts, exchanges, queues, and bindings from the UI as given in the table below.

    1. **Create vHosts**: Go to `Admin - Virtual Hosts` and add a virtual host at the bottom by entering the name. Following vhosts need to be added:

    | VHost           |
    |-----------------|
    | IUDX-INTERNAL   |
    | IUDEX-INTERNAL  |

    <br/>

    2. **Create Exchanges**: Go to `Exchanges` - Add a new Exchange by entering the name, select the appropriate vHost, type, rest all defaults. Following exchanges need to be created:

    | VHost           | Exchange Name                     | Type of Exchange                |
    |-----------------|----------------------------------|---------------------------------|
    | IUDX-INTERNAL   | invalid-sub                      | topic                           |
    | IUDX-INTERNAL   | latest-data-unique-attributes     | topic                           |
    | IUDEX-INTERNAL  | processed-messages               | topic                           |
    | IUDEX-INTERNAL  | catalogue-rating                  | topic                           |

    <br/>

    3. **Create Queues**: Go to `Queues` - Add a queue by entering the name, select the appropriate vHost, rest all defaults. Following queues need to be created:

    | VHost           | Queue Name                    |
    |-----------------|-------------------------------|
    | IUDX-INTERNAL   | lip-invalid-sub               |
    | IUDX-INTERNAL   | lip-processed-messages        |
    | IUDX-INTERNAL   | lip-unique-attributes         |
    | IUDX-INTERNAL   | rs-invalid-sub                |
    | IUDX-INTERNAL   | rs-unique-attributes           |
    | IUDX            | database                      |
    | IUDX            | redis-latest                  |
    | IUDX-INTERNAL   | catalogue-rating              |
    | IUDX-INTERNAL   | rs-async-query                 |
    | IUDX-INTERNAL   | auditing-messages              |
    | IUDX-INTERNAL   | fs-invalid-sub                 |
    | IUDX-INTERNAL   | gis-invalid-sub                |
    
    <br/>
    
    4. **Create Exchange-Queue bindings**: Go to a particular vHost - particular exchange - Bindings - enter queue name to bind to, add routing key - bind. Following exchange-queue bindings need to be created:  

    | VHost           | Exchange Name                  | Queue                      | Routing Key | 
    |-----------------|---------------------------------|-----------------------------|--------------|
    | IUDX-INTERNAL   | invalid-sub                    | lip-invalid-sub             | #            |
    | IUDX-INTERNAL   | invalid-sub                    | rs-invalid-sub              | #            |
    | IUDX-INTERNAL   | invalid-sub                    | gis-invalid-sub             | #            |
    | IUDX-INTERNAL   | invalid-sub                    | fs-invalid-sub              | #            |
    | IUDX-INTERNAL   | latest-data-unique-attributes   | lip-unique-attributes       | #            |
    | IUDX-INTERNAL   | latest-data-unique-attributes   | rs-unique-attributes        | #            |
    | IUDEX-INTERNAL  | processed-messages              | lip-processed-messages       | #            |
    | IUDEX-INTERNAL  | catalogue-rating               | catalogue-rating            | #            |
    | IUDEX-INTERNAL  | async-query                     | rs-async-query               | #            |
    | IUDEX-INTERNAL  | auditing                        | auditing-messages            | #            |
    
    <br/>

    5. **Create Policies**: Go to `Admin - Policies` (right-hand side)** - Add policy - Select VHOST, add Name, pattern to match queues, apply to queues, Set priority, set definition. Following policies need to be created:

    | VHost           | Name                         | Pattern                      | Definition                         | Priority |
    |-----------------|------------------------------|------------------------------|------------------------------------|----------|
    | IUDX-INTERNAL   | internal-lip-queue           | lip.*                        | max-length-bytes: 2097152           | 0        |
    | IUDX-INTERNAL   | internal-fs-queue            | fs.*                         |                                    | 0        |
    | IUDX-INTERNAL   | internal-gis-queue           | gis.*                        |                                    | 0        |
    | IUDX-INTERNAL   | internal-cat-queue           | catalogue.*                  |                                    | 0        |
    | IUDX-INTERNAL   | auditing-queue                | auditing-messages            |                                    | 0        |
    | IUDX-INTERNAL   | internal-rs-queue            | rs.*                         |                                    | 0        |
    | IUDX            | redis-queue                   | redis.*                      | max-length-bytes: 10485760          | 0        |
    | IUDX            | database                      | database                     |                                    | 0        |


### Tests

1. Navigate to the **[iudx-deployment/K8s-deployment/Charts/databroker/tests](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/databroker/tests)** directory.

2. Test the publishing of messages to exchange and routing to queue through a Python script.

    1. Create a Python virtual environment on the Rancher/Bootstrap machine:

        ```
        # Create venv env
        python3 -m venv /home/iudx/.venv/iudx-tests

        # go into venv
        source /home/iudx/.venv/iudx-tests/bin/activate
        ```

    2. Install all necessary packages from the `requirements.txt` file:

        ```
        pip install -r requirements.txt
        ```

    3. Configure test exchanges as follows:

    | VHost | Exchange Name | Type of Exchange |
    |-------|---------------|-------------------|
    | IUDX  | test-itms      | topic             |

    <br/>

    4. Configure the exchange-queue binding as follows:

    | VHost | Exchange | Queue    | Routing Key |
    |-------|----------|----------|-------------|
    | IUDX  | test-itms | database | key         |
    | IUDX  | test-itms | redis-latest | key     |

    <br/>

    5. Configure the following parameters in the Python script (you can use admin user and password)**:

        ```
        username = ""
        password = ""
        host = ""
        # Public AMQPS port
        port = 24567
        ```

    6. Run the Python script:

        ```
        python3 rabbitmq.py
        ```

    7. Test if the messages have reached the database and redis-latest queue. Log in to the RMQ management interface at **https://< rmq-domain-name :28041/ - goto - queues**
    .

 Refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/databroker/tests)** for more detailed information.