import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Loader from './components/Loader';
import { getWeatherData } from './store/weather';
import { motion } from "framer-motion";
import { Button, FormControlLabel, Radio } from '@mui/material';
import CardsContainer from './components/CardsContainer';
import ChartContainer from './components/ChartContainer';


function App() {
  const loading = useSelector(state => state.app.loading);
  const error = useSelector(state => state.app.error);
  const data = useSelector(state => state.app.data)
  const [days, setDays] = useState([])
  const [seperatedArray, setSeperatedArray] = useState([])
  const [selectedDay, setSelectedDay] = useState([])
  const [unit, setUnit] = useState('metric')
  const [selectedIndex, setSelectedIndex] = useState('')
  const dispatch = useDispatch()
  const fetchData = () => {
    dispatch(getWeatherData({ unit }))
  }
  useEffect(() => {
    fetchData()
  }, [unit])

  useEffect(() => {
    if (selectedIndex) {
      setSelectedDay(seperatedArray[selectedIndex])
    }
  }, [seperatedArray, selectedIndex])

  useEffect(() => {
    if (data.list) {
      setDays(getDays(data.list))
    }
    return getDays
  }, [data])

  const handleChange = (event) => {
    setUnit(event.target.value);
  };



  const getDays = (list) => {
    const seperatedArray = []
    var i, j = 0, temporary
    if (list) {
      for (i = 0; i < list.length; i++) {
        if (list[i]?.dt_txt?.split(' ')[0] !== list[i + 1]?.dt_txt?.split(' ')[0]) {
          temporary = list.slice(j, i);
          j = i + 1;
          seperatedArray.push(temporary);
        }

      }
      setSeperatedArray(seperatedArray)
      return seperatedArray.map(array => array[0]);
    }
  }

  const handleDaySelection = (index) => {
    setSelectedIndex(index)
    setSelectedDay(seperatedArray[index])
  }

  return (
    <div className="App">
      {loading ? <div className="loader" data-testid='loader'><Loader /></div> :
        !error &&
        <motion.div
          transition={{ ease: "easeOut", duration: 2 }}
          className='container'
        >
          <motion.div>
            <motion.h1
              className='title'
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ ease: 'easeInOut', duration: 1 }}
            >
              Berlin Weather Forecast
            </motion.h1>
            <motion.div
              className='actions'
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={unit === 'metric'}
                    onChange={handleChange}
                    value="metric"
                    name="celcius"
                    inputProps={{ 'aria-label': 'Metric' }}
                  />
                }
                label="Celcius"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={unit === 'imperial'}
                    onChange={handleChange}
                    value="imperial"
                    name="farenheit"
                    inputProps={{ 'aria-label': 'Imperial' }}
                  />
                }
                label="Farenheit"
              />
            </motion.div>
            <motion.div className='refresh'>
              <Button
                variant="contained"
                size="large"
                onClick={() => fetchData()}
              >
                Refresh
              </Button>
            </motion.div>
          </motion.div>
          <motion.div>
            <CardsContainer days={days} unit={unit} handleDaySelection={handleDaySelection} selectedIndex={selectedIndex} />
          </motion.div>
          {selectedDay.length > 0 &&
            <motion.div>
              <ChartContainer day={selectedDay} key={seperatedArray} />
            </motion.div>
          }
        </motion.div>
      }
    </div>
  );
}

export default App;
