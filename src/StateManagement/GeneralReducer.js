import actionTypes from "./actionTypes"
import { createCards } from '../HelperFunctions'
const initialState = {
    cards: createCards(),
    moves: 0,
    selectedCards: [],
    completed: []
}
const GeneralReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.addMove: {
            return {
                ...state,
                moves: state.moves + 1
            }
        }
        case actionTypes.selectCard: {
            var cards = state.selectedCards
            cards = cards.concat([action.card])
            return {
                ...state,
                selectedCards: cards,
                moves: state.moves + 1
            }
        }
        case actionTypes.unSelectFirst: {
            var selectCards = state.selectedCards
            if (selectCards.length > 1) {
                selectCards.shift()
            }
            return {
                ...state,
                selectedCards: selectCards
            }
        }
        case actionTypes.unSelectCard: {
            return {
                ...state,
                selectedCards: state.selectedCards.filter(item => item.id !== action.card.id)
            }
        }
        case actionTypes.markComplete: {
            var selectedCards = state.selectedCards
            selectedCards = selectedCards.filter(item => item.number !== action.card.number)
            return {
                ...state,
                selectedCards:selectedCards,
                completed: state.completed.concat([action.card.number])
            }
        }
        case actionTypes.reset: {
            return {
                ...initialState,
                cards: createCards()
            }
        }
        default: {
            return state
        }
    }
}
export default GeneralReducer