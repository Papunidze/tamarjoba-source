import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { _complement, _dominationColor, _hoverColor } from "../../../themes";

export const Wrapper = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  gap: 12,
  marginTop: "2rem",
});
export const RedButton = styled(Button)({
  borderRadius: "5px",
  color: _complement,
  background: _dominationColor,
  fontWeight: "700",
  textTransform: "capitalize",
  boxShadow: "0 12px 35px 0 rgba(255, 235, 167, 0.15)",
  "&:hover": {
    background: _hoverColor,
  },
});
export const CalendarInformationBox = styled(Box)({
  width: "fit-content",
  padding: "0.5rem",
  background: "rgba( 190, 182, 182, 0.3 )",

  backdropFilter: "blur( 2px )",
  borderRadius: "10px",
  display: "flex",
  gap: "2px",
});
