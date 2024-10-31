import React, { useRef, useState, useEffect } from 'react';

function Stream() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(.5);
    const streamOffset = 2;
    const ctx = useRef(new AudioContext());
    const gainNode = useRef(ctx.current.createGain());

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.crossOrigin = "anonymous";
            const source = ctx.current.createMediaElementSource(audioRef.current);
            const analyser = ctx.current.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.5;

            source.connect(gainNode.current);
            gainNode.current.connect(analyser);
            analyser.connect(ctx.current.destination);

            drawWaveform(analyser);
        }
    }, [audioRef, isPlaying]);

    useEffect(() => {
        gainNode.current.gain.value = volume; // Update gain node volume
    }, [volume]);

    const handleTogglePlayState = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            if (isFinite(audioRef.current.duration)) {
                audioRef.current.currentTime = Math.max(0, audioRef.current.duration - streamOffset);
            }
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    function drawWaveform(analyser) {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            requestAnimationFrame(draw);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;

            if (!isPlaying) {
                // Draw a horizontal line when paused
                canvasCtx.strokeStyle = 'rgba(155,40,221,0.38)';
                canvasCtx.lineWidth = barWidth;
                canvasCtx.beginPath();
                canvasCtx.moveTo(0, canvas.height / 2);
                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
                return;
            }

            analyser.getByteTimeDomainData(dataArray);

            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;
                const barHeight = Math.abs(y - canvas.height / 2) * 2;

                canvasCtx.fillStyle = 'rgb(155,40,221)';
                canvasCtx.fillRect(x, canvas.height / 2 - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        draw();
    }

    return (
        <div className="d-flex w-100 align-content-center justify-content-center">
            <audio id="stream" ref={audioRef} src="https://audio.wbar.org:8443/stream" title="WBAR RADIO"></audio>
            <i className={`bi h4 ${isPlaying ? "bi-stop-fill" : "bi-play-fill"} text-white`}
               onClick={handleTogglePlayState}/>
            <canvas id="waveformCanvas" ref={canvasRef} width="100em" height="40"></canvas>
            <input type="range" min="0" max="2" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
}

export default Stream;