import React from 'react'

function StickyStream() {
    return (<>
            <div>
                <audio id={"stream"} style={{width: "100%", borderRadius: 0}} controls="controls"
                       src="https://audio.wbar.org:8443/stream" title="WBAR RADIO"></audio>
            </div>
        </>
    )
}

export default StickyStream