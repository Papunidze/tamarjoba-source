import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Popover,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { LOGOUT } from "./app-action";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import logo from "../img/logo.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import { Container } from "@mui/system";
import Settings from "../modules/settings";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((action) => action.authReducer.users);
  const handleClick = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  const handleSettings = () => {
    setOpen(false);
    setSettings(true);
  };
  return (
    <AppBar position="static" sx={{ ...styles.appBar }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack sx={{ ...styles.headerContainer }}>
            <Box>
              <IconButton sx={{ ...styles.iconBtn }} href="/">
                <Avatar
                  alt=""
                  src={logo}
                  sx={{
                    borderRadius: 0,
                    width: "100%",
                  }}
                />
              </IconButton>
            </Box>
            <Box>
              <Box>
                <IconButton
                  sx={{
                    ...styles.settingBtn,
                    p: 1,
                    cursor: "pointer",
                    zIndex: 5,
                    display: "flex",
                    gap: 1.5,
                    color: "black",
                    width: "100%",
                  }}
                  onClick={handleClick}
                >
                  <Typography textAlign="center">{user.name}</Typography>
                  <Avatar sx={{ ...styles.Avatar }} />
                </IconButton>

                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={() => setOpen(false)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ transform: "translate(-5%,35px)" }}
                >
                  <Typography sx={{ p: 1.5 }}>
                    <IconButton
                      sx={{ ...styles.settingBtn }}
                      onClick={handleSettings}
                    >
                      <SettingsIcon
                        color={dictionary.logOutColor}
                        fontSize="small"
                      />
                      <Typography fontSize="small">პარამეტრები</Typography>
                    </IconButton>
                  </Typography>
                  <Typography sx={{ p: 1.5 }}>
                    <IconButton
                      onClick={() => dispatch({ type: LOGOUT })}
                      sx={{ ...styles.settingBtn }}
                    >
                      <LogoutIcon
                        color={dictionary.logOutColor}
                        fontSize="small"
                      />
                      <Typography fontSize="small">გასვლა</Typography>
                    </IconButton>
                  </Typography>
                </Popover>
              </Box>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
      <Settings open={settings} setOpen={setSettings} />
    </AppBar>
  );
};

export default Header;
