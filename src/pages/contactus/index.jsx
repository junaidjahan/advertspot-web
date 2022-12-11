import { Box, Container, Grid, Icon, Link } from '@mui/material';
import { BaseButton, BaseCard, BaseForm, BaseSelect, BaseTextField, Navbar } from '~/components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm, useJob } from '~/hooks';
import { jobSchema } from '~/schemas';
import { userState } from '~/state';
import { useForm as useHookForm } from 'react-hook-form';


export const ContactUs = () => {

    const form = useForm({ schema: jobSchema });
    const handleSubmit = async values => {
        await saveJob(values);
        reset();
    };
    const {
        formState: { isValid, isSubmitting },
        reset
    } = form;
    

    return (
        <div>
        <Navbar />
            <Container maxWidth='md' sx={style.container}>
                <BaseCard sx={style.adCard}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} className='center-column'>
                            <Box>
                                <h1 style={style.lightWeight}>Contact with us!</h1>
                                <p style={style.pText}>
                                    The most wallet-friendly way to hire anyone, anywhere in Pakistan. It's everything you love about
                                    AdverSpot, and more.
                                </p>
                                
                                <Box>
                                    <Link href="https://www.facebook.com">
                                        <FacebookIcon></FacebookIcon>
                                    </Link>
                                    <Link href="https://www.twitter.com">
                                        <TwitterIcon></TwitterIcon>
                                    </Link>
                                    <Link href="https://www.instagram.com">
                                        <InstagramIcon></InstagramIcon>
                                    </Link>
                                    <Link href="https://www.linkedin.com">
                                        <LinkedInIcon></LinkedInIcon>
                                    </Link>
                                    
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={style.image} className='center-row'>
                                <img src='/contactus.png' height={300} alt='rocket' />
                            </Box>
                        </Grid>
                        
                    </Grid>
                </BaseCard>


                <BaseCard>
                    <h1>Contact Us</h1>
                    <BaseForm form={form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Box sx={style.textField}>
                                    <BaseTextField fullWidth required name='Name' label='Name' />
                        </Box>
                        </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={style.textField}>
                                        <BaseTextField fullWidth required type="email" name='Email' label='Email' />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Box sx={style.textField}>
                                        <BaseTextField fullWidth required name='Message' label='Message' />
                                    </Box>
                                </Grid>
                            <Grid item md={12}>
                                <Box sx={style.button}>
                                    <BaseButton
                                    href={'mailto:test@example.com'}
                                     variant='contained'  loading={isSubmitting} size='small' type='submit'>
                                        Submit
                                    </BaseButton>
                                </Box>
                            </Grid>
                        
                    </Grid>
                    </BaseForm>
                </BaseCard>
            
            </Container>
        </div>
    );
};

const style = {
    container: {
        py: 3
    },
    adCard: {
        backgroundColor: 'primary.dark',
        color: 'white.main',
        my: 4,
        px: 3,
        pb: 0,
        overflow: 'hidden'
    },
    lightWeight: {
        fontWeight: '600'
    },
    tagLineBox: {
        m: 2
    },

    pText: {
        fontSize: 13
    },
    btnBox: {
        backgroundColor: 'white.main',
        borderRadius: 50,
        color: 'black.main',
        width: 'max-content',
        p: 1,
        px: 3
    },
    textField: {
        my: '10px'
    },
    button: {
        display: 'flex',
        justifyContent: 'end'
    },
    image: { transform: 'translate(-10px, -20px)' },
    form: {
        mb: 4
    }
};
