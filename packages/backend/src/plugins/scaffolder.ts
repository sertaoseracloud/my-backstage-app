import { CatalogClient } from '@backstage/catalog-client';
import { ScmIntegrations } from '@backstage/integration';
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { createRouter } from '@backstage/plugin-scaffolder-backend';
import {
  cloneAzureRepoAction,
  pushAzureRepoAction,
  pullRequestAzureRepoAction,
} from "@parfuemerie-douglas/scaffolder-backend-module-azure-repositories";

import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });

  const actions = [
    ...builtInActions, 
    cloneAzureRepoAction({ integrations }),
    pushAzureRepoAction({ integrations, config: env.config }),
    pullRequestAzureRepoAction({ integrations }),
  ]

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    permissions: env.permissions,
  });
}
