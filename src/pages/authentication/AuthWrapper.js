import PropTypes from 'prop-types';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
// project import
import Logo from 'components/Logo';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
        {/* Left Side - Brand/Marketing (Hidden on Mobile) */}
        <Box
            sx={{
                flex: { xs: 0, md: 1 },
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #6c5ce7 0%, #4834d4 100%)',
                color: 'common.white',
                p: { md: 6, lg: 8 },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Circles */}
            <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)' }} />
            <Box sx={{ position: 'absolute', bottom: -150, right: -50, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)' }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    Donnez vie à vos campagnes d'emailing.
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.8, lineHeight: 1.5, maxWidth: 480 }}>
                    La plateforme rapide, intuitive et performante pour gérer vos listes et engager votre audience.
                </Typography>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    © {new Date().getFullYear()} List Mailer. Tous droits réservés.
                </Typography>
            </Box>
        </Box>

        {/* Right Side - Login Form */}
        <Box
            sx={{
                flex: { xs: 1, md: 1, lg: 0.8 },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                position: 'relative'
            }}
        >
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Logo />
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 480 }}>
                    {children}
                </Box>
            </Box>

            <Box sx={{ p: 3, textAlign: 'center', display: { xs: 'block', md: 'none' } }}>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} List Mailer.
                </Typography>
            </Box>
        </Box>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
