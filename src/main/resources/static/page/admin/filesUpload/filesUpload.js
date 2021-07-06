$(document).ready(function() {
	var authorization = localStorage.getItem("authorization");
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/managerPaper/selectUnExamMessage',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		success: function(res) {
			var number = res.number
			$.ajax({
				type: 'post',
				url: 'http://123.56.29.67/hengzhi-official/user/getUserInfo',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				headers: {
					'Authorization': authorization
				},
				// data: JSON.stringify(data),
				success: function(data) {
					var msg1 = document.getElementById("head")
					var str1 = ""
					str1 = `
				<img class="headImgg" data-id="${data.userId}" src="http://123.56.29.67/hengzhi-official/headImage/${data.headImg}">
				<span class="layui-badge huizhang" title="您有${number}条留言未审核">${number}</span>
			`
					msg1.innerHTML = str1;
				},
				error: function() {}
			});
		},
		error: function() {}
	});

})
// 修改头像
function change1() {
	layui.use('layer', function () {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '修改头像',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#test2"),
			btn: ['提交', '取消'],
			scrollbar: false,
			yes: function (index) {
				// function postData() {
				var authorization = localStorage.getItem("authorization");
				console.log(authorization);
				var formData = new FormData();
				formData.append("headImage", $("#uploadImage")[0].files[0]);
				$.ajax({
					url: "http://123.56.29.67/hengzhi-official/user/updateHeadImg",
					type: "post",
					data: formData,
					headers: {
						'Authorization': authorization
					},
					processData: false, // 告诉jQuery不要去处理发送的数据
					contentType: false, // 告诉jQuery不要去设置Content-Type请求头
					dataType: 'text',
					success: function (data) {
						console.log(data)

						var params = JSON.parse(data)
						$("#img").attr("src", params);
						layer.close(index);
						layer.msg("修改成功")
						setTimeout(function () {
							window.location.href = "../staffInfo/staffInfo.html";
						}, 1000);
					},
					error: function (data) {

					}
				});
				// }
			},
			btn2: function () {
				// layer.msg('bbb');
			}
		});
	});
}
// 修改密码
function change() {
	layui.use('layer', function () {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '修改密码',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#test1"),
			btn: ['提交', '取消'],
			scrollbar: false,
			yes: function (index) {
				// var studentId = $("#studentId").val();
				var password = $("#password").val();
				var newPassword = $("#newPassword").val();
				var data = {
					// "studentId": studentId,
					"password": password,
					"newPassword": newPassword,
				};
				var authorization = localStorage.getItem("authorization");
				console.log(data)
				console.log(authorization)
				$.ajax({
					type: 'post',
					url: 'http://123.56.29.67/hengzhi-official/user/updatePassword',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					headers: {
						'Authorization': authorization
					},
					data: JSON.stringify(data),
					success: function (data) {
						if (data.status == "success") {
							layer.close(index);
							layer.msg("修改成功");
							localStorage.setItem("authorization", "");
							setTimeout(function () {
								window.location.href =
									"../../login/login.html";
							}, 2000);
						} else {
							layer.msg("修改失败")
						}
					},
					error: function () {}
				});
			},
			btn2: function () {
				// layer.msg('bbb');
			}
		});
	});
}

// 退出登录
function logout() {
	localStorage.setItem("authorization", "");
	setTimeout(function () {
		window.location.href = "../../login/login.html";
	}, 2000);
}

// 发布公告
function add() {
	layui.use('layer', function () {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '发布公告',
			area: ['350px', '250px'],
			shade: 0.4,
			content: $("#testgg"),
			btn: ['发布', '取消'],
			scrollbar: false,
			yes: function (index) {
				var content = $("#mess").val()
				console.log(content)
				if (content.match(/^\s*$/)) {
					layer.msg("你好像什么都没有输入耶")
				} else {
					var authorization = localStorage.getItem("authorization");
					var userId1 = document.getElementsByClassName("headImgg")[0]
					var userId = userId1.dataset.id
					console.log(userId1)
					data = {
						content: content,
						userId: userId
					}
					$.ajax({
						type: 'post',
						url: 'http://123.56.29.67/hengzhi-official/show/addNotice',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						headers: {
							'Authorization': authorization
						},
						data: JSON.stringify(data),
						success: function (data) {
							if (data.msg == "success") {
								layer.msg("成功发布")
								layer.close(index);
								$.ajax({
									type: 'post',
									url: 'http://123.56.29.67/hengzhi-official/show/showNotice',
									dataType: 'json',
									contentType: 'application/json;charset=utf-8',
									headers: {
										'Authorization': authorization
									},
									// data: JSON.stringify(data),
									success: function (data) {
										var msg1 = document.getElementById(
											"notice")
										var str1 = ""
										var jsonLength = 0;
										for (var i in data) {
											jsonLength++;
										}
										for (var i = 0; i <
											jsonLength; i++) {
											str1 += `
											<li class="layui-timeline-item">
												<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
												<div class="layui-timeline-content layui-text">
													<h3 class="layui-timeline-title">${data[i].time}</h3>
													<div class="contents">
														${data[i].content}
													</div>
													<div class="aa">—— ${data[i].userName}</div>
												</div>
											</li>
											`
										}
										msg1.innerHTML = str1;
									},
									error: function () {}
								});
							} else {
								layer.msg("发布失败")
							}
						},
						error: function () {}
					});
				}

			},
			btn2: function () {}
		});
	});
}
var authorization = localStorage.getItem("authorization");
// 个人信息
$.ajax({
	type: 'post',
	url: 'http://123.56.29.67/hengzhi-official/user/getUserInfo',
	dataType: 'json',
	contentType: 'application/json;charset=utf-8',
	headers: {
		'Authorization': authorization
	},
	// data: JSON.stringify(data),
	success: function (data) {
		// console.log(data.userId)
		var str1 = ""
		str1 = `
						<div class="userbox2" data-id="${data.userId}">资料：</div>
				`
		var userbox = document.getElementById("userr")
		userbox.innerHTML = str1;
	},
	error: function () {}
});

