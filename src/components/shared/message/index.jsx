import React, { useEffect, useRef, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  TextField,
  Fab
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Margin, Send } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useChat } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import Pusher from 'pusher-js';
import { useRecoilState } from 'recoil';
import { userState } from '~/state';
import { borderRadius } from '@mui/system';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  chatSection: {
    width: '100%',
    height: '100%'
  },
  headBG: {
    backgroundColor: '#e0e0e0',
    margin: '5px',
    padding: '10px'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    height: '83vh'
  },
  senderBox: {
    backgroundColor: '#ebdd',
    borderRadius: '10px',
    textAlign: 'right',
    padding: '10px',
    margin: '5px',
    display: 'inline-grid'
  },
  receiverBox: {
    backgroundColor: '#dfdfdf',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px',
    display: 'inline-grid'
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  back: {
    backgroundColor: '#dfdfdf',
    cursor: 'pointer'
  },
  simple: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#efefef'
    }
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  noconversation: {
    display: 'flex',
    justifyItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default function Messages() {
  let { id } = useParams();
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState();
  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { openLoader, closeLoader } = useLoader();
  const { getConversation, getOrCreateConversation, getMessagesByConversationId, saveMessage } = useChat();
  const user = useRecoilState(userState);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (id) {
      getorCreate();
    } else {
      getMyConversations();
    }
  }, []);

  useEffect(() => {
    console.log('pusher');
    if (conversationId) {
      const pusher = new Pusher('48573c6fb91ca49c9d45', {
        cluster: 'ap2',
        encrypted: true
      });

      const channel = pusher.subscribe(conversationId);
      channel.bind('message-received', data => {
        setMessages([...messages, data]);
        console.log('pusher new ', data);
        console.log(messages);
      });

      const scrollMessagesToBottom = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      };
      scrollMessagesToBottom();

      return () => {
        pusher.unsubscribe(conversationId);
      };
    }
  }, [messages]);

  useEffect(() => {
    // if(cid){
    //   getMessages(cid);
    //   console.log("get messages from url cid", user);
    // }
    if (conversationId) {
      getMessages(conversationId);
      console.log('get messages from conversationId', user);
    }
  }, [conversationId]);

  const getMessages = id => {
    openLoader();
    getMessagesByConversationId(id)
      .then(res => {
        console.log('messags', res);
        setMessages(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getMyConversations = () => {
    openLoader();
    getConversation()
      .then(res => {
        setConversations(res.data);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getorCreate = () => {
    openLoader();
    getOrCreateConversation(id).then(res => {
      getMyConversations();
      console.log(res);
      setReceiver(res.data[0].people);
      setConversationId(res.data[0]._id);
      getMessages(res.data[0]._id);
    });
  };

  const setReceiver = item => {
    console.log(item, user[0].id);
    const r = item.filter(i => i._id != user[0].id);
    setReceiverId(r[0]._id);
  };

  const handleSendMessage = () => {
    if (message) {
      const m = {
        conversationId: conversationId,
        message: message,
        sender: user[0].id,
        receiver: receiverId
      };
      console.log(m);
      saveMessage(m);
      setMessage('');
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getName = item => {
    const p = item.filter(i => i._id != user[0].id);
    return p[0]?.firstName + ' ' + p[0]?.lastName;
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' className={classes.headBG}>
            Messages
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key='RemySharp'>
              <ListItemIcon>
                <Avatar
                  alt='Remy Sharp'
                  src='https://scontent.flhe10-1.fna.fbcdn.net/v/t1.6435-9/185321622_257099689476329_3208790035830364121_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF7L40Gr-dStVjurcG0ROhXDwOEVPEqS7APA4RU8SpLsLiC6q80244n_Ij5lNmBFGu6fdOrxYPIFiRCnkEXUzcn&_nc_ohc=Dl0ZhijnvOsAX_INvZ7&_nc_ht=scontent.flhe10-1.fna&oh=00_AfDUzf-IYNIF73iGjhw64yrKAAbkvtkrMvgNbAj3cdVhOA&oe=63E68306'
                />
              </ListItemIcon>
              <ListItemText primary={user[0]?.firstName + ' ' + user[0]?.lastName}></ListItemText>
              {/* <ListItemText secondary='online' align='right'></ListItemText> */}
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id='outlined-basic-email' label='Search' variant='outlined' fullWidth />
          </Grid>
          <Divider />
          <List>
            {conversations.map(conversation => (
              <ListItem
                className={conversation._id == conversationId ? classes.back : classes.simple}
                key={conversation._id}
                onClick={() => {
                  setConversationId(conversation._id);
                  setReceiver(conversation.people);
                }}
              >
                <ListItemIcon>
                  <Avatar
                    alt='Remy Sharp'
                    src='https://scontent.flhe10-1.fna.fbcdn.net/v/t1.6435-9/185321622_257099689476329_3208790035830364121_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF7L40Gr-dStVjurcG0ROhXDwOEVPEqS7APA4RU8SpLsLiC6q80244n_Ij5lNmBFGu6fdOrxYPIFiRCnkEXUzcn&_nc_ohc=Dl0ZhijnvOsAX_INvZ7&_nc_ht=scontent.flhe10-1.fna&oh=00_AfDUzf-IYNIF73iGjhw64yrKAAbkvtkrMvgNbAj3cdVhOA&oe=63E68306'
                  />
                </ListItemIcon>
                <ListItemText primary={getName(conversation.people)}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        {conversationId || id ? (
          <Grid item xs={9}>
            <List ref={scrollRef} scrollableNodeProps={{ ref: scrollRef }} className={classes.messageArea}>
              {messages.map(message => (
                <ListItem key={message._id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div className={message.sender._id == user[0]?.id ? classes.right : classes.left}>
                        <div className={message.sender._id == user[0]?.id ? classes.senderBox : classes.receiverBox}>
                          <Typography>{message.message}</Typography>
                          <Typography variant='caption'>
                            {formatDistanceToNowStrict(new Date(message.createdAt), {
                              addSuffix: true
                            })}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>

            <Divider />
            <Grid container style={{ padding: '5px' }}>
              <Grid item xs={11}>
                <TextField
                  id='outlined-basic-email'
                  label='Type Something'
                  fullWidth
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={e => handleKeyPress(e)}
                />
              </Grid>
              <Grid xs={1} align='right'>
                <Fab color='primary' aria-label='add' onClick={() => handleSendMessage()}>
                  <Send />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={9}>
            <div className={classes.noconversation}>
              <h3>No active conversations</h3>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
