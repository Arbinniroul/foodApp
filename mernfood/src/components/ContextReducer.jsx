import React, { createContext, useReducer, useContext } from 'react';

// Create Contexts for Cart State and Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Cart Reducer Function
const reducer = (state, action) => {
    switch(action.type) {
        case "ADD": {
            const existingFoodIndex = state.findIndex(item => item.id === action.id && item.size === action.size);
            if (existingFoodIndex !== -1) {
                // Update quantity and price if the item already exists with the same size
                const updatedState = [...state];
                updatedState[existingFoodIndex].qty += action.qty;
                updatedState[existingFoodIndex].price += action.price;
                return updatedState;
            }
            // Add new food item to the cart
            return [...state, {
                id: action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                price: action.price,
                img: action.img
            }];
        }

        case "REMOVE": {
            // Remove item from the cart by index
            const newState = state.filter((_, index) => index !== action.index);
            return newState;
        }

        case "DROP": {
           let empArray=[]
            return  empArray;
        }

        case "UPDATE": {
            // Update item quantity and price
            const updatedState = state.map(item => 
                item.id === action.id && item.size === action.size 
                ? { ...item, qty: item.qty + action.qty, price: item.price + action.price }
                : item
            );
            return updatedState;
        }

        default:
            return state; // Return current state if action is unrecognized
    }
};

// CartProvider to wrap the application with state and dispatch
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []); // Initial state is an empty array
    
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for using Cart State and Dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
