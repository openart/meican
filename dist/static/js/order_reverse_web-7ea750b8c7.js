"use strict";$(function(){home.init()});var home={init:function(){this.queryFoodsById(),this.bindEvent()},queryFoodsById:function(){var i=$("#dish").find("li.active").attr("value");$.ajax({url:"/api/queryFoodListById",data:{id:i},success:function(i){if(0==+(i=JSON.parse(i)).result){var t=i.result_rows.map(function(i){return'<li class="bdr-bottom js-check-food" data-id='+i.id+"><i></i><span>"+i.name+"</span></li>"}).join("");$("#food_list").html(t)}else alert("获取食品列表出错")}})},submitOrderReverse:function(){var i=$("#date").find("li.active").attr("value"),t=$("#food_list").find("li.active").data("id");if(0===$("#date").find("li").length)return utils.showToast("当前时段不可点餐，请周一再试"),!1;if(!t)return utils.showToast("请选择食品品类"),!1;var s={date:i,food:t};$.ajax({url:"/api/submitOrderReverse",timeout:5e3,data:s,success:function(i){0==+(i=JSON.parse(i)).result?utils.showToast("提交预约成功"):utils.showToast("提交预约失败")},error:function(i,t){utils.showToast(t)}})},submitFoodFavorite:function(){var i=$("#food_list").find("li.active").data("id");if(!i)return utils.showToast("请选择食品品类"),!1;var t={food:i};$.ajax({url:"/api/submitFoodFavorite",timeout:5e3,data:t,success:function(i){0==+(i=JSON.parse(i)).result?utils.showToast("提交收藏成功"):utils.showToast("提交收藏失败")},error:function(i,t){utils.showToast(t)}})},queryFoodListByName:function(i){var t={name:i};$.ajax({url:"/api/queryFoodListByName",timeout:5e3,data:t,success:function(i){if(0==+(i=JSON.parse(i)).result){var t=i.result_rows.map(function(t){return t.list.map(function(i){return'<li class="bdr-bottom js-check-food" data-id='+i.id+"><i></i><span>"+i.name+"</span><span data-id="+t.uniqueId+">"+t.name+"</span></li>"}).join("")}).join("");$("#food_list").html(t)}else alert("获取食品列表出错")},error:function(i,t){utils.showToast(t)}})},bindEvent:function(){var s=this,o=!0;$("#dish li").on("click",function(){$("#search").val(""),$(this).addClass("active").siblings().removeClass("active"),s.queryFoodsById()}),$("#date li").on("click",function(){$(this).addClass("active").siblings().removeClass("active")}),$("body").on("click",".js-check-food",function(){$(this).addClass("active").siblings().removeClass("active")}),$("#search").on("compositionstart",function(){o=!1}),$("#search").on("compositionend",function(){console.log(o),o=!0}),$("#search").on("input propertychange",function(){var t=this;setTimeout(function(){if(!o)return!1;var i=$(t).val();console.log(i),s.queryFoodListByName(i.replace(/(^\s*)|(\s*$)/g,""))},0)}),$("body").on("click",".js-submit-food",this.submitOrderReverse),$("body").on("click",".js-submit-favorite",this.submitFoodFavorite)}};