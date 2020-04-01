import { CONSTANTS } from "../action";

let listID = 2;
let cardID = 5;

const initialState = [
    {
        title: "First Line",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "line 1 data 1"
            },
            {
                id: `card-${1}`,
                text: "line 1 data 2"
            },
            {
                id: `card-${2}`,
                text: "line 2 data 3"
            }
        ]
    },
    {
        title: "Second Line",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${3}`,
                text: "line 2 data 1"
            },
            {
                id: `card-${4}`,
                text: "line 2 data 2"
            }
        ]
    }
]




const listsReducer = (state = initialState, action) => {
    switch (action.type) {


        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `list-${cardID}`
            }
            cardID += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                }
                else {
                    return list
                }
            });
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                draggableId
            } = action.payload;
            const newState = [...state];
            // in same list

            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            //in other list
            if (droppableIdStart !== droppableIdEnd) {
                //find the list where drag happened
                const listStart = state.find(list => droppableIdStart === list.id)
                //pull out the card from list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find the list where drag end
                const listEnd = state.find(list => droppableIdEnd === list.id);
                //put card in new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState

        default:
            return state;
    }
};
export default listsReducer;