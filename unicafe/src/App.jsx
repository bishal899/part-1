import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}
const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}
const Statistics = ({ content1, content2, content3, total, avg, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text={content1.name} value={content1.values} />
        <StatisticsLine text={content2.name} value={content2.values} />
        <StatisticsLine text={content3.name} value={content3.values} />
        <StatisticsLine text="All" value={total} />
        <StatisticsLine text="Average" value={avg} />
        <StatisticsLine text="Positive" value={positive} />
      </tbody>
    </table>
  )
}
const StatisticsLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)
  const content = [
    {
      name: "Good",
      values: good,
      points: 1
    },
    {
      name: "Neutral",
      values: neutral,
      points: 0
    },
    {
      name: "Bad",
      values: bad,
      points: -1
    }
  ]

  const handleGoodBtn = () => {
    console.log("clicked good");
    const newGood = good + 1;
    const newTotal = newGood + neutral + bad;
    setGood(newGood);
    setTotal(newTotal);
    setAvg(newTotal === 0 ? 0 : (newGood * 1 + neutral * 0 + bad * -1) / newTotal);
    setPositive(newTotal === 0 ? 0 : (newGood / newTotal) * 100 + "%");
  }
  const handleNeutralBtn = () => {
    console.log("clicked neutral");
    const newNeutral = neutral + 1;
    const newTotal = good + newNeutral + bad;
    setNeutral(newNeutral);
    setTotal(newTotal);
    setAvg(newTotal === 0 ? 0 : (good * 1 + newNeutral * 0 + bad * -1) / newTotal);
  }
  const handleBadBtn = () => {
    console.log("clicked bad");
    const newBad = bad + 1;
    const newTotal = good + neutral + newBad;
    setBad(newBad);
    setTotal(newTotal);
    setAvg(newTotal === 0 ? 0 : (good * 1 + neutral * 0 + newBad * -1) / newTotal);
  }

  return (
    <>
      <div>
        <Heading text="Give Feedback" />
        <Button onClick={handleGoodBtn} text={content[0].name} />
        <Button onClick={handleNeutralBtn} text={content[1].name} />
        <Button onClick={handleBadBtn} text={content[2].name} />
      </div>
      <div>
        <Heading text="Statistics" />
        {total === 0 ? <p>No feedback given</p> : <Statistics
          content1={content[0]}
          content2={content[1]}
          content3={content[2]}
          total={total}
          avg={avg}
          positive={positive}
        />}

      </div>
    </>
  )
}

export default App
