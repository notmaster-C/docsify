/*
 *
 * Copyright (c) 2014-2018 Daniele Lenares (https://github.com/dnlnrs)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 1.1.3
 *
 */
/**
 * Animate the input object
 *
 * @param $obj
 * @param type
 * @param animation
 */
function do_animation($obj, type, animation) {
    if (type === 'show') {
        switch (animation) {
            case 'fade':
                $obj.fadeIn();
                break;

            case 'slide':
                $obj.slideDown();
                break;

            default:
                $obj.fadeIn();
        }
    } else {
        switch (animation) {
            case 'fade':
                $obj.fadeOut();
                break;

            case 'slide':
                $obj.slideUp();
                break;

            default:
                $obj.fadeOut();
        }
    }
}

function toTop_event($obj, speed) {
    var not_clicked = true;
    $obj.on('click', function () {
        if (not_clicked === true) {
            not_clicked = false;
            $('html, body').animate({ scrollTop: 0 }, speed, function () {
                not_clicked = true;
            });
        }
    });
}
function main(hook, vm) {

    /* Default Params */
    let params = {
        location: 'right',
        locationOffset: 20,
        containerClass: 'tool-container',
        defaultTheme: 'light',
        containerStyle: {
            position: 'fixed',
            // background: 'red',
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            display: 'none',
            'z-index': 99,
            bottom: 10,
            right: 20
        },
        arrowClass: 'tool-arrow',
        arrowStyle: {
            width: '20px',
            height: '20px',
            transform: 'rotate(-45deg)',
            'border-width': '5px 5px 0 0',
            'border-color': 'green',
            'border-style': 'solid',
        },
        themeClass: 'tool-theme',
        themeStyle: {
            public: {
                width: '20px',
                height: '20px',
                margin:'20px auto',
                text: 'asd',
                transition: 'all 0.8s',
                'border-radius': '50%',
            },
            dark: {
                'background-color': 'white',
                accent: "#42b983",
                toogleBackground: "#ffffff",
                background: "#091a28",
                textColor: "#b4b4b4",
                codeTextColor: "#ffffff",
                codeBackgroundColor: "#0e2233",
                borderColor: "#0d2538",
                blockQuoteColor: "#858585",
                highlightColor: "#d22778",
                sidebarSublink: "#b4b4b4",
                codeTypeColor: "#ffffff",
                coverBackground: "linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%,hsl(181, 100%, 85%) 100%)",
            },
            light: {
                'background-color': 'black',
                accent: "#42b983",
                toogleBackground: "#091a28",
                background: "#ffffff",
                textColor: "#34495e",
                codeTextColor: "#525252",
                codeBackgroundColor: "#f8f8f8",
                borderColor: "rgba(0, 0, 0, 0.07)",
                blockQuoteColor: "#858585",
                highlightColor: "#d22778",
                sidebarSublink: "#505d6b",
                codeTypeColor: "#091a28",
                coverBackground: "linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%,hsl(181, 100%, 85%) 100%)",
            }
        },
        alwaysVisible: true,
        trigger: 500,
        entryAnimation: 'fade',
        toolSpeed: 'slow',
        hideUnderWidth: 0,
    };
    //用户自定义参数配置
    if (vm.config.hasOwnProperty("ccTool")) {
        if (vm.config.ccTool.hasOwnProperty("themeStyle")) {         // 新增的 参数 赋给 params
            // for (var [r, l] of Object.entries(o.config.ccTool.themeStyle)) 
            //     "light" !== r && "dark" !== r && "defaultTheme" !== r && (params[r] = l); 
            //     // 参数 渲染到dom
            // for (var [r, l] of Object.entries(params.themeStyle)) 
            //     "light" !== r && "dark" !== r && (params[r] = l, document.documentElement.style.setProperty("--" + r, l)); 
            // 深浅色切换的自定义参数修改默认参数
            if (vm.config.ccTool.themeStyle.hasOwnProperty("dark"))
                for (var [r, l] of Object.entries(vm.config.ccTool.themeStyle.dark))
                    params.themeStyle.dark[r] = l;
            if (vm.config.ccTool.themeStyle.hasOwnProperty("light"))
                for (var [r, l] of Object.entries(vm.config.ccTool.themeStyle.light))
                    params.themeStyle.light[r] = l
        }
        if (vm.config.ccTool.hasOwnProperty("containerStyle")) {
            for (var [r, l] of Object.entries(vm.config.ccTool.containerStyle))
                params.containerStyle[r] = l;
        }
        if (vm.config.ccTool.hasOwnProperty("arrowStyle")) {
            for (var [r, l] of Object.entries(vm.config.ccTool.arrowStyle))
                params.arrowStyle[r] = l;
        }
    }

    /* Create required elements */
    var $body = $('body');
    var $window = $(window);

    var $container = $('<div>');
    $container.addClass(params.containerClass);

    var $arrow = $('<div>');
    $arrow.addClass(params.arrowClass);

    var $theme = $('<div>');
    $theme.addClass(params.themeClass);

    $container.css(params.containerStyle);
    $arrow.css(params.arrowStyle);
    $theme.css(params.themeStyle.public);
    "light" === params.defaultTheme ? $theme.css(params.themeStyle.light) : $theme.css(params.themeStyle.dark);

    $container.append($theme);
    $container.append($arrow);
    $body.append($container);
    do_animation($container, 'show', params.entryAnimation);
    // 切换主题的匿名函数
    var d = e => {
        window.matchMedia("(prefers-color-scheme: dark)").matches ? params.defaultTheme = "dark" : window.matchMedia("(prefers-color-scheme: light)").matches && (params.defaultTheme = "light");
        if (localStorage.setItem("DARK_LIGHT_THEME", e), params.defaultTheme = e, "light" == e)
            for (var [o, r] of Object.entries(params.themeStyle.light)) document.documentElement.style.setProperty("--" + o, r);
        else if ("dark" == e)
            for (var [o, r] of Object.entries(params.themeStyle.dark)) document.documentElement.style.setProperty("--" + o, r);


    };
    d('dark')
    // 添加元素
    hook.afterEach((function (html, next) {
        // 解析成 html 后调用。
        // beforeEach 和 afterEach 支持处理异步逻辑
        // ...
        // 异步处理完成后调用 next(html) 返回结果
        //没有这一步页面会空白
        next(html)
        //     // $container.append($arrow);
        //     // $container.append($theme);
        //     // $body.append($container);
    }))
    //绑定点击事件
    hook.doneEach((function () {
        // 每次路由切换时数据全部加载完成后调用，没有参数。
        let t = localStorage.getItem("DARK_LIGHT_THEME");
        "light" == t || "dark" == t ? (params.defaultTheme = t, d(params.defaultTheme)) : d(params.defaultTheme);
        $theme.on("click", function () {
            "light" === params.defaultTheme ? (d("dark"), $theme.css(params.themeStyle.light)) : (d("light"), $theme.css(params.themeStyle.dark))
        })


        toTop_event($arrow, params.toolSpeed);

        /* params.trigger show event */
        if (!params.alwaysVisible) {
            $window.scroll(function () {
                if ($window.scrollTop() >= params.trigger) {
                    do_animation($container, 'show', params.entryAnimation);
                } else {
                    do_animation($container, 'hide', params.entryAnimation);
                }
            });
        } else {
            do_animation($container, 'show', params.entryAnimation);
        }
        /* If i load the page and the scroll is over the trigger, i don't have immediately the event 'scroll' */
        if ($window.scrollTop() >= params.trigger) {
            do_animation($container, 'show', params.entryAnimation);

        }
    }))

}
window.$docsify.plugins = window.$docsify.plugins.concat(main)