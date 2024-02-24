import { microsoftAuthApiRef } from "@backstage/core-plugin-api";

export const providers = [
        {
        id: 'ms-entra-id-auth-provider',
        title: 'Microsoft Entra ID',
        message: 'Sign in using Microsoft Entra ID',
        apiRef: microsoftAuthApiRef,
      }
];