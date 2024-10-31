import React, {useRef, useState, useEffect} from 'react';

function Stream() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(.5);
    const ctx = useRef(null);
    const volumeGainRef = useRef(null);
    const waveformGainRef = useRef(null);
    const sourceNode = useRef(null);
    const analyser = useRef(null);

    useEffect(() => {
        if (audioRef.current) {

            if (!ctx.current) {
                ctx.current = new (window.AudioContext || window.webkitAudioContext)();
                volumeGainRef.current = ctx.current.createGain();
                waveformGainRef.current = ctx.current.createGain();
                waveformGainRef.current.gain.value = 5;
            }

            audioRef.current.crossOrigin = "anonymous";

            if (!sourceNode.current) {
                sourceNode.current = ctx.current.createMediaElementSource(audioRef.current);
                sourceNode.current.connect(volumeGainRef.current).connect(ctx.current.destination);
            }

            if (!analyser.current) {
                analyser.current = ctx.current.createAnalyser();
                analyser.current.fftSize = 256;
                analyser.current.smoothingTimeConstant = 0.5;
            }

            if (sourceNode.current && waveformGainRef.current && analyser.current) {
                sourceNode.current.connect(waveformGainRef.current).connect(analyser.current);
                drawWaveform(analyser.current);
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (volumeGainRef.current) {
            volumeGainRef.current.gain.value = volume; // Update gain node volume
        }
    }, [volume]);

    const handleTogglePlayState = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.load();
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
            <input type="range" min="0" max="2" step="0.01" value={volume} onChange={handleVolumeChange}/>
        </div>
    );
}

export default Stream;