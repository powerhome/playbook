import { advancedTablePreviewMap } from "./advanced_table";
import { alertsAndDialogsPreviewMap } from "./alerts_and_dialogs";
import { buttonsPreviewMap } from "./buttons";
import { dataAndVisualizationPreviewMap } from "./data_and_visualization";
import { dateAndTimeTextPatternsPreviewMap } from "./date_and_time_text_pattern";
import { formAndDashboardTextPatternsPreviewMap } from "./form_and_dashboard_text_pattern";
import { formElementsPreviewMap } from "./form_element";
import { formInputPreviewMap } from "./form_input";
import { formSelectionPreviewMap } from "./form_selection";
import { iconsAndImagesPreviewMap } from "./icons_and_images";
import { layoutAndStructurePreviewMap } from "./layout_and_structure";
import { messageTextPatternsPreviewMap } from "./message_text_pattern";
import { navigationPreviewMap } from "./navigation";
import { stateAndProgressIndicatorsPreviewMap } from "./state_and_progress_indicators";
import { tagsPreviewMap } from "./tags";
import { typographyPreviewMap } from "./typography";
import { userPreviewMap } from "./user";

const kitPreviewRegistry = {
  ...advancedTablePreviewMap,
  ...alertsAndDialogsPreviewMap,
  ...buttonsPreviewMap,
  ...dataAndVisualizationPreviewMap,
  ...dateAndTimeTextPatternsPreviewMap,
  ...formAndDashboardTextPatternsPreviewMap,
  ...formElementsPreviewMap,
  ...formInputPreviewMap,
  ...formSelectionPreviewMap,
  ...iconsAndImagesPreviewMap,
  ...layoutAndStructurePreviewMap,
  ...messageTextPatternsPreviewMap,
  ...navigationPreviewMap,
  ...stateAndProgressIndicatorsPreviewMap,
  ...tagsPreviewMap,
  ...typographyPreviewMap,
  ...userPreviewMap,
} as const;

type KitPreviewKey = keyof typeof kitPreviewRegistry;

const hasKitPreview = (key: string): key is KitPreviewKey =>
  key in kitPreviewRegistry;

export const getKitPreview = ({
  category,
  name,
  parent,
}: {
  category?: string;
  name: string;
  parent?: string;
}) => {
  const previewGroup = parent || category;

  if (!previewGroup) {
    return undefined;
  }

  const previewKey = `${previewGroup}/${name}`;

  return hasKitPreview(previewKey) ? kitPreviewRegistry[previewKey] : undefined;
};
