import { Box } from "@mui/system";
import dictionary from "./styles/dictionary";

const Panel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role={dictionary.role}
      hidden={value !== index}
      id={dictionary.id(index)}
      aria-labelledby={dictionary.arialLabel(index)}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default Panel;
