import { useState, useContext, useRef, useEffect } from 'react'
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
import { SocketContext } from '../../context/SocketContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { copyUrlToClipboard } from '../../utils/common'

const Game = () => {
  interface ISelectedCard {
    point: string | number
    owner: string
  }
  const socket = useContext(SocketContext)
  const location = useLocation()
  const navigate = useNavigate()

  const cards = [...new Set(fibonacciArray(10)), ...extendFibonacciArray]
  const [owner, setOwner] = useState('')
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    point: '',
    owner,
  })
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isSelectNamePopupActive, setIsSelectNamePopupActive] =
    useState<boolean>(true)
  const [isInvitePopupActive, setIsInvitePopupActive] = useState<boolean>(false)
  const [votedCards, setVotedCards] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>()

  const gameRoom = location.pathname.split('game/')[1]

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setOwner(storedUsername)
      setSelectedCard({ ...selectedCard, owner: storedUsername })
      setIsSelectNamePopupActive(false)

      socket.emit('join', {
        room: gameRoom,
        name: storedUsername,
      })
    } else {
      setIsSelectNamePopupActive(true)
    }
  }, [])

  useEffect(() => {
    socket.on('sendedCards', (card) => {
      setVotedCards(votedCards.concat(card))
    })

    socket.on('endGame', () => {
      setIsCardOpen(false)
      setSelectedCard({ ...selectedCard, point: '' })
      setVotedCards([])
    })

    socket.on('revealCard', () => {
      setIsCardOpen(true)
    })
  }, [socket])

  const startGame = () => {
    if (inputRef.current?.value.trim()) {
      localStorage.setItem('username', inputRef.current?.value.trim())
      setIsSelectNamePopupActive(false)
      setOwner(inputRef.current?.value.trim())

      socket.emit('join', {
        room: gameRoom,
        name: owner,
      })
    }
  }

  const finishGame = () => {
    socket.emit('endGame')
  }

  const sendCard = (point: string | number) => {
    setSelectedCard({ ...selectedCard, point })
    socket.emit('sendCard', { ...selectedCard, point, owner })
  }

  const revealCards = () => {
    socket.emit('revealCard')
  }

  const inviteFriends = () => {
    copyUrlToClipboard(window.location.href)
    setIsInvitePopupActive(true)
  }

  const logout = () => {
    localStorage.removeItem('username')
    navigate('/')
  }

  const calculateDeskContent = () => {
    if (votedCards.length > 0 && isCardOpen) {
      return (
        <Button
          onClickHandler={() => {
            finishGame()
          }}
        >
          Start new voting
        </Button>
      )
    }
    if (votedCards.length > 0 && !isCardOpen) {
      return (
        <Button
          onClickHandler={() => {
            revealCards()
          }}
        >
          Reveal Cards
        </Button>
      )
    }

    return <p>Pick your cards!</p>
  }

  return (
    <div className="container game-page">
      {isSelectNamePopupActive && (
        <Modal>
          <div className="select-name-popup">
            <h1>Choose your display name</h1>
            <Input
              placeholder="Your display name"
              type="text"
              refs={inputRef}
            />
            <Button onClickHandler={startGame}>Continue to game</Button>
          </div>
        </Modal>
      )}

      {isInvitePopupActive && (
        <Modal>
          <div className="select-name-popup">
            <h1>
              The link address has been copied. Send to players to invite.
            </h1>
            <Input
              placeholder={window.location.href}
              type="text"
              refs={inputRef}
              readOnly
            />
            <Button onClickHandler={() => setIsInvitePopupActive(false)}>
              Close the pop-up
            </Button>
          </div>
        </Modal>
      )}

      <div className="button-area">
        <Button onClickHandler={() => inviteFriends()}>Invite players</Button>
        <Button onClickHandler={() => logout()}>Log Out </Button>
      </div>

      <PokerDesk>{calculateDeskContent()}</PokerDesk>

      {votedCards.length > 0 && (
        <div className="selected-card-area">
          {votedCards.map((item, index) => (
            <PockerCard
              className={isCardOpen ? 'selected' : 'back-side'}
              owner={item.owner}
              key={index}
            >
              {isCardOpen && item.point}
            </PockerCard>
          ))}
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
              sendCard(item)
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
