---
sidebar_position: 3
---



<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/rabbitMQ-arch.png)
</div>

- RabbitMQ is utilized as a databroker in the IUDX system.
- It facilitates the exchange of data between consumers and publishers using the AMQP streaming protocol.
- Will be deploying using swarm stack yaml files

### Prerequisite

Let's Encrypt Certificate Generation for DNS Verification:

:::note
**To generate TLS certificates using Let's Encrypt, you'll need DNS provider credentials of the domain to add a TXT record for DNS verification.**
:::note

Follow the steps below:

  1. Install required Certbot on an Ubuntu VM, preferably the bootstrap machine from which the Kubernetes workload is deployed. Refer to the instructions **[here](https://certbot.eff.org/instructions?ws=other&os=ubuntufocal)** up to step 6.

  2. Run the following command to generate a certificate for RabbitMQ through DNS verification:
    
    ```
    sudo certbot certonly --manual --preferred-challenges dns -d <rabbitmq-fully-qualified-domain-name>
    ```

  3. Add an email address for expiry notification during the certificate generation process.

  4. Follow the instructions provided by Certbot to add the TXT record needed for DNS verification of the certificate in your DNS provider. This typically involves adding a specific TXT record with a verification key provided by Certbot.

  5. Wait until the TXT record is reflected in your DNS provider's system. You can use online DNS verification tools to verify the TXT record. Ensure that the TTL and value match the ones you specified while creating the TXT record.

  6. Once the TXT record is verified, press Enter to continue the DNS verification process by Let's Encrypt.

  7. After successful verification, Let's Encrypt will generate the certificate. The location of the Let's Encrypt certificate will be provided in the output message.

- **[Azure App Certificate](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate?tabs=apex%2Cportal)** Serv
- **[AWS Certificate](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate?tabs=apex%2Cportal)** Service

### Installation

1. Navigate to the below directory: 
    ```
    cd iudx-deployment/K8s-deployment/Charts/databroker
    ```
   
2. Make a copy of sample secrets directory and add appropriate values to all files: 
    ``` 
    cp -r example-secrets/secrets .
    ```

3. Generate secrets
    ```
    ./create-secrets.sh
    ```
4. If required, edit the config `secrets/init-config.json` to suit the needs for users, exchanges, queues, bindings, and policies. Define the following config:

5. Folder structure for RabbitMQ secrets is as follows
   ```
        secrets/
    ├── credentials
    │   ├── admin-password
    │   ├── auditing-password
    │   ├── cat-password
    │   ├── di-password
    │   ├── fs-password
    │   ├── gis-password
    │   ├── lip-password
    │   ├── logstash-password
    │   ├── profanity-cat-password
    │   ├── rabbitmq-erlang-cookie
    │   ├── rs-password
    │   ├── rs-proxy-adapter-password
    │   └── rs-proxy-password
    ├── init-config.json
    └── pki
        ├── ca.crt
        ├── tls.crt
        └── tls.key
   ```

6. Generating secrets and certificates.
   - Copy certificates generated from previous step to folder secrets/pki 

     ```
     cp /etc/letsencrypt/live/<domain-name>/chain.pem  secrets/pki/ca.crt

     cp /etc/letsencrypt/live/<domain-name>/fullchain.pem  secrets/pki/tls.crt

     cp /etc/letsencrypt/live/<domain-name>/privkey.pem secrets/pki/tls.key

    ```
7. copy the example resource values YAML file to resource-values.yaml.
    
    ```
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

8. Define Appropriate values of resources in `resource-values.yaml` for as shown in sample resource-values file for **[aws](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/databroker/example-aws-resource-values.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/databroker/example-azure-resource-values.yaml)**.

    + CPU requests and limits
    + RAM requests and limits

9. Define Appropriate values of loadbalancer configuration -
  	- Loadbalancer annotations

    :::note
    **Don’t replace “loadBalancerIP” placeholder.**
    :::
    in `external-client-service.yaml` as shown in sample service files to **[aws](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/databroker/external-client-aws-service.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/databroker/external-client-azure-service.yaml)**.

10. To install the `rabbitmq` chart:
    ```
    ./install.sh
    ```
11. The command deploys RabbitMQ on the Kubernetes cluster in a 3 node configuration. The Parameters section lists the parameters that can be configured during installation. The script will:

- Create a namespace **rabbitmq**
- Create required secrets
- Deploy RabbitMQ statefulset and services
- Deploy an init job which creates users, vhosts, users, exchanges, queues, and bindings  
   
  :::note
  **Pods will take some time to come up to boot completely and also probe delays also add up some delay.**
  :::


12. Check if RMQ pods are ready and check logs of an init-setup job which creates required vhosts, users, exchanges, queues and bindings.
    ```
    # check if RMQ is in ready state
    kubectl get pods -n rabbitmq
    # check the logs of init-setup
    kubectl logs -f -n rabbitmq <rmq-init-setup-job-name>
    ```


 - RabbitMQ UI can be accessed from **https://< rmq-hostname >:< external-client-https-port >**
   <div style={{textAlign: 'center'}}>

  ![Architecture](../../../../resources/auth/rabbitmQ.png)

   </div>

- Change the admin password of RMQ to logstash rabbitmq internal password
- To check if the rabbitmq pods are deployed and running:
    ```
    kubectl get pods -n rabbitmq
    ```
- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/databroker#rabbitmq-cluster-in-k8s-as-a-statefulset)**.

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


### Testing

1. Navigate to the below directory :
    ```
    cd iudx-deployment/K8s-deployment/Charts/databroker/tests
    ```
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

    5. Configure the following parameters in the Python script **(you can use admin user and password)**:

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

 Refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/databroker/tests)** for more detailed information.