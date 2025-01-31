/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ext } from '../../../extensionVariables';
import { ProductionSlotTreeItem } from '../../tree/slotsTree/ProductionSlotTreeItem';
import type { SlotTreeItemBase } from '../../tree/slotsTree/SlotTreeItemBase';
import { getRemoteDebugLanguage } from './getRemoteDebugLanguage';
import type { SiteConfig } from '@azure/arm-appservice';
import * as appservice from '@microsoft/vscode-azext-azureappservice';
import type { IActionContext } from '@microsoft/vscode-azext-utils';
import * as vscode from 'vscode';

export async function startRemoteDebug(context: IActionContext, node?: SlotTreeItemBase): Promise<void> {
  if (!node) {
    node = await ext.tree.showTreeItemPicker<SlotTreeItemBase>(ProductionSlotTreeItem.contextValue, context);
  }

  const siteClient = await node.site.createClient(context);
  const siteConfig: SiteConfig = await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, cancellable: true },
    async (progress, token) => {
      appservice.reportMessage('Fetching site configuration...', progress, token);
      return await siteClient.getSiteConfig();
    }
  );

  const language: appservice.RemoteDebugLanguage = getRemoteDebugLanguage(siteConfig);

  await appservice.startRemoteDebug(context, node.site, siteConfig, language);
}
