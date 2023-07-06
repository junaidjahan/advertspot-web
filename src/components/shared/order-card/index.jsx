import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { BaseButton, BaseCard } from '~/components';
import { toTitleCase } from '~/global';
import { ORDER_STATUS, USER_TYPE } from '~/global/constants';
import { useOrder, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const OrderCard = ({ order, handleChange, ...props }) => {
  const [completeOrder, setCompleteOrder] = useState(false);
  const [closeOrder, setCancelOrder] = useState(false);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState({ service: null, communication: null, delivery: null });
  const { changeStatus, createReview } = useOrder();
  const { openLoader, closeLoader } = useLoader();
  const { open } = useSnackbar();

  const handleRating = (type, rate) => {
    setRating((prev, curr) => {
      return { ...prev, [type]: rate };
    });
  };

  const handleCompleteOpen = () => {
    setCompleteOrder(true);
  };

  const handleReviewOpen = () => {
    setReview(true);
  };
  const handleReviewClose = () => {
    setReview(false);
  };

  const handleCompleteOrder = async (id, status) => {
    openLoader();
    const order = await changeStatus(id, status);
    closeLoader();
    setCancelOrder(false);
    setCompleteOrder(false);
    if (order) {
      open(`Order ${toTitleCase(status)} successfully!`);
    }
    handleChange();
  };

  const handleReview = async order => {
    openLoader();
    const review = await createReview({ ...rating, orderId: order.id });
    closeLoader();
    setReview(false);
    open('Reviewed successfully!');
    setRating({ service: null, communication: null, delivery: null });
    handleChange();
  };

  const handleCancelOpen = () => {
    setCancelOrder(true);
  };

  const handleClose = () => {
    setCancelOrder(false);
    setCompleteOrder(false);
  };

  return (
    <div>
      <Container maxWidth='md' {...props}>
        <Box>
          <Box sx={style.list}>
            <Box className='d-flex justify-space-between'>
              <Box sx={{ cursor: 'pointer' }}>
                <h4 style={style.jobTitle}>{order?.title}</h4>
              </Box>
              <Box className='d-flex'>
                <h5 className='ml-7' style={style.subHeading}>
                  Status:<span style={style.details}> {toTitleCase(order?.status ?? '')}</span>
                </h5>
              </Box>
            </Box>
            <Box>
              <p style={style.description} className='mt-10'>
                {order?.description}
              </p>
            </Box>
            <Box className='d-flex mt-10 justify-space-between'>
              <Typography variant='p' className='header-message d-flex'>
                <Typography variant='p' sx={style.dimesions}>
                  Dimensions:
                </Typography>{' '}
                {order?.height} <p style={style.by}>by</p> {order?.width}
              </Typography>
              <Typography variant='p' className='header-message d-flex'>
                <Typography variant='p' sx={style.dimesions}>
                  Quantity:
                </Typography>{' '}
                {order?.quantity}
              </Typography>
            </Box>
            <Box className='d-flex mt-10 justify-space-between'>
              <Box>
                <p style={style.budget} className='d-flex'>
                  Amount: {order?.amount} Pkr
                </p>
              </Box>
              <Box>
                {order?.sellerName ? (
                  <p style={style.budget} className='d-flex'>
                    Seller: {order?.sellerName}
                  </p>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            <Box>
              {order?.userType === USER_TYPE.SELLER ||
              [ORDER_STATUS.CANCELLED, ORDER_STATUS.COMPLETED].includes(order?.status) ? (
                <>
                  {order.reviewed == false ? (
                    <Box>
                      <Box className='d-flex mt-10' style={{ justifyContent: 'end' }}>
                        <BaseButton variant='contained' size='small' onClick={handleReviewOpen}>
                          Review
                        </BaseButton>
                      </Box>
                      <Dialog
                        open={review}
                        onClose={handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                      >
                        <DialogTitle id='alert-dialog-title'>{'Review'}</DialogTitle>
                        <DialogContent>
                          <div>
                            <p style={{ fontWeight: '500' }}>How would you rate this seller?</p>
                          </div>
                          <div style={style.ratingCard}>
                            <div style={style.ratingBox}>
                              <h4 style={{ color: '#9B57F2' }}>Service</h4>
                              <Rating
                                name='service'
                                value={rating.service}
                                size='large'
                                onChange={(event, newVal) => {
                                  handleRating('service', newVal);
                                }}
                                precision={0.5}
                                style={{ display: 'flex' }}
                              />
                            </div>

                            <div style={style.ratingBox}>
                              <h4 style={{ color: '#9B57F2' }}>Communication</h4>
                              <Rating
                                name='communication'
                                value={rating.communication}
                                onChange={(event, newVal) => {
                                  handleRating('communication', newVal);
                                }}
                                precision={0.5}
                                size='large'
                                style={{ display: 'flex' }}
                              />
                            </div>
                            <div style={style.ratingBox}>
                              <h4 style={{ color: '#9B57F2' }}>Delivery</h4>
                              <Rating
                                name='delivery'
                                value={rating.delivery}
                                size='large'
                                onChange={(event, newVal) => {
                                  handleRating('delivery', newVal);
                                }}
                                precision={0.5}
                                style={{ display: 'flex' }}
                              />
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <BaseButton
                            onClick={() => {
                              handleReviewClose();
                            }}
                            variant='outlined'
                            size='small'
                          >
                            Cancel
                          </BaseButton>
                          <BaseButton
                            onClick={() => {
                              handleReview(order);
                            }}
                            variant='contained'
                            autoFocus
                            size='small'
                          >
                            Submit
                          </BaseButton>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  ) : (
                    <> </>
                  )}
                </>
              ) : (
                <Box className='d-flex mt-10' style={{ justifyContent: 'end' }}>
                  <BaseButton
                    color='error'
                    className='mr-10'
                    size='small'
                    onClick={handleCancelOpen}
                    variant='outlined'
                  >
                    Cancel
                  </BaseButton>
                  <BaseButton onClick={handleCompleteOpen} variant='contained'>
                    Mark as Completed
                  </BaseButton>
                  <Dialog
                    open={completeOrder}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>{'Mark as Completed'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to mark this order as completed?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <BaseButton
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        No
                      </BaseButton>
                      <BaseButton
                        onClick={() => {
                          handleCompleteOrder(order.id, ORDER_STATUS.COMPLETED);
                        }}
                        autoFocus
                      >
                        Yes
                      </BaseButton>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={closeOrder}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>{'Cancel Order'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to cancel this order?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <BaseButton onClick={handleClose}>No</BaseButton>
                      <BaseButton
                        onClick={() => {
                          handleCompleteOrder(order.id, ORDER_STATUS.CANCELLED);
                        }}
                        autoFocus
                      >
                        Yes
                      </BaseButton>
                    </DialogActions>
                  </Dialog>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

const style = {
  userName: {
    fontWeight: 'normal'
  },

  card: {
    mt: 2
  },
  heading: {
    fontWeight: '600',
    fontSize: 21
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '500'
  },
  anchor: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f57c3'
  },

  paymentIcon: {
    fontSize: 20,
    backgroundColor: 'grey',
    ml: 1
  },
  ratingCard: {
    width: '400px',
    backgroundColor: '#ebebeb',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '10px'
  },
  ratingBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px'
  },
  budget: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey'
  },
  subHeading: {
    fontWeight: '400'
  },
  details: {
    fontWeight: '600',
    color: '#9B57F2'
  },
  icon: {
    color: 'darkGrey.light'
  },
  list: {
    p: 2,
    borderRadius: 2,
    border: `1px solid #dfdfdf`,
    mt: 1,

    '&:hover': {
      backgroundColor: 'grey.light'
    }
  },

  pointsTitle: {
    fontSize: 20,
    fontWeight: '500'
  },

  workDetailslist: {
    p: 2
  },
  dimesions: {
    fontWeight: '600',
    mr: 2
  },
  by: {
    color: '#9B57F2',
    marginLeft: '8px',
    marginRight: '8px'
  },
  description: {
    color: '#74767e'
  }
};
