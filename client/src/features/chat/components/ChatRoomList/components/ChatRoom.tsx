import React from "react";
import { ListItem, ListItemText, useTheme } from "@mui/material";

interface ChatRoomProps {
  id: number;
  name: string;
  isSelected: boolean;
  onSelect: (roomId: number) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  id,
  name,
  isSelected,
  onSelect,
}) => {
  const theme = useTheme();

  return (
    <ListItem
      component="div"
      onClick={() => onSelect(id)}
      sx={{
        cursor: "pointer",
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.secondary.main,
        backgroundColor: isSelected ? theme.palette.primary.light : "inherit",
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.secondary.main,
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.secondary.main,
        },
      }}
    >
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default ChatRoom;
