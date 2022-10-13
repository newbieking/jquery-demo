;$(()=>{
// 1. 选择元素
// 2. 事件
    $(".btn").mouseenter(()=>{
        console.log("btn clicked!");
    })
    $(".btn").mouseenter(()=>{
        $(".btn").css("background-color", "steelblue")
    })
    $(".btn").mouseleave(()=>{
        $(".btn").css("background-color", "white")
    })
// 3. css
    $(".btn").css("background-color", "white")
    // class attr
    // $(".btn").removeClass("btn")
    // $(".btn").addClass("btn")
    // $(".btn").toggleClass("btn")
    // $(".btn").toggleClass("btn")
    console.log($(".btn").attr("class"))
// 4. 增删元素 append prepend after before
    $("body").append("<h1>Some Text...<br/><a href='javascript:void(0)'>a link</a></h1>")
    $("body").find("h1 a").remove()

// 5. 元素内容text html val
    console.log($("html").html());
    console.log($(".btn").text());
    console.log($(".input").val());
    // reset text html val
    $(".btn").html("<a href='javascript:void(0)'>按钮</a>")
    $(".input").val("new value")
    $(".btn a").text("新按钮")
// 6. 遍历
    // api：parents children find siblings next first last eq filter not 
    // 使用jquery api得到jquery对象，下标直接得到html标签（武功全废）
    //
// 7. ajax (async js and xml)
    var cur = 0
    var list = []
    var isPause = false
    const miniVideo_api = "https://api.apiopen.top/api/getMiniVideo"
    loadList()
    function loadList() {
        $.ajax({
            type: "get",
            url: miniVideo_api,
            dataType: "json",
            success: function(json){
                // console.log(json);
                list = json.result.list
                renderPlay(list[0].playurl)
                cur = 0
            },
            error: function(){
                alert('fail');
            }
        });
    }

    function renderPlay(playurl){
        let ht = `<div class='play-item'><video autoplay controls width="300px" height="527px" src=${playurl}></video></div>`
        $(".play-wrapper").empty()
        $(".play-wrapper").append(ht)
    }
    // keyup
    $(window).keyup((e)=>{
        console.log(e.which);
        // down 40, up 38
        if(e.which == 40){
            downPlay()
        }else if(e.which == 38){
           upPlay()
        }else if(e.which == 32){
            triggerPause()
        }
    })

    function downPlay() {
        cur++
        if(cur > 9){
            loadList();
        }else{
            if(isPause) triggerPause()
            renderPlay(list[cur].playurl)
        }
    }

    function upPlay() {
        cur--
        if(cur < 0){
            cur = 0
        }else{
            if(isPause) triggerPause()
            renderPlay(list[cur].playurl)
        } 
    }

    function triggerPause() {
        if(isPause)  {
            $(".play-item video").trigger("play")
            $(".play-icon").hide()
            isPause = false
       }else  {
            $(".play-item video").trigger("pause")
            $(".play-icon").show()
            isPause = true
       }
    }

    $(".img-phone").click(()=>{
        triggerPause()
    })

    let begin = 0
    const deltaSpan = 500
    $(".img-phone")[0].addEventListener("wheel", (e)=>{
        
        if(Date.now() - begin > deltaSpan){
            console.log(e);
            if(e.deltaY > 0){
                downPlay()
            }else if(e.deltaY < 0){
                upPlay()
            }
            begin = Date.now()
        }
        
    })

});