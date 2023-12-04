import { useState } from 'react'

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

  const AvgCalculator = (good, neutral, bad, all) => {
    const avg = (
      (good * 1) +
      (neutral * 0) +
      (bad * -1)
    )
      / all
    setAvg(avg)
  }

  const positivePctCalculator = (good, all) => {
    const pct = (
      (good / all) * 100
    )
    setPositivePct(pct)
  }

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + neutral + bad
    setGood(updatedGood)
    setAll(updatedAll)
    AvgCalculator(updatedGood, neutral, bad, updatedAll)
    positivePctCalculator(updatedGood, updatedAll)
  }

  const handeNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    AvgCalculator(good, updatedNeutral, bad, updatedAll)
    positivePctCalculator(good, updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = good + neutral + updatedBad
    setBad(updatedBad)
    setAll(updatedAll)
    AvgCalculator(good, neutral, updatedBad, updatedAll)
    positivePctCalculator(good, updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handeNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positivePct} %</p>

    </div>
  )
}

export default App