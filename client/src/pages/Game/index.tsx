import { useState } from 'react'
import Button from '../../components/form/Button'
import PockerCard from '../../components/ui/PockerCard'
import PokerDesk from '../../components/ui/PokerDesk'
import {
  extendFibonacciArray,
  fibonacciArray,
} from '../../utils/fibonacciUtils'
import './game.scss'
import Modal from '../../components/ui/Modal'
import Input from '../../components/form/Input'

const Game = () => {
  interface ISelectedCard {
    point: string | number
    owner: string
  }

  const cards = [...new Set(fibonacciArray(10)), ...extendFibonacciArray]
  const owner = 'Ali'
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    point: '',
    owner,
  })
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isSelectNamePopupActive, setIsSelectNamePopupActive] = useState(true)

  console.log(selectedCard)

  return (
    <div className="container game-page">
      {isSelectNamePopupActive && (
        <Modal>
          <div className="select-name-popup">
            <h1>Choose your display name</h1>
            <Input placeholder="Your display name" type="text" />
            <Button
              onClickHandler={() => {
                setIsSelectNamePopupActive(false)
              }}
            >
              Continue to game
            </Button>
          </div>
        </Modal>
      )}

      <div className="invite-area">
        <Button>Invite players</Button>
      </div>

      <PokerDesk>
        {selectedCard.point === '' && <p>Pick your cards!</p>}

        {selectedCard.point !== '' && !isCardOpen && (
          <Button
            onClickHandler={() => {
              setIsCardOpen(true)
            }}
          >
            Reveal Cards
          </Button>
        )}

        {selectedCard.point !== '' && isCardOpen && (
          <Button
            onClickHandler={() => {
              setIsCardOpen(false)
              setSelectedCard({ ...selectedCard, point: '' })
            }}
          >
            Start new voting
          </Button>
        )}
      </PokerDesk>

      {selectedCard.point !== '' && (
        <div className="selected-card-area">
          <PockerCard
            className={isCardOpen ? 'selected' : 'back-side'}
            owner={selectedCard.owner}
          >
            {isCardOpen && selectedCard.point}
          </PockerCard>
        </div>
      )}
      <div className="cards-wrapper">
        {cards.map((item: number | string) => (
          <PockerCard
            key={item}
            className={
              selectedCard.point !== '' && item == selectedCard.point
                ? 'selected'
                : null
            }
            onClickHandler={() => {
              setSelectedCard({ ...selectedCard, point: item })
            }}
          >
            {item}
          </PockerCard>
        ))}
      </div>
    </div>
  )
}

export default Game
