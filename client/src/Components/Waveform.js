import React, { useRef, useEffect } from 'react';

function Waveform({ isPlaying, analyser, gainNode, minDesiredAmplitude, maxDesiredAmplitude, setAverageAmplitude }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = Math.max(window.innerWidth / 12, 30);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial width

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (analyser) {
            drawWaveform(analyser);
        }
    }, [isPlaying, analyser]);

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

        //     const avgAmplitude = sum / bufferLength;
        //     setAverageAmplitude(avgAmplitude);
        //
        //     // Track the time when the average amplitude is below the desired amplitude
        //     if (avgAmplitude < minDesiredAmplitude) {
        //         if (!belowDesiredStartTime) {
        //             belowDesiredStartTime = Date.now();
        //         } else if (Date.now() - belowDesiredStartTime >= 15000) { // 15 sec
        //             console.log("adjusting gain")
        //             if (gainNode) {
        //                 const gainValue = minDesiredAmplitude / avgAmplitude;
        //                 if (isFinite(gainValue)) {
        //                     const currentTime = gainNode.context.currentTime;
        //                     gainNode.gain.setValueAtTime(parseFloat(gainValue.toFixed(2)), currentTime + 0.1);
        //                 } else {
        //                     console.error("Invalid gain value:", gainValue);
        //                 }
        //             }
        //             belowDesiredStartTime = null; // Reset the timer
        //         }
        //     } else {
        //         belowDesiredStartTime = null; // Reset the timer if the average amplitude is above the desired amplitude
        //     }
        //
        //     if (avgAmplitude > maxDesiredAmplitude) {
        //         if (!aboveDesiredStartTime) {
        //             aboveDesiredStartTime = Date.now();
        //         } else if (Date.now() - aboveDesiredStartTime >= 15000) { // 15 sec
        //             console.log("adjusting gain down");
        //             if (gainNode) {
        //                 const gainValue = maxDesiredAmplitude / avgAmplitude;
        //                 if (isFinite(gainValue)) {
        //                     const currentTime = gainNode.context.currentTime;
        //                     gainNode.gain.setValueAtTime(parseFloat(gainValue.toFixed(2)), currentTime + 0.1);
        //                 } else {
        //                     console.error("Invalid gain value:", gainValue);
        //                 }
        //             }
        //             aboveDesiredStartTime = null; // Reset the timer
        //         }
        //     } else {
        //         aboveDesiredStartTime = null; // Reset the timer if the average amplitude is below the max desired amplitude
        //     }
        }

        draw();
    }

    return <canvas id="waveform-canvas" ref={canvasRef} height="40em"></canvas>;
}

export default Waveform;