<template>
    <Button type="primary" @click="download">{{name}}</Button>
</template>

<script>
    const QRCode = require('qrcode')

    export default {
        name: '',
        data() {
            return {}
        },
        props: {
            link: {
                type: String,
                default: ''
            },
            filename: {
                type: String,
                default: '二维码'
            },
            name:{
                type:String,
                default:'下载二维码'
            }
        },
        computed: {},
        methods: {
            download(){
                this.downloadQrCodeWithLink(this.link,this.filename)
            },
            /**
             * 下载图片
             * @param content 图片的base64编码
             * @param filename
             */
            downloadImgByBase64(content, fileName) {
                var base64ToBlob = function (code) {
                    let parts = code.split(';base64,');
                    let contentType = parts[0].split(':')[1];
                    let raw = window.atob(parts[1]);
                    let rawLength = raw.length;
                    let uInt8Array = new Uint8Array(rawLength);
                    for (let i = 0; i < rawLength; ++i) {
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

            /**
             * 将给定链接生成二维码同时下载
             * @param link
             * @param fileName
             */
            downloadQrCodeWithLink(link, fileName) {
                let dom = document.createElement('canvas')

                QRCode.toCanvas(dom, link, (error, data) => {

                    if (error) {
                        console.error(error, '下载二维码图片异常')
                    } else {
                        this.downloadImgByBase64(data.toDataURL(), fileName)
                    }

                })
            }
        }
    }
</script>

