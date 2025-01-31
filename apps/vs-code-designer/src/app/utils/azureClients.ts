/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { StorageManagementClient } from '@azure/arm-storage';
import { createAzureClient } from '@microsoft/vscode-azext-azureutils';
import type { AzExtClientContext } from '@microsoft/vscode-azext-azureutils';

export async function createStorageClient<T extends AzExtClientContext>(context: T): Promise<StorageManagementClient> {
  return createAzureClient(context, (await import('@azure/arm-storage')).StorageManagementClient);
}
