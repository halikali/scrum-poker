import Button from '../../components/form/Button'
import PockerCard from '../../components/ui/PockerCard'
import PokerDesk from '../../components/ui/PokerDesk'
import {
  extendFibonacciArray,
  fibonacciArray,
} from '../../utils/fibonacciUtils'
import './game.scss'

const Game = () => {
  const cards = [...new Set(fibonacciArray(10)), ...extendFibonacciArray]
  const owner = 'Ali'

  return (
    <div className="container game-page">
      <div className="invite-area">
        <Button>Invite players</Button>
      </div>

      <PokerDesk>
        <p>Pick your cards!</p>
        {/* <Button>Reveal Cards</Button> */}
        {/* <Button>Start new voting</Button> */}
      </PokerDesk>
      <div className="selected-card-area">
        <PockerCard className="back-side" owner={owner}></PockerCard>
      </div>
      <div className="cards-wrapper">
        {cards.map((item: number | string) => (
          <PockerCard key={item}>{item}</PockerCard>
        ))}
      </div>
    </div>
  )
}

export default Game
