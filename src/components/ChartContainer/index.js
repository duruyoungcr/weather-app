import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import Loader from "../Loader"
import styles from './ChartContainer.module.css'



const ChartContainer = ({ day }) => {
    const [reducedDay, setReducedDay] = useState([])
    useEffect(() => {
        configureChart()
    }, [day])

    const configureChart = () => {
        setReducedDay(day.map(day => {
            return [day.dt_txt.split(' ')[1], day.main.temp]
        }))
    }
    const getWidth = () => {
        if (window.outerWidth > 450) {
            return '500px';
        }
        return '100%'
    }
    return (
        <div className={styles.container}>
            <Chart
                width={getWidth()}
                height={'300px'}
                chartType="Bar"
                loader={
                    <div className={styles.loader}>
                        <Loader />
                    </div>
                }
                data={[
                    ['Time', 'Temp'],
                    ...reducedDay
                ]}
                options={{
                    chart: {
                        title: `Daily Weather Forcast - ${day[0]?.dt_txt.split(' ')[0]}`,
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    )
}

export default ChartContainer
