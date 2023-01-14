import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { GREEN, BLUE, DARK_BLUE, ORANGE, WHITE, YELLOW, PINK } from '../../constants/colors';


function RoomStats() {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('room.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const updateChartData = () => {
        return ({
            labels: [...data.map(entry => entry["players"])],
            label: "Number of Players",
            datasets: [
                {
                    data: [...data.map(entry => entry["rooms"])],
                    backgroundColor: [
                        GREEN,
                        DARK_BLUE,
                        BLUE,
                        YELLOW,
                        ORANGE,
                        PINK
                      ],
                    label: "Number of rooms"
                }
            ]
        })
    }

    const updateOptions = () => {
        return ({
            plugins: {
                title: {
                    display: true,
                    text: ["Number of rooms", "per number of players"],
                    color: WHITE,
                    font: {
                        size: 20,
                    },

                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            let size = parseInt(context.at(0).label);
                            return [`Number of players: ${size}`];
                        }
                    },
                    bodyColor: WHITE
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Number of rooms",
                        color: WHITE,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        color: WHITE,
                        font: {
                            size: 15
                        },
                        precision: 0,

                    },
                    grid: {
                        color: WHITE,
                        borderWidth: 0
                    },
                    min: 0,
                    sugestedMax: Math.max(...data.map(entry => entry["rooms"])),
                },
                x: {
                    title: {
                        display: true,
                        text: "Number of players",
                        color: WHITE,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        color: WHITE,
                        font: {
                            size: 15
                        }
                    },
                    grid: {
                        display: false,
                    }
                }
            }
        })
    }
    const [chartData, setChartData] = useState(updateChartData());
    const [chartOptions, setChartOptions] = useState(updateOptions());
    useEffect(() => {
        setChartData(updateChartData());
        setChartOptions(updateOptions);
        // eslint-disable-next-line 
    }, [data])

    return (
        <div style={{ position: "relative", height: "40vh", width: "95vw" }}>
            {data.length !== 0 ? <Bar
                data={chartData}
                options={chartOptions}
            /> : "Play Picto to generate stats"}
        </div>
    );
}

export default RoomStats;