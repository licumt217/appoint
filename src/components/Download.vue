<template>
        <Button type="primary" @click="download">导出</Button>
</template>

<script>

    const html2canvas=require('html2canvas')
    const jsPDF=require('jspdf')
    import $ from 'jquery'
    export default {
        name: '',
        data() {
            return {
            }
        },
        props: {
            domId:{
                type:String,
                default:'container'
            },
            filename:{
                type:String,
                default:'问卷'
            },
        },
        computed:{
        },
        methods: {
            download(){
                    this.$Message.warning("正在导出，请稍等！")

                    let element = $("#"+this.domId);    // 这个dom元素是要导出pdf的div容器
                    let w = element.width();    // 获得该容器的宽
                    let h = element.height();    // 获得该容器的高
                    let offsetTop = element.offset().top;    // 获得该容器到文档顶部的距离
                    let offsetLeft = element.offset().left;    // 获得该容器到文档最左的距离
                    let canvas = document.createElement("canvas");
                    let abs = 0;
                    let win_i = $(window).width();    // 获得当前可视窗口的宽度（不包含滚动条）
                    let win_o = window.innerWidth;    // 获得当前窗口的宽度（包含滚动条）
                    if(win_o>win_i){
                            abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
                    }
                    canvas.width = w * 2;    // 将画布宽&&高放大两倍
                    canvas.height = h * 2;
                    let context = canvas.getContext("2d");
                    context.scale(2, 2);
                    context.translate(-offsetLeft-abs,-offsetTop);
                    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
                    // translate的时候，要把这个差值去掉
                    html2canvas(element[0]).then(canvas=>{
                            var contentWidth = canvas.width;
                            var contentHeight = canvas.height;
                            //一页pdf显示html页面生成的canvas高度;
                            var pageHeight = contentWidth / 592.28 * 841.89;
                            //未生成pdf的html页面高度
                            var leftHeight = contentHeight;
                            //页面偏移
                            var position = 0;
                            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                            var imgWidth = 595.28;
                            var imgHeight = 592.28/contentWidth * contentHeight;

                            var pageData = canvas.toDataURL('image/jpeg', 1.0);

                            var pdf = new jsPDF('', 'pt', 'a4');

                            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                            //当内容未超过pdf一页显示的范围，无需分页
                            if (leftHeight < pageHeight) {
                                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                            } else {    // 分页
                                    while(leftHeight > 0) {
                                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                                            leftHeight -= pageHeight;
                                            position -= 841.89;
                                            //避免添加空白页
                                            if(leftHeight > 0) {
                                                    pdf.addPage();
                                            }
                                    }
                            }
                            pdf.save(this.filename+'.pdf');

                            this.$emit('down')
                    })
            },

            downloadFile(content, fileName) { //下载base64图片
                var base64ToBlob = function(code) {
                    let parts = code.split(';base64,');
                    let contentType = parts[0].split(':')[1];
                    let raw = window.atob(parts[1]);
                    let rawLength = raw.length;
                    let uInt8Array = new Uint8Array(rawLength);
                    for(let i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
                    return new Blob([uInt8Array], {
                        type: contentType
                    });
                };
                let aLink = document.createElement('a');
                let blob = base64ToBlob(content); //new Blob([content]);
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
                aLink.click();
            },
        }
    }
</script>

