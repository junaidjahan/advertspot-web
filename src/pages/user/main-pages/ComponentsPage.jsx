import { Box } from "@mui/system";
import { BaseButton, BaseTextField } from "../../../components/base";

export const ComponentsPage = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <div>
        Button
        <BaseButton>Test Button</BaseButton>
      </div>
      <div>
        Text Field
        <BaseTextField label="Hello" />
      </div>
    </Box>
  );
};
