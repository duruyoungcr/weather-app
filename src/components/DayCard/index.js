import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import styles from './DayCard.module.css'
import { motion } from "framer-motion";


const DayCard = ({ day, unit, index, handleDaySelection, selectedIndex }) => {
    const IMAGE_PATH = `http://openweathermap.org/img/wn/${day?.weather[0].icon}.png`
    return (
        <motion.div
            whileHover={{
                y: -5,
                transition: { duration: 0.2 },
            }}
            onClick={() => handleDaySelection(index)}
        >
            <Card
                className={`${selectedIndex === index && styles.selected} ${styles.card}`}
                sx={{
                    backgroundColor: '#1976D2',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        color: 'white'
                    }}
                >
                    <Typography color="text.white" variant="h6" component='div' gutterBottom>
                        Temperature
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography color="text.primary" component='h6' sx={{ minWidth: 'max-content', color: 'white' }}>
                            {`${day?.main.temp}${unit === 'metric' ? 'C' : 'F'}`}
                        </Typography>
                        <CardMedia
                            component="img"
                            image={IMAGE_PATH}
                            alt={day?.weather[0].description}
                            width="64"
                            height="64"
                            sx={{
                                objectFit: 'contain',
                                maxWidth: 'min-content',
                            }}
                        />
                    </Box>
                    <Typography color="text.white" component='p' sx={{ minWidth: 'max-content', textTransform: 'capitalize' }}>
                        {day?.weather[0].description}
                    </Typography>
                    <Typography color="text.white" component='p'>
                        {day?.dt_txt.split(' ')[0]}
                    </Typography>
                </CardContent>
            </Card >
        </motion.div>
    )
}

export default DayCard
