<template>
  <div class="wang-warp">
    <div :ref="ev" class="edit">

    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    model: {
      prop: 'content',
      event: 'contentChange'
    },
    props: {
      ev: {
        required: false,  //手动指定编辑器ref
        default: 'editor'
      },
      useCustomImageHandler: {  //为true时使用父组件自定义的上传方法
        default: false
      },
      content: ''
    },
    created(){
    },
    data() {
      return {
        editorContent: '',
        editor:Object
      }
    },
    watch:{
      content(newvalue,oldvalue){
        console.log(newvalue);
        this.editor.txt.html(newvalue);
      }
    },
    methods: {
      getContent: function () { // 查看内容
        // alert(this.editorContent)
      }
    },
    mounted() {
      // window['editor' + this.ev] = 0;
      // console.log('wwwww',window['editor' + this.ev]);
      // let editor = new E(this.$refs[this.ev]);
      this.editor = new E(this.$refs[this.ev]);
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html;
        this.$emit('contentChange', this.editorContent);
      };
      this.editor.customConfig.debug = true;
      // 图片上传接口配置
      // this.editor.customConfig.uploadImgServer = 'http://10.200.187.216:8888/upload_file/';

      // 上传图片时可自定义传递一些参数，例如传递验证的token等。参数会被添加到formdata中
      this.editor.customConfig.uploadImgParams = {
        // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
        // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
        // token: '36-741a431894c24a388463816c1ed767ba',
        // file_size: '232'
      };

      // 图片上传后台返回的格式应该是如下,如果不是,需要在下面的图片上传监听函数中customInsert自行处理,但是一定要是json格式返回
      /*
      {
    // errno 即错误代码，0 表示没有错误。
    //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
    "errno": 0,

    // data 是一个数组，返回若干图片的线上地址
    "data": [
        "图片1地址",
        "图片2地址",
        "……"
    ]
}
       */


      // 图片上传监听函数
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          console.log(result);
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          console.log(result);
          let url = result.filename;
          insertImg(url)
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };

      /*
      或者是自定义图片上传的方法,下面
       */
      if (this.useCustomImageHandler) {
        let _this = this;
        this.editor.customConfig.customUploadImg = function (files, insert) {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法
          console.log(files);
          _this.$emit('imageAdded', files, insert);
          // 上传代码返回结果之后，将图片插入到编辑器中
          // insert(imgUrl)
        };
      }
      // 创建编辑器
      this.editor.create();
      let h = document.getElementsByClassName('edit');
      this.editor.txt.html(this.content);
    }
  }
</script>

<style>
  .wang-warp, .edit {
    width: 100%;
    height: 100%;
    text-align: left;
  }
  .wang-warp .w-e-text-container{
    z-index: 1!important;
  }
  .wang-warp .w-e-toolbar {
    position: relative;
    z-index: 2;
  }
</style>
