import React, { useEffect, useState } from "react";
import {Typography,Grid,Paper, List, ListItem, ListItemIcon, Avatar, ListItemText, Divider, TextField, Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Send } from "@mui/icons-material";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    chatSection: {
        width: "100%",
        height: "100vh"
    },
    headBG: {
        backgroundColor: "#e0e0e0"
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0"
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto"
    }
});

export default function Messages() {
    const classes = useStyles();
    const [message,setMessage] = useState(); 
    const [messages,setMessages] = useState([]); 

    const myId = 1;

    const data = [
        {
            id:1,
            senderId:1,
            text:"Hi",
            time:new Date().getDate(),
        },
         {
            id: 2,
            senderId: 2,
            text: "Hello How Are You",
            time: new Date().getDate(),
        },
         {
            id: 3,
            senderId: 1,
            text: "I m Fine",
            time: new Date().getDate(),
        },
        {
            id: 4,
            senderId: 1,
            text: "Hello How Are You",
            time: new Date().getDate(),
        },
        {
            id: 5,
            senderId: 2,
            text: "Same",
            time: new Date().getDate(),
        }
    ];

    const handleSendMessage= () =>{
        const id = messages.at(-1).id + 1;
        const s = messages.at(-1) == 1 ? 2 : 1;
        const m = {
            id: id,
            senderId: s,
            text: message,
            time: new Date().getDate(),
        }
        messages.push(m);
        setMessage('');
        
    }
    useEffect(() => {

    }, [messages])
    

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Chat
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar
                                    alt="Alice"
                                    src="https://material-ui.com/static/images/avatar/3.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar
                                    alt="Cindy Baker"
                                    src="https://material-ui.com/static/images/avatar/2.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                    {messages.map(message => (
                        <ListItem key={message.id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={message.senderId == myId ? "right": "left"}
                                        primary={message.text}
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={message.senderId == myId ? "right" : "left"} secondary={message.time}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                        
                    </List>
                    <Divider />
                    <Grid container style={{ padding: "5px" }}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Type Something"
                                fullWidth
                                onChange={(e) => setMessage(e.target.value) }
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={() => handleSendMessage()} >
                                <Send />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
