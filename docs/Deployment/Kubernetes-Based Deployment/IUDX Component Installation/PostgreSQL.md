---
sidebar_position: 4
---

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/postgress-arch.png)
</div></div>

- PostgreSQL is being used as a credentials and policy data store.
- Pgpool proxy is used as a middleware that works between psql servers and db clients for managing the connections.
- Deploys a clustered postgreSQL having 3 instances. 1 master 2 replicas. (Master for read-write and replicas for    read-only). Also deploy 2 instances of pgpool proxy with horizontal pod autoscaling.
- Will be deployed using a bitnami helm chart.


### Installation

1. Navigate to the directory:

    ```
    cd iudx-deployment/K8s-deployment/Charts/postgresql
    ```

2. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

3. Run the create-secrets script to automatically generate safe random passwords for all psql users using the following command:

    ```
    ./create-secrets.sh
    ```

    **Secrets are generated in the secrets/passwords directory for all users.**

4. Define appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for **[aws](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/postgresql/example-aws-resource-values.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/postgresql/example-azure-resource-values.yaml)**.

    + CPU requests and limits
    + RAM requests and limits
    + Instance-type for nodeSelector
    + StorageClassName
    + Size of the persistent volume required 
    + connections related settings

6. Before install, make sure sufficient worker nodes  with enough free resources are present to deploy the 5 pods. The install script assumes the whole postgres installation is possible in 150s.

7. To install postgresql on the k8s cluster, run the install script using the following command::

    ```
    ./install.sh
    ```
    - Creates namespace postgres in K8s.
    - Creates the required secrets on K8s from the generated passwords.
    - Creates required configmaps
    - Initialise asynchronous postgres replication cluster with initdb scripts
    - Delete and install  cluster with synchronous replication
    - Deploys the helm chart with the release name ‘psql’.


6. Install postgres client on rancher/bootstrap machine 

    1. Updates packages and install prerequisite packages

        ```
        sudo apt-get update -y  && sudo apt install gnupg gnupg2 gnupg1 -y
        ```

    2. The latest version of PostgreSQL is not included in the Ubuntu default repository, so you will need to add the PostgreSQL official repository to the APT.

        ```
        sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
        ```
    3. Next, download and add the PostgreSQL GPG key using the following command:

        ```
        wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
        ```
    4. Update repository and instal psql 14 client: 

        ```
        sudo apt-get update -y && sudo apt install postgresql-client-14 -y
        ```

- To check helm release info: ‘helm list -n postgres’
- To check if the psql pods are deployed and running: ‘kubectl get pods -n postgres’
- For more information on installation instructions, refer here.


<details>
<summary><div class="style">Testing</div></summary>

1. Test if init-setup needed for IUDX is done

    1. Port forward the pgpool (postgres proxy) on one terminal:

        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```

    2. In another terminal, login to postgres :

        ```
        PGPASSWORD=`kubectl get secrets -n postgres psql-passwords -o jsonpath='{.data.postgresql-password}' | base64 -d` psql -U postgres -h localhost
        ```
    3. Test if postgres cluster is formed properly , two nodes must be in quorum
        
        ```
        select * from pg_stat_replication;
        ```
    4. Test if required dbs (iudx_rs, iudx_keycloak, postgres) and users (postgres, iudx_keycloak_user, iudx_rs_user, iudx_auth_user) exists

        1. List the number of database: 
             ```
            # to list the number of database
            \l
            ```

        <div style={{textAlign: 'center'}}>

        ![Architecture](../../../../resources/auth/ls.png)<br/>
        
        </div>

        2. List the number of users:

            ```
            # to list the number of users
            \du
            ```

        <div style={{textAlign: 'center'}}>

        ![Architecture](../../../../resources/auth/user_ls.png)<br/>
        
        </div>

</details>