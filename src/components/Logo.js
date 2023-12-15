import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx, color }) {
  if (color === "white") {
    return (
      <Box
        component="img"
        src="/images/Insights_HR_white.png"
        sx={{ ...sx, width:330, height:165 }}
      />
    );
  }
  return <Box component="img" src="/images/Insights_HR_black.png" sx={{ ...sx, width:320, height:255 }} />;
}
