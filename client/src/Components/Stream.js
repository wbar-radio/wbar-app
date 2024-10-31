import React, { useRef, useState, useEffect } from 'react';

function Stream() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const streamOffset = 2;
    const ctx = new AudioContext();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.crossOrigin = "anonymous"; // Set crossOrigin attribute
            const source = ctx.createMediaElementSource(audioRef.current);
            drawWaveform(ctx, source);
        }
    }, [audioRef]);

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

    function drawWaveform(audioContext, audioSource) {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        // Create an analyser node
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Reduce fftSize for smoother waveform
        analyser.smoothingTimeConstant = 0.5; // Apply smoothing
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Connect the audio source to the analyser
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        // Function to draw the waveform
        function draw() {
            requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;
                const barHeight = Math.abs(y - canvas.height / 2) * 2; // Calculate bar height

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
        </div>
    );
}

export default Stream;