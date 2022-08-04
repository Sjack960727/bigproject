const initArtCateList = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: (res) => {
      // 调用 template
      const htmlStr = template("tpl-table", res);
      $("tbody").empty().html(htmlStr);
    },
  });
};

initArtCateList();
const layer = layui.layer;
let indexAdd = null;
$("#btnAddCate").click(() => {
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-add").html(),
  });
});
// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) return layer.msg("新增分类失败！");
      initArtCateList();
      layer.msg("新增分类成功！");
      layer.close(indexAdd);
    },
  });
});
let indexEdit = null;
$("tbody").on("click", ".btn-edit", function () {
  // 弹出修改文章分类的弹窗
  indexEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "修改文章分类",
    content: $("#dialog-edit").html(),
  });
});
