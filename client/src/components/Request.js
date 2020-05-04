import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Card,
  CardMedia,
  withStyles,
  CardContent,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  tst: {
    border: "1px solid #eeeeee",
    alignSelf: "center",
    background: "transparent",
    padding: "1rem 1rem",
    margin: "1rem",
    transition: "all .5s ease",
    color: "#41403E",
    fontSize: "1rem",
    letterSpacing: "1px",
    outline: "none",
    boxShadow: "20px 38px 34px -26px hsla(0,0%,0%,.1)",
    // borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
    "&:hover": {
      boxShadow: "2px 8px 4px -6px hsla(0,0%,0%,.2)",
    },
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  imga: {
    width: "70px",
    height: "70px",
  },
  circleStyle: {
    width: 70,
    height: 70,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    // border: "0.1875em solid gray",
    borderRadius: "50%",
    justifyContent: "center",
  },
});

function Circle(props) {
  const classes = useStyles();
  const [color, setColor] = React.useState("");

  async function handleChangeColor(color) {
    setColor(color);
  }

  useEffect(() => {
    if (props.value === "junior") {
      handleChangeColor("#bdbdbd");
    } else if (props.value === "middle") {
      handleChangeColor("#fff59d");
    } else {
      handleChangeColor("#ffa726");
    }
  }, []);

  return (
    <div
      className={classes.circleStyle}
      style={{ border: `0.1875em solid ${color}` }}
    >
      {props.value}
    </div>
  );
}

export default function Request(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Draggable
      draggableId={`${props.request.user_skill_id}`}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Grid
          container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id={props.request.id}
          onClick={handleClick}
          className={classes.tst}
          direction="column"
        >
          <Grid
            container
            style={{
              backgroundColor: snapshot.isDragging ? "#ffecb3" : "white",
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <ListItem>{props.request.name}</ListItem>
              </Grid>
              <Grid item xs={6}>
                <Circle value={props.request.level_name} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider light />
                <List>
                  <ListItemIcon>
                    <Avatar>
                      {props.request
                        ? props.request.firstName.substring(0, 1)
                        : "N"}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText>
                    {props.request.email} {props.request.firstName}{" "}
                    {props.request.lastName}
                  </ListItemText>
                </List>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Draggable>
  );
}
