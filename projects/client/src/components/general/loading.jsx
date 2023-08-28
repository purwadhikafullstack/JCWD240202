import { CircularProgress, Container } from '@mui/material';

export default function LoadingProgress() {
    return (
        <>
            <Container
                open={true}
                sx={{
                    color: '#0058ac',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    textAlign: 'center',
                    padding: '50px 0px',
                }}
            >
                <CircularProgress color="inherit" />
            </Container>
        </>
    );
}
