import { createContext, useContext } from 'react';
import useTokenData from "./TokenHook.js";
import React from "react";
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const { tokenData, isLoading } = useTokenData();

    return React.createElement(TokenContext.Provider,
        { value: { tokenData, isLoading } },
        children
    );
};

export const useToken = () => useContext(TokenContext);