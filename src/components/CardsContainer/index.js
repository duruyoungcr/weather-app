import { useEffect } from "react"
import Carousel from "react-elastic-carousel"
import DayCard from "../DayCard"
import styles from './CardsContainer.module.css'

const CardsContainer = ({ days, unit, handleDaySelection, selectedIndex }) => {
    useEffect(() => {
    }, [unit, days])
    const breakPoints = [
        { width: 1, itemsToShow: 1, pagination: false },
        { width: 450, itemsToShow: 3, itemPadding: [0, 10] },
        { width: 700, itemsToShow: 3, itemPadding: [0, 10] },
    ]
    return (
        <div className={styles.container}>
            <Carousel
                pagination={false}
                breakPoints={breakPoints}
            >
                {days.map((day, index) => (
                    <DayCard
                        day={day}
                        index={index}
                        key={day.dt}
                        unit={unit}
                        handleDaySelection={handleDaySelection}
                        selectedIndex={selectedIndex}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default CardsContainer
