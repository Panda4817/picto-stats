import React, { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import ReactTooltip from 'react-tooltip';

const customRenderer = (tag, size, color) => {
    const { className, style, ...props } = tag.props || {}
    const key = tag.key || tag.value
    const fontSize = size + 'px'
    const tagStyle = { ...styles, color, fontSize, ...style }
    return (
        <>
            <span key={key} style={tagStyle} className="tag-cloud-tag" data-tip={tag.count} {...props}>
                {tag.value}
            </span>
            <ReactTooltip />
        </>
    )
}

const styles = {
    margin: '0px 3px',
    verticalAlign: 'middle',
    display: 'inline-block',
}

function RoomStats() {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('room.json'
            , {
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

    return (
        <TagCloud
            minSize={12}
            maxSize={75}
            tags={data}
            shuffle={true}
            randomSeed={true}
            colorOptions={{
                luminosity: 'light'
            }}
            renderer={customRenderer}
        />
    );
}

export default RoomStats;