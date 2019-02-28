window.onload = function() {
    let c = document.querySelector("#switcher");
    let ctx = c.getContext("2d");

    let c_width = c.width;
    let c_height = c.height;

    let r = c_height / 2;

    // 内同心圆与外圆的间距
    let margin = 2;

    // 当前状态
    let status = c.getAttribute("status");

    let bg_on = c.getAttribute("on");
    let bg_off = c.getAttribute("off");

    if (status == "on")
        switch_on();
    else
        switch_off();

    // 响应单击时的开关切换事件
    c.onclick = function() {
        ctx.clearRect(0, 0, c_width, c_height);

        status = status == "on"? "off": "on";
        c.setAttribute("status", status);

        if (status == "on")
            switch_on();
        else
            switch_off();
    }

    function switch_on() {
        // 内同心圆的起始x坐标（初始值是r，往右侧移动，一直移动到c_width - r）
        let x = r;

        let handle = setInterval(function() {
            ctx.fillStyle = bg_on;
            // 绘制背景
            ctx.beginPath();
            ctx.arc(r, r, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(c_width - r, r, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillRect(r, 0, r * 2, r * 2);

            ctx.fillStyle = "white";
            // 开启状态的内圆在右边
            ctx.beginPath();
            ctx.arc(x, r, r - margin, 0, Math.PI * 2);
            ctx.fill();

            if (x == c_width - r)
                clearInterval(handle);
            else
                x ++;
        }, 20);
    }

    function switch_off() {
        // 内同心圆的起始x坐标（初始值是c_width - r，往左侧移动，一直移动到r）
        let x = c_width - r;

        let handle = setInterval(function() {
            ctx.fillStyle = bg_off;
            // 绘制背景
            ctx.beginPath();
            ctx.arc(r, r, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(c_width - r, r, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillRect(r, 0, r * 2, r * 2);

            ctx.fillStyle = "white";
            // 关闭状态的内圆在左边
            ctx.beginPath();
            ctx.arc(x, r, r - margin, 0, Math.PI * 2);
            ctx.fill();

            if (x == r)
                clearInterval(handle);
            else
                x --;
        }, 20);
    }
}