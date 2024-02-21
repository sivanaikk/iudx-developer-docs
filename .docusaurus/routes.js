
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog','520'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post','6c7'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post','f06'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post','bee'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','e13'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus','ddf'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook','ede'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello','4c2'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola','752'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome','bfa'),
    exact: true
  },
  {
    path: '/new-page',
    component: ComponentCreator('/new-page','02b'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search','f46'),
    exact: true
  },
  {
    path: '/docs/5.0.0',
    component: ComponentCreator('/docs/5.0.0','9ba'),
    routes: [
      {
        path: '/docs/5.0.0/client-credentials',
        component: ComponentCreator('/docs/5.0.0/client-credentials','1f1'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer','b35'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_data_access_APIs',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_data_access_APIs','70a'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_data_access_async',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_data_access_async','895'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_data_access_file_server',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_data_access_file_server','82f'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_data_access_subscription',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_data_access_subscription','858'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_data_discovery',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_data_discovery','53d'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Consumer/consumer_obtaining_access_token',
        component: ComponentCreator('/docs/5.0.0/Consumer/consumer_obtaining_access_token','4bc'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Delegate/delegate',
        component: ComponentCreator('/docs/5.0.0/Delegate/delegate','ef1'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Delegate/delegate_manage_policy',
        component: ComponentCreator('/docs/5.0.0/Delegate/delegate_manage_policy','c2a'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Delegate/delegate_register_catalogue_item',
        component: ComponentCreator('/docs/5.0.0/Delegate/delegate_register_catalogue_item','04d'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Delegate/delegate_register_resource_server',
        component: ComponentCreator('/docs/5.0.0/Delegate/delegate_register_resource_server','627'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/Deployment Overview',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/Deployment Overview','114'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/Introduction',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/Introduction','4a9'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/AAA Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/AAA Server','081'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ACL-APD',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ACL-APD','6e3'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Advance Monitoring Stack',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Advance Monitoring Stack','1ad'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/API Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/API Server','129'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server','130'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Catalogue-Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Catalogue-Server','27c'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Data- Ingestion Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Data- Ingestion Server','f26'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ELK stack',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ELK stack','baf'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/File Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/File Server','fda'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/GIS-Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/GIS-Server','269'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Immudb',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Immudb','a01'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Initiating the Deployment',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Initiating the Deployment','6e8'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Keycloak',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Keycloak','73d'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Latest-Ingestion-Pipeline',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Latest-Ingestion-Pipeline','81b'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/PostgreSQL',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/PostgreSQL','7ac'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/RabbitMQ',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/RabbitMQ','a86'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Redis',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Redis','54e'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Resource-Server',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Resource-Server','ab6'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Zookeeper',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Zookeeper','579'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/prerequisites',
        component: ComponentCreator('/docs/5.0.0/Deployment/Docker Swarm-Based Deployment/prerequisites','14e'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Deployment/Introduction',
        component: ComponentCreator('/docs/5.0.0/Deployment/Introduction','4e4'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Provider/provider',
        component: ComponentCreator('/docs/5.0.0/Provider/provider','f8f'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Provider/provider_manage_delegates',
        component: ComponentCreator('/docs/5.0.0/Provider/provider_manage_delegates','0ba'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Provider/provider_manage_policies',
        component: ComponentCreator('/docs/5.0.0/Provider/provider_manage_policies','f51'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Provider/provider_register_catalogue_item',
        component: ComponentCreator('/docs/5.0.0/Provider/provider_register_catalogue_item','f3c'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/Provider/provider_register_resource_server',
        component: ComponentCreator('/docs/5.0.0/Provider/provider_register_resource_server','686'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      },
      {
        path: '/docs/5.0.0/registration',
        component: ComponentCreator('/docs/5.0.0/registration','dc9'),
        exact: true,
        'sidebar': "version-5.0.0/tutorialSidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','3e1'),
    routes: [
      {
        path: '/docs/client-credentials',
        component: ComponentCreator('/docs/client-credentials','502'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer',
        component: ComponentCreator('/docs/Consumer/consumer','572'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_data_access_APIs',
        component: ComponentCreator('/docs/Consumer/consumer_data_access_APIs','dbf'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_data_access_async',
        component: ComponentCreator('/docs/Consumer/consumer_data_access_async','416'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_data_access_file_server',
        component: ComponentCreator('/docs/Consumer/consumer_data_access_file_server','340'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_data_access_subscription',
        component: ComponentCreator('/docs/Consumer/consumer_data_access_subscription','16c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_data_discovery',
        component: ComponentCreator('/docs/Consumer/consumer_data_discovery','e8c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Consumer/consumer_obtaining_access_token',
        component: ComponentCreator('/docs/Consumer/consumer_obtaining_access_token','357'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Delegate/delegate',
        component: ComponentCreator('/docs/Delegate/delegate','619'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Delegate/delegate_manage_policy',
        component: ComponentCreator('/docs/Delegate/delegate_manage_policy','423'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Delegate/delegate_register_catalogue_item',
        component: ComponentCreator('/docs/Delegate/delegate_register_catalogue_item','ee2'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Delegate/delegate_register_resource_server',
        component: ComponentCreator('/docs/Delegate/delegate_register_resource_server','cdf'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Deployment Overview',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Deployment Overview','344'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Centralised-Nginx',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Centralised-Nginx','6ca'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Monitoring-stack',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Monitoring-stack','77e'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Provisioning Node-exporter and docker daemon metrics',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Addons/Provisioning Node-exporter and docker daemon metrics','afe'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Provisioning Docker Swarm with overlay network',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Provisioning Docker Swarm with overlay network','1e7'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Resource planning',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Infrastructure Provisioning/Resource planning','4e3'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/Introduction',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/Introduction','b07'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/AAA Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/AAA Server','7fd'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ACL-APD',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ACL-APD','1ef'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Advance Monitoring Stack',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Advance Monitoring Stack','b85'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/API Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/API Server','ba2'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Auditing Server','164'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Catalogue-Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Catalogue-Server','cfc'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Data- Ingestion Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Data- Ingestion Server','4bc'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ELK stack',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/ELK stack','ede'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/File Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/File Server','2ad'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Immudb',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Immudb','ca5'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Initiating the Deployment',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Initiating the Deployment','81a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Keycloak',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Keycloak','788'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Latest-Ingestion-Pipeline',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Latest-Ingestion-Pipeline','66a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/PostgreSQL',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/PostgreSQL','d5d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/RabbitMQ',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/RabbitMQ','46b'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Redis',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Redis','6bd'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Resource-Server',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Resource-Server','44f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Zookeeper',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/IUDX Component Installation/Zookeeper','2ff'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Docker Swarm-Based Deployment/prerequisites',
        component: ComponentCreator('/docs/Deployment/Docker Swarm-Based Deployment/prerequisites','7d8'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Deployment/Introduction',
        component: ComponentCreator('/docs/Deployment/Introduction','6a0'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Provider/provider',
        component: ComponentCreator('/docs/Provider/provider','441'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Provider/provider_manage_delegates',
        component: ComponentCreator('/docs/Provider/provider_manage_delegates','7ad'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Provider/provider_manage_policies',
        component: ComponentCreator('/docs/Provider/provider_manage_policies','131'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Provider/provider_register_catalogue_item',
        component: ComponentCreator('/docs/Provider/provider_register_catalogue_item','a65'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/Provider/provider_register_resource_server',
        component: ComponentCreator('/docs/Provider/provider_register_resource_server','cea'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/registration',
        component: ComponentCreator('/docs/registration','014'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
