import React from 'react';
import { render, screen, act } from "@testing-library/react";
import Header from "../components/Header";

// Mock the image import or static assets
jest.mock('../assets/images/tiao-carreiro-pardinho.png', () => "test-file-stub");

test("renders header with image", async () => {
    await act(async () => {
        render(<Header />);
    });

    expect(screen.getByAltText("Tião Carreiro")).toBeInTheDocument();
});
