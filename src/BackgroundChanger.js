import React, { useState, useEffect } from 'react';
import pyf from "./pyf.jpg";
import {motion} from "framer-motion";
import './App.css';

const BackgroundChanger = () => {
    // Array of colors to cycle through
    const colors = ['red', 'yellow', 'blue'];
    // State to hold the current color index
    const [colorIndex, setColorIndex] = useState(0);
    // State to manage whether the color should be changing
    const [isChanging, setIsChanging] = useState(false);
    const [rotate, setRotate] = React.useState(false)
    const onTap = _ => {
        setRotate(!rotate)
    }
    useEffect(() => {
        let intervalId;
        if (isChanging) {
            // Set up the interval to change color when isChanging is true
            intervalId = setInterval(() => {
                setColorIndex(current => (current + 1) % colors.length);
            }, 60000 / 116);
        }

        // Cleanup function to clear the interval when isChanging is false or component unmounts
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isChanging]); // Effect depends on isChanging state

    // Update the body's background color
    useEffect(() => {
        document.body.style.backgroundColor = colors[colorIndex];
    }, [colorIndex]); // This effect runs every time colorIndex changes

    const toggleChanging = () => {
        // When starting, reset the color index to 0 (red)
        if (!isChanging) {
            setColorIndex(0);
        }
        setIsChanging(!isChanging);
    };

    return (
        <div className="center-container">
            <button onClick={toggleChanging} className="color-change-button">
                {isChanging ? 'Stop Changing Colors' : 'Start Changing Colors'}
            </button>
        </div>
    );
};

export default BackgroundChanger;