import React from 'react'

function Stream() {
    return (<>
            <div className={'d-flex w-100 justify-content-center'}>
                <audio id={"stream"} controls="controls"
                       src="https://audio.wbar.org:8443/stream" title="WBAR RADIO"></audio>
            </div>
        </>
    )
}

export default Stream