// 上传资料
function addFile() {
	layui.use('layer', function () {
		var $ = layui.jquery;
		var element = layui.element;
		var layer = layui.layer;
		var form = layui.form;
		layer.open({
			type: 1,
			title: '资料上传',
			area: ['500px', '350px'],
			shade: 0.4,
			content: $("#test3"),
			btn: ['提交', '取消'],
			scrollbar: false,
			yes: function (index) {
				var authorization = localStorage.getItem("authorization");
				console.log(authorization);

				var userId2 = document.getElementsByClassName("userbox2")[0]
				var description = document.getElementById("des").value;
				var formData = new FormData();
				formData.append("file", $("#uploadImage3")[0].files[0]);
				formData.append("userId", userId2.dataset.id);
				formData.append("description", description);
				console.log(formData)
				$.ajax({
					url: "http://123.56.29.67/hengzhi-official/show/uploadFile",
					type: "post",
					data: formData,
					headers: {
						'Authorization': authorization
					},
					processData: false, // 告诉jQuery不要去处理发送的数据
					contentType: false, // 告诉jQuery不要去设置Content-Type请求头
					dataType: 'text',
					success: function (data) {
						console.log(data)
						layer.close(index);
						layer.msg("上传成功")
						setTimeout(function () {
							window.location.href = "../filesUpload/filesUpload.html";
						}, 1000);
					},
					error: function (data) {}
				});
			},
			btn2: function () {
				// layer.msg('bbb');
			}
		});
	});
}

// 展示公告
$(document).ready(function () {
	var authorization = localStorage.getItem("authorization");
	// 个人信息
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/user/getUserInfo',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		// data: JSON.stringify(data),
		success: function (data) {
			var msg1 = document.getElementById("head")
			var str1 = ""
			str1 = `
			<img class="headImgg" data-id="${data.userId}" src="http://123.56.29.67/hengzhi-official/headImage/newFileName${data.headImg}">
			`
			msg1.innerHTML = str1;
		},
		error: function () {}
	});
	$.ajax({
		type: 'post',
		url: 'http://123.56.29.67/hengzhi-official/show/showNotice',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		headers: {
			'Authorization': authorization
		},
		// data: JSON.stringify(data),
		success: function (data) {
			var msg1 = document.getElementById("notice")
			var str1 = ""
			var jsonLength = 0;
			for (var i in data) {
				jsonLength++;
			}
			for (var i = 0; i < jsonLength; i++) {
				str1 += `
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">${data[i].time}</h3>
						<div class="contents">
							${data[i].content}
						</div>
						<div class="aa">—— ${data[i].userName}</div>
					</div>
				</li>
				`
			}
			msg1.innerHTML = str1;
		},
		error: function () {}
	});

	// 显示资料
	$(document).ready(function () {
		var authorization = localStorage.getItem("authorization");
		// console.log(authorization)
		$.ajax({
			type: 'post',
			url: 'http://123.56.29.67/hengzhi-official/show/showFile',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			headers: {
				'Authorization': authorization
			},
			// data: JSON.stringify(data),
			success: function (data) {
				// console.log(data);
				var str = ""
				for (var i = 0; i < data.length; i++) {
					// var url = data[i].url;
					str += `
						<tr>
							<td url="${data[i].url}" id="getUrl"><i class="layui-icon layui-icon-file-b"></i>${data[i].description}</td>
							<td>${data[i].time}</td>
							<td>${data[i].userName}</td>
							<td onclick="downloadFile(this)" data-url="${data[i].url}"><i class="layui-icon layui-icon-download-circle"></i></td>
						</tr>
					`
					// console.log(str)
				}
				var box1 = document.getElementById("filebox");
				box1.innerHTML = str;
			},
			error: function () {}
		});
	})
})

// 下载资料
function downloadFile(e) {
	var authorization = localStorage.getItem("authorization");
	console.log(authorization)
	var fileName = e.dataset.url;

	var formData = new FormData();
	formData.append("fileName", fileName);
	console.log(formData)
	$.ajax({
		url: "http://123.56.29.67/hengzhi-official/show/downloadFile",
		method: "post",
		data: {
			fileName: fileName
		},
		headers: {
			'Authorization': authorization,
		},
		success: function (response, status, request) {
			console.log(response)
			if (status == "success") {
				let blob = new Blob([response])
				let downloadElement = document.createElement('a')
				let href = window.URL.createObjectURL(blob); //创建下载的链接
				downloadElement.href = href;
				downloadElement.download = fileName; //下载后文件名
				document.body.appendChild(downloadElement);
				downloadElement.click(); //点击下载
				document.body.removeChild(downloadElement); //下载完成移除元素
				window.URL.revokeObjectURL(href); //释放blob
				// message.success('upload successfully.');
				console.log("下载成功")
				console.log("下载成功")
			} else {
				console.log("下载失败")
			}
		}
	})
}