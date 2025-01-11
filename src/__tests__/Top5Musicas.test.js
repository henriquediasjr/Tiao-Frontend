import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Top5Musicas from "../components/Top5Musicas";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Top5Musicas Component", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        jest.spyOn(console, "error").mockImplementation(() => { }); // Suppress console.error logs
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test("renders loading state initially", () => {
        render(<Top5Musicas />);
        expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    });

    test("renders top 5 songs after fetching", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: [
                    {
                        youtube_id: "123abc",
                        titulo: "Song 1",
                        visualizacoes: 1000,
                        thumb: "https://via.placeholder.com/150",
                    },
                    {
                        youtube_id: "456def",
                        titulo: "Song 2",
                        visualizacoes: 2000,
                        thumb: "https://via.placeholder.com/150",
                    },
                ],
            })
        );

        await act(async () => {
            render(<Top5Musicas />);
        });

        await waitFor(() => {
            expect(screen.getAllByRole("link").length).toBe(2);
            expect(screen.getByText(/song 1/i)).toBeInTheDocument();
        });
    });

    test("handles empty songs response", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

        await act(async () => {
            render(<Top5Musicas />);
        });

        await waitFor(() => {
            expect(screen.getByText(/nenhuma música cadastrada ainda/i)).toBeInTheDocument();
        });
    });

    test("handles fetch error gracefully", async () => {
        fetchMock.mockReject(() => Promise.reject("API Error"));

        await act(async () => {
            render(<Top5Musicas />);
        });

        await waitFor(() => {
            expect(screen.getByText(/nenhuma música cadastrada ainda/i)).toBeInTheDocument();
        });
    });
});
