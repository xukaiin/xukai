var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const production = require("../sql/production");
/* GET home page. */

router.get('/', (req, res, next) => {
  production.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render('pro', {
      index: 1,
      data: data
    })
  })
})



// router.get("/", function (req, res, next) {
//   // 先请求数据库数据，将数据渲染到页面模板

//   production.find({}, (err, data) => {
//     if (err) {
//       console.log(err)
//     }

//     res.render("pro", {
//       index: 1,
//       data: data
//     })
//   })
//这一步是可以不用数据库  手写死的数据  不通过数据库 手写代码返回
//   res.render("pro", {
//     index: 1,
//     data: [
//       {
//         proName: "红米",
//         column: "搜索",
//         brand: "百度",
//         logo:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         proImg:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         price: "199",
//         introduce: "最好用的手机",
//         stock: "99",
//         discount: "9",
//         score: "8.7",
//       },
//       {
//         proName: "红米",
//         column: "搜索",
//         brand: "百度",
//         logo:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         proImg:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         price: "199",
//         introduce: "最好用的手机",
//         stock: "99",
//         discount: "9",
//         score: "8.7",
//       },
//       {
//         proName: "红米",
//         column: "搜索",
//         brand: "百度",
//         logo:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         proImg:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         price: "199",
//         introduce: "最好用的手机",
//         stock: "99",
//         discount: "9",
//         score: "8.7",
//       },
//       {
//         proName: "红米",
//         column: "搜索",
//         brand: "百度",
//         logo:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         proImg:
//           "https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif",
//         price: "199",
//         introduce: "最好用的手机",
//         stock: "99",
//         discount: "9",
//         score: "8.7",
//       },
//     ],
//   });
// });

router.get("/add", function (req, res, next) {
  res.render("proAdd", {
    index: 1,
  });
});





router.post('/addAction', (req, res, next) => {
  let obj = req.body;
  obj.price = Number(obj.price);
  obj.discount = obj.discount - 0;
  obj.score = obj.score * 1;
  console.log(obj);
  production.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/pro");
  })
})










// router.post("/addAction", function (req, res, next) {

//   let obj = req.body;
//   obj.price = Number(obj.price);
//   obj.discount = obj.discount - 0;
//   obj.score = obj.score * 1;
//   console.log(obj);
//   production.insertMany(obj, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log(data)
//     res.redirect("/pro");
//   })

// });

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  production.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/pro");
  })

  // production.findOneAndRemove({'_id' : req.query._id},(err,data)=>{
  //    if(err) {
  //      console.log(err)
  //    }
  //    console.log(data)
  //    res.redirect("/pro");
  // })


  //   production.findOneAndDelete({'_id' : req.query._id},(err,data)=>{
  //     if(err) {
  //       console.log(err)
  //     }
  //     console.log(data)
  //     res.redirect("/pro");
  //  })

});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  production.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('proUpdate', {
      index: 1,
      data: data
    })
  })


});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.price = Number(obj.price);
  obj.stock = parseFloat(obj.stock);
  obj.discount = obj.discount - 0;
  obj.sales = obj.sales - 0;
  obj.score = obj.score * 1;
  console.log('obj_id', obj)
  production.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)

    res.redirect("/pro");

  })

});

//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
  production.find({}).sort({ price: 1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    })
  })

});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
  production.find({}).sort({ price: -1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    })
  })
  // sql.sort(production, {}, {}, obj).then((data) => {
  //   res.render("pro", {
  //     index: 1,
  //     data,
  //   });
  // });
});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  production.find({ proName: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    });
  })


});

module.exports = router;
