import React, {useRef, useState, useEffect} from 'react';
import './Stream.css'

function Stream() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(.5);
    const [averageAmplitude, setAverageAmplitude] = useState(0);
    const ctx = useRef(null);
    const volumeGainRef = useRef(null);
    const waveformGainRef = useRef(null);
    const sourceNode = useRef(null);
    const analyser = useRef(null);

    const minDesiredAmplitude = 0.15;
    const maxDesiredAmplitude = 0.4;

    useEffect(() => {
        if (audioRef.current) {
            if (!ctx.current) {
                ctx.current = new (window.AudioContext || window.webkitAudioContext)();
                volumeGainRef.current = ctx.current.createGain();
                waveformGainRef.current = ctx.current.createGain();
                waveformGainRef.current.gain.value = 3;
            }

            audioRef.current.crossOrigin = "anonymous";

            if (!sourceNode.current) {
                sourceNode.current = ctx.current.createMediaElementSource(audioRef.current);
                sourceNode.current.connect(volumeGainRef.current).connect(ctx.current.destination);
            }

            if (!analyser.current) {
                analyser.current = ctx.current.createAnalyser();
                analyser.current.fftSize = 256;
                analyser.current.smoothingTimeConstant = 0.9;
            }

            if (sourceNode.current && waveformGainRef.current && analyser.current) {
                sourceNode.current.connect(volumeGainRef.current).connect(waveformGainRef.current).connect(analyser.current);
                drawWaveform(analyser.current);
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (volumeGainRef.current) {
            volumeGainRef.current.gain.value = volume; // Update gain node volume
        }
    }, [volume]);

    const handleTogglePlayState = async () => {
        if (audioRef.current) {
            if (ctx.current.state === 'suspended') {
                await ctx.current.resume();
            }

            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.load();
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };



function drawWaveform(analyser) {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let belowDesiredStartTime = null;
    let aboveDesiredStartTime = null;

    function draw() {
        requestAnimationFrame(draw);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;

        if (!isPlaying) {
            // Draw a horizontal line when paused
            canvasCtx.strokeStyle = 'rgba(155,40,221,0.71)';
            canvasCtx.lineWidth = barWidth;
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, canvas.height / 2);
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
            return;
        }

        analyser.getByteTimeDomainData(dataArray);
        let x = 0;
        let sum = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;
            const barHeight = Math.abs(y - canvas.height / 2) * 2;

            canvasCtx.fillStyle = 'rgb(155,40,221)';
            canvasCtx.fillRect(x, canvas.height / 2 - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
            sum += Math.abs(v - 1); // Calculate the amplitude
        }

        const avgAmplitude = sum / bufferLength;
        setAverageAmplitude(avgAmplitude);

        // Track the time when the average amplitude is below the desired amplitude
        if (avgAmplitude < minDesiredAmplitude) {
            if (!belowDesiredStartTime) {
                belowDesiredStartTime = Date.now();
            } else if (Date.now() - belowDesiredStartTime >= 15000) { // 15 sec
                console.log("adjusting gain")
                if (waveformGainRef.current) {
                    const gainValue = minDesiredAmplitude / avgAmplitude;
                    if (isFinite(gainValue)) {
                        const currentTime = ctx.current.currentTime;
                        waveformGainRef.current.gain.setValueAtTime(parseFloat(gainValue.toFixed(2)), currentTime + 0.1);
                    } else {
                        console.error("Invalid gain value:", gainValue);
                    }
                }
                belowDesiredStartTime = null; // Reset the timer
            }
        } else {
            belowDesiredStartTime = null; // Reset the timer if the average amplitude is above the desired amplitude
        }

        if (avgAmplitude > maxDesiredAmplitude) {
            if (!aboveDesiredStartTime) {
                aboveDesiredStartTime = Date.now();
            } else if (Date.now() - aboveDesiredStartTime >= 15000) { // 15 sec
                console.log("adjusting gain down");
                if (waveformGainRef.current) {
                    const gainValue = maxDesiredAmplitude / avgAmplitude;
                    if (isFinite(gainValue)) {
                        const currentTime = ctx.current.currentTime;
                        waveformGainRef.current.gain.setValueAtTime(parseFloat(gainValue.toFixed(2)), currentTime + 0.1);
                    } else {
                        console.error("Invalid gain value:", gainValue);
                    }
                }
                aboveDesiredStartTime = null; // Reset the timer
            }
        } else {
            aboveDesiredStartTime = null; // Reset the timer if the average amplitude is below the max desired amplitude
        }
    }

    draw();
}
    return (
        <div className={'d-flex justify-content-center'}>
            <div id="stream-box">
                <div className={'d-flex'}>
                    <audio id="stream" ref={audioRef} src="https://audio.wbar.org:8443/stream"
                           title="WBAR RADIO"></audio>
                    <div className={'text-white'}>LIVE</div>
                    <i className={`bi h3 ${isPlaying ? "bi-stop-circle-fill" : "bi-play-circle-fill"} text-white`}
                       onClick={handleTogglePlayState}/>
                    <canvas id="waveform-canvas" ref={canvasRef} width="100em" height="40em"></canvas>
                </div>
            </div>
        </div>
    );
}

export default Stream;