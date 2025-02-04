
/*
*1 1 2 3 5 8 13 21 34 55 89 144
*/

window.onload = function() {
    const canvas = document.getElementById('fibonacciCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    function drawFibonacciSpiral(ctx, centerX, centerY, scale) {
        let a = 0;
        let b = 1;
        let angle = 0;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        for (let i = 0; i < 12; i++) {
            const next = a + b;
            a = b;
            b = next;

            const radius = scale * b;
            angle += Math.PI / 2;

            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            ctx.arc(centerX, centerY, radius, angle - Math.PI / 2, angle, false);
            ctx.moveTo(x, y);

            centerX = x;
            centerY = y;
        }

        ctx.stroke();
    }

    drawFibonacciSpiral(ctx, centerX, centerY, 10);
}
