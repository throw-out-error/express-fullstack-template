import React from "react";
import "./Header.css";

export function Header({ title = "My App" }) {
    return (
        <header>
            <h1>
                <a href="/">{title}</a>
            </h1>
        </header>
    );
}
