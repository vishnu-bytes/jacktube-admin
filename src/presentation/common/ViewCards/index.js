import React from 'react';
import { RowContainer } from "./style.js"
const ViewCards = ({ label, value }) => {
    return (
        <RowContainer>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </RowContainer>


    );
};

export default ViewCards;