import { useState } from 'react'


const AvgCalculator = (good, neutral, bad, all) => {
  const avg = (
    (good * 1) +
    (neutral * 0) +
    (bad * -1)
  )
    / all
  return avg
}

const positivePctCalculator = (good, all) => {
  const pct = (
    (good / all) * 100
  )
  return pct
}

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positivePct} %</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAvg] = useState(0)
  const [positivePct, setPositivePct] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + neutral + bad
    setGood(updatedGood)
    setAll(updatedAll)
    setAvg(AvgCalculator(updatedGood, neutral, bad, updatedAll))
    setPositivePct(positivePctCalculator(updatedGood, updatedAll))

  }

  const handeNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAvg(AvgCalculator(good, updatedNeutral, bad, updatedAll))
    setPositivePct(positivePctCalculator(good, updatedAll))
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = good + neutral + updatedBad
    setBad(updatedBad)
    setAll(updatedAll)
    setAvg(AvgCalculator(good, neutral, updatedBad, updatedAll))
    setPositivePct(positivePctCalculator(good, updatedAll))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handeNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePct={positivePct} />
    </div>
  )
}

export default App
