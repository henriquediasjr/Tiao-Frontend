import React from "react"; // Ensure React is imported
import { render, screen, fireEvent } from "@testing-library/react";
import SugerirMusica from "../components/SugerirMusica";

describe("SugerirMusica Component", () => {
    test("renders the form correctly", () => {
        render(<SugerirMusica />);

        expect(screen.getByText("Sugerir Nova Música")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Cole aqui o link do YouTube")).toBeInTheDocument();
        expect(screen.getByText("Enviar Link")).toBeInTheDocument();
    });

    test("submits a valid YouTube link successfully", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: "Sugestão enviada com sucesso!", success: true }),
            })
        );

        render(<SugerirMusica />);

        const input = screen.getByPlaceholderText("Cole aqui o link do YouTube");
        const button = screen.getByText("Enviar Link");

        fireEvent.change(input, { target: { value: "https://www.youtube.com/watch?v=test" } });
        fireEvent.click(button);

        const successMessage = await screen.findByText("Sugestão enviada com sucesso!");
        expect(successMessage).toBeInTheDocument();
        expect(successMessage).toHaveClass("success");
    });

    test("shows error message on network failure", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

        render(<SugerirMusica />);

        const input = screen.getByPlaceholderText("Cole aqui o link do YouTube");
        const button = screen.getByText("Enviar Link");

        fireEvent.change(input, { target: { value: "https://www.youtube.com/watch?v=test" } });
        fireEvent.click(button);

        const errorMessage = await screen.findByText("Erro ao enviar o link");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass("error");
    });
});
