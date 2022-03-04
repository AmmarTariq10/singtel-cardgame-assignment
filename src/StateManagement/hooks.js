import { useSelector } from "react-redux"

export const useCards = () => {
    const cards = useSelector(state => state.GeneralReducer.cards)
    return cards
}

export const useMoves = () => {
    const moves = useSelector(state => state.GeneralReducer.moves)
    return moves
}

export const useIsSelected = (card) => {
    const selectedCards = useSelector(state => state.GeneralReducer.selectedCards)
    console.log('selectedCardsselectedCardsselectedCards : ',selectedCards)
    const index = selectedCards.findIndex(cc => cc.id === card.id)
    return index > -1
}

export const useWillCompleteSet = (card) => {
    const selectedCards = useSelector(state => state.GeneralReducer.selectedCards)
    const index = selectedCards.findIndex(cc => cc.number === card.number)
    return index > -1
}

export const useIsComplete = (card) => {
    const completedCards = useSelector(state => state.GeneralReducer.completed)
    console.log('completedCardscompletedCards : ',completedCards)
    const index = completedCards.findIndex(cc => cc === card.number)
    return index > -1
}
export const useHasWon  = () => {
    const completedCards = useSelector(state => state.GeneralReducer.completed)
    if(completedCards.length > 5) {
        return true
    }
    return false
}