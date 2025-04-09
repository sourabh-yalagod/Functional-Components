import React, { useState } from 'react'

const VirtualList = ({ list, height, width, listHeight }) => {
    const [range, setRange] = useState([0, Math.floor(height / listHeight)])
    const [top, setTop] = useState(0)

    const visibleList = list.slice(range[0], range[1] + 1)

    const handleScroll = (e) => {
        const { scrollTop } = e.target
        const startIndex = Math.floor(scrollTop / listHeight)
        const endIndex = startIndex + Math.floor(height / listHeight)
        setRange([startIndex, endIndex])
        setTop(scrollTop)
    }

    return (
        <div
            onScroll={handleScroll}
            className="virtual-container"
            style={{ height, width }}
        >
            <div    
                className="virtual-inner"
                style={{ height: list.length * listHeight, paddingTop: top }}
            >
                {visibleList.map((item) => (
                    <div
                        key={item.id}
                        className="virtual-item"
                        style={{ height: listHeight }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VirtualList
