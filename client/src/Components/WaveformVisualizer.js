/*
 *  This component is a work in progress and is not yet functional.
 */


import React, {useEffect, useRef} from 'react';

const WaveformVisualizer = () => {
    const canvasRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        const draw = () => {
            requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        const setupAudio = () => {
            const audioElement = audioRef.current;
            audioElement.crossOrigin = "anonymous"; // Set crossOrigin attribute
            const source = audioCtx.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            draw();
        };

        setupAudio();

        return () => {
            audioCtx.close();
        };
    }, []);

    return (
        <div>
            <audio ref={audioRef} src="https://audio.wbar.org:8443/stream" controls crossOrigin="anonymous"></audio>
            <canvas ref={canvasRef} width="600" height="200"></canvas>
        </div>
    );
};

export default WaveformVisualizer;