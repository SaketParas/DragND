import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
        background-color: #dfe3e6;
        border-radius: 3px;
        width: 250 px;
        padding: 8px;
        height: 100%;
        margin: 8px;
`;

const TrelloList = ({ title, cards, listID, index }) => {
    return (
        <Droppable droppableId={String(listID)}>
            {provided => (
                <ListContainer
                {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <h5>{title}</h5>
                    {cards.map((card, index) => (
                        <TrelloCard key={card.id} index={index} text={card.text} id={card.id} />
                    ))}
                    <TrelloActionButton listID={listID} />
                    {provided.placeholder}
                </ListContainer>
            )}

        </Droppable>
    );
};

// const styles = {
//     container: {
//         backgroundColor: "#dfe3e6",
//         borderRadius: 3,
//         width: 250,
//         padding: 8,
//         height: "100%",
//         margin: 8,

//     }
// }

export default TrelloList